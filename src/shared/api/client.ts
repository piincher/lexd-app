/**
 * API Client - Enterprise-grade HTTP client
 * Features: Interceptors, retry logic, error handling, token management
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { getAuthStoreRef } from './authStoreRef';
import { ApiRequestConfig, ApiResponse } from './types';
import type { userData } from '@src/constants/types';
import { emitVersionUpgradeRequired } from '../lib/versionEvents';
import { emitSessionExpired, type SessionExpiredReason } from '../lib/sessionEvents';
import { getDeviceIdSync } from '../lib/deviceId';

// ============================================
// ENVIRONMENT CONFIGURATION
// ============================================

type Environment = 'local' | 'staging' | 'production';

const getEnvironment = (value?: string): Environment => {
  if (value === 'production' || value === 'staging' || value === 'local') {
    return value;
  }

  if (value === 'development') {
    return 'local';
  }

  return 'production';
};

const ENV = getEnvironment('production');

// Port the local backend listens on.
const LOCAL_API_PORT = 3000;
// Fallback LAN IP used only when the Metro host can't be resolved (e.g. release build run over local env).
const LOCAL_API_FALLBACK_HOST = '192.168.0.108';
const LOCAL_API_HOST_OVERRIDE = process.env.EXPO_PUBLIC_LOCAL_API_HOST?.trim();

/**
 * Resolve the dev machine's host from Expo's Metro bundler URL so the local
 * API base tracks the current IP automatically instead of being hardcoded.
 * Returns just the host/IP (port stripped).
 */
const getDevHost = (): string => {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    (Constants as unknown as { expoGoConfig?: { debuggerHost?: string } }).expoGoConfig?.debuggerHost ||
    (Constants as unknown as { manifest?: { debuggerHost?: string } }).manifest?.debuggerHost;

  const host = hostUri?.split(':')[0];
  return LOCAL_API_HOST_OVERRIDE || host || LOCAL_API_FALLBACK_HOST;
};

const localBaseURL = `http://${getDevHost()}:${LOCAL_API_PORT}`;

const API_CONFIG = {
  local: {
    baseURL: `${localBaseURL}/api/v1`,
    baseURLV2: `${localBaseURL}/api/v2`,
    timeout: 10000,
  },
  staging: {
    baseURL: 'https://chinalinkexpressbackend.onrender.com/api/v1',
    baseURLV2: 'https://chinalinkexpressbackend.onrender.com/api/v2',
    timeout: 15000,
  },
  production: {
    baseURL: 'https://api.chinalinkexpress.com/api/v1',
    baseURLV2: 'https://api.chinalinkexpress.com/api/v2',
    timeout: 15000,
  },
} as const;

// ============================================
// CERTIFICATE PINNING CONFIG (Preparatory)
// ============================================
/**
 * Basic certificate pinning flag.
 * To enable, set EXPO_PUBLIC_CERT_PINNING=true in your environment.
 *
 * NOTE: React Native axios delegates TLS to the native networking stack.
 * Actual SSL certificate pinning requires a native module (e.g.
 * react-native-ssl-pinning) and cannot be enforced purely in JavaScript.
 * When this flag is enabled, requests are tagged so that a future native
 * integration can validate the server certificate fingerprint.
 */
const pinningEnabled = process.env.EXPO_PUBLIC_CERT_PINNING === 'true';

const selectedConfig = API_CONFIG[ENV];

const currentConfig = {
  ...selectedConfig,
  baseURL: process.env.EXPO_PUBLIC_API_URL || selectedConfig.baseURL,
  baseURLV2: process.env.EXPO_PUBLIC_API_URL_V2 || selectedConfig.baseURLV2,
};

// ============================================
// TOKEN REFRESH STATE (shared across instances)
// ============================================

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
let refreshSubscribers: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const subscribeTokenRefresh = (
  resolve: (token: string) => void,
  reject: (error: unknown) => void
) => {
  refreshSubscribers.push({ resolve, reject });
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((subscriber) => subscriber.resolve(token));
  refreshSubscribers = [];
};

const onTokenRefreshFailed = (error: unknown) => {
  refreshSubscribers.forEach((subscriber) => subscriber.reject(error));
  refreshSubscribers = [];
};

const refreshClient = axios.create({
  baseURL: currentConfig.baseURLV2,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Codes from the backend /auth/refresh that mean "this session is dead — no point
 * trying again, user must re-authenticate". Non-terminal failures (network, 5xx, etc.)
 * are kept silent so a flaky connection never forces a logout.
 */
const TERMINAL_REFRESH_CODES = new Set<string>([
  'INVALID_REFRESH_TOKEN',
  'TOKEN_REUSE_DETECTED',
  'NEW_DEVICE_DETECTED',
  'ACCOUNT_BLOCKED',
]);

const performRefresh = async (): Promise<string> => {
  const authState = getAuthStoreRef()?.getState();
  const refreshToken = authState?.refreshToken;
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  try {
    const res = await refreshClient.post('/auth/refresh', { refreshToken });
    const data = res.data.data || res.data;
    const newAccessToken = data.accessToken || data.token;
    const newRefreshToken = data.refreshToken;
    const expiresIn = data.expiresIn;

    authState?.setAuth({
      user: authState?.user as unknown as userData,
      token: newAccessToken,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn,
    });
    return newAccessToken;
  } catch (err) {
    // Inspect the backend code — only terminal codes trigger the session-expired event;
    // network / 5xx errors keep the user logged in locally so they can retry.
    const axErr = err as AxiosError<{ code?: string; error?: string }>;
    const code = axErr.response?.data?.code;
    if (code && TERMINAL_REFRESH_CODES.has(code)) {
      emitSessionExpired({ reason: code as SessionExpiredReason });
    }
    throw err;
  }
};

export const doRefresh = (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

const getErrorCode = (responseData?: ApiResponse<unknown> | Record<string, unknown>): string | undefined => {
  if (!responseData) return undefined;

  const data = responseData as Record<string, unknown>;
  const code = data.code;
  if (typeof code === 'string') return code;

  const error = data.error;
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const errorCode = (error as { code?: unknown }).code;
    return typeof errorCode === 'string' ? errorCode : undefined;
  }

  if (typeof error === 'string') return error;

  const message = data.message;
  return typeof message === 'string' ? message : undefined;
};

const isTokenExpiredResponse = (responseData?: ApiResponse<unknown> | Record<string, unknown>): boolean => {
  return getErrorCode(responseData) === 'TOKEN_EXPIRED';
};

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Standard API Error class
 */
export class VersionUpgradeError extends Error {
  public readonly requiredVersion: string;
  public readonly currentVersion: string;
  public readonly statusCode = 426;

  constructor(requiredVersion: string, currentVersion: string) {
    super('Upgrade Required: App version is too old');
    this.name = 'VersionUpgradeError';
    this.requiredVersion = requiredVersion;
    this.currentVersion = currentVersion;
  }
}

export class ApiClientError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly details?: Record<string, string[]>;
  public readonly originalError?: AxiosError;

  constructor(error: AxiosError<ApiResponse<unknown>>) {
    const responseData = error.response?.data;
    // Backend format: { success, data, message, error }
    const message = responseData?.message || error.message;
    const errorField = responseData?.error;
    const code = (typeof errorField === 'string' ? errorField : errorField?.code) || 'UNKNOWN_ERROR';
    
    super(message);
    
    this.name = 'ApiClientError';
    this.code = code;
    this.statusCode = error.response?.status;
    this.details = undefined;
    this.originalError = error;
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(): string {
    const messages: Record<number, string> = {
      400: 'Données invalides. Veuillez vérifier vos informations.',
      401: 'Session expirée. Veuillez vous reconnecter.',
      403: 'Accès refusé. Vous n\'avez pas les permissions nécessaires.',
      404: 'Ressource introuvable.',
      409: 'Conflit de données. Cette opération n\'est pas possible.',
      422: 'Données invalides. Veuillez vérifier vos informations.',
      500: 'Erreur serveur. Veuillez réessayer plus tard.',
      503: 'Service temporairement indisponible.',
    };

    return messages[this.statusCode || 0] || 'Une erreur est survenue. Veuillez réessayer.';
  }

  /**
   * Check if error is network related
   */
  isNetworkError(): boolean {
    return !this.statusCode || this.code === 'ECONNABORTED' || this.code === 'NETWORK_ERROR';
  }

  /**
   * Check if error is authentication related
   */
  isAuthError(): boolean {
    return this.statusCode === 401 || this.statusCode === 403;
  }
}

// ============================================
// RETRY LOGIC
// ============================================

/**
 * Determine if request should be retried
 * MAX 1 retry to prevent request storms when backend is down
 */
const shouldRetry = (error: AxiosError, retryCount: number): boolean => {
  if (retryCount >= 1) return false;

  const method = error.config?.method?.toLowerCase();
  const isSafeMethod = !method || ['get', 'head', 'options'].includes(method);
  if (!isSafeMethod) return false;
  
  // Retry on network errors or 5xx server errors
  if (!error.response) return true;
  if (error.response.status >= 500) return true;
  
  return false;
};

/**
 * Calculate delay for retry with exponential backoff
 */
const getRetryDelay = (retryCount: number): number => {
  return Math.min(1000 * Math.pow(2, retryCount), 10000);
};

// ============================================
// REQUEST DEDUPLICATION
// ============================================

const inflightRequests = new Map<string, Promise<unknown>>();
const recentRequests = new Map<string, number>();
const DEDUPE_WINDOW_MS = 3000;

const getRequestKey = (config: InternalAxiosRequestConfig): string => {
  return `${config.method?.toLowerCase() || 'get'}:${config.url}:${JSON.stringify(config.params || {})}`;
};

const isDuplicateRequest = (config: InternalAxiosRequestConfig): { isDup: boolean; existing?: Promise<unknown> } => {
  const method = config.method?.toLowerCase() || 'get';
  if (method !== 'get' && method !== 'head') return { isDup: false };
  
  const key = getRequestKey(config);
  const now = Date.now();
  const lastTime = recentRequests.get(key);
  
  if (lastTime && (now - lastTime) < DEDUPE_WINDOW_MS) {
    const existing = inflightRequests.get(key);
    if (existing) {
      console.log(`[API Client] Deduplicating request: ${config.url}`);
      return { isDup: true, existing };
    }
  }
  
  recentRequests.set(key, now);
  return { isDup: false };
};

const trackInflight = (config: InternalAxiosRequestConfig, promise: Promise<unknown>): void => {
  const method = config.method?.toLowerCase() || 'get';
  if (method !== 'get' && method !== 'head') return;
  
  const key = getRequestKey(config);
  inflightRequests.set(key, promise);
  
  promise.finally(() => {
    inflightRequests.delete(key);
  });
};

// ============================================
// REQUEST/RESPONSE INTERCEPTORS
// ============================================

/**
 * Request interceptor - adds auth token
 */
const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getAuthStoreRef()?.getState().token;

  // Only add auth header if token exists and is not empty
  if (token && token.trim() !== '' && !config.headers.get('skipAuth')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add app version and platform headers for backend version gate
  const appVersion = Constants.expoConfig?.version;
  if (appVersion) {
    config.headers['x-app-version'] = appVersion;
  }
  config.headers['x-platform'] = Platform.OS;

  // Add device ID header for backend version-gate whitelist
  const deviceId = getDeviceIdSync();
  if (deviceId) {
    config.headers['x-device-id'] = deviceId;
  }

  // Remove internal headers before sending
  config.headers.delete('skipAuth');
  config.headers.delete('skipErrorHandling');
  config.headers.delete('retryCount');

  return config;
};

/**
 * Request error interceptor
 */
const requestErrorInterceptor = (error: AxiosError): Promise<never> => {
  return Promise.reject(new ApiClientError(error as AxiosError<ApiResponse<unknown>>));
};

/**
 * Response success interceptor
 */
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

// ============================================
// API CLIENT FACTORY
// ============================================

/**
 * Create configured axios instance with deduplication wrapper
 */
const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: currentConfig.timeout,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  /**
   * Response error interceptor with retry logic
   */
  const responseErrorInterceptor = async (error: AxiosError<ApiResponse<unknown>>): Promise<AxiosResponse> => {
    const config = error.config as ApiRequestConfig | undefined;

    if (!config) {
      return Promise.reject(new ApiClientError(error));
    }

    // Skip error handling if requested
    if (config.headers?.['skipErrorHandling']) {
      return Promise.reject(error);
    }

    // Handle 426 Upgrade Required before normal error handling
    if (error.response?.status === 426) {
      const responseData = error.response?.data as unknown as Record<string, unknown> | undefined;
      const requiredVersion = typeof responseData?.requiredVersion === 'string' ? responseData.requiredVersion : '';
      const currentVersion = typeof responseData?.currentVersion === 'string' ? responseData.currentVersion : '';

      emitVersionUpgradeRequired({ requiredVersion, currentVersion });

      return Promise.reject(new VersionUpgradeError(requiredVersion, currentVersion));
    }

    // Handle retry logic
    const retryCount = config.retryCount || 0;
    if (shouldRetry(error, retryCount)) {
      config.retryCount = retryCount + 1;
      await new Promise(resolve => setTimeout(resolve, getRetryDelay(retryCount)));
      return client.request(config);
    }

    // Handle auth errors with token refresh
    if (error.response?.status === 401) {
      const responseData = error.response?.data;
      console.log('[API Client] 401 response for', config.url, 'data:', JSON.stringify(responseData));
      const cfg = config as ApiRequestConfig & { _skipRefresh?: boolean };

      if (cfg.url?.includes('/auth/refresh')) {
        return Promise.reject(new ApiClientError(error));
      }

      // Only refresh expired access tokens. Other 401s (blocked account,
      // invalid refresh token, compromised session) should surface normally.
      if (!cfg._skipRefresh && isTokenExpiredResponse(responseData)) {
        cfg._skipRefresh = true;

        if (!isRefreshing) {
          isRefreshing = true;
          doRefresh()
            .then((newToken) => {
              isRefreshing = false;
              onTokenRefreshed(newToken);
            })
            .catch(async (refreshErr) => {
              isRefreshing = false;
              onTokenRefreshFailed(refreshErr);
              // Do NOT auto-logout — let the user stay logged in locally
            });
        }

        return new Promise<AxiosResponse>((resolve, reject) => {
          subscribeTokenRefresh((newToken) => {
            cfg.headers = cfg.headers || {};
            cfg.headers.Authorization = `Bearer ${newToken}`;
            client.request(cfg).then(resolve).catch(reject);
          }, reject);
        });
      }
    }

    return Promise.reject(new ApiClientError(error));
  };

  // Add interceptors
  client.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
  client.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

  // Wrap the request method with deduplication
  const originalRequest = client.request.bind(client);
  client.request = function<T = unknown, R = AxiosResponse<T>, D = unknown>(config: AxiosRequestConfig<D>): Promise<R> {
    const dup = isDuplicateRequest(config as InternalAxiosRequestConfig);
    if (dup.isDup && dup.existing) {
      return dup.existing as Promise<R>;
    }
    
    const promise = originalRequest(config);
    trackInflight(config as InternalAxiosRequestConfig, promise);
    return promise as Promise<R>;
  };

  return client;
};

// ============================================
// API CLIENT INSTANCES
// ============================================

export const apiClient = createApiClient(currentConfig.baseURL);
export const apiClientV2 = createApiClient(currentConfig.baseURLV2);

if (pinningEnabled) {
  // Preparatory: attach a request interceptor that marks requests as
  // certificate-pinned. A future native integration can read this header
  // or intercept these requests to enforce actual fingerprint validation.
  const pinningInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers.set('X-Cert-Pinning-Enabled', 'true');
    return config;
  };
  apiClient.interceptors.request.use(pinningInterceptor);
  apiClientV2.interceptors.request.use(pinningInterceptor);
}

// ============================================
// TYPED API METHODS
// ============================================

/**
 * Generic API request wrapper with proper typing
 */
export const apiRequest = {
  get: <T>(client: AxiosInstance, url: string, config?: ApiRequestConfig) =>
    client.get<ApiResponse<T>>(url, config).then(res => res.data),

  post: <T>(client: AxiosInstance, url: string, data?: unknown, config?: ApiRequestConfig) =>
    client.post<ApiResponse<T>>(url, data, config).then(res => res.data),

  put: <T>(client: AxiosInstance, url: string, data?: unknown, config?: ApiRequestConfig) =>
    client.put<ApiResponse<T>>(url, data, config).then(res => res.data),

  patch: <T>(client: AxiosInstance, url: string, data?: unknown, config?: ApiRequestConfig) =>
    client.patch<ApiResponse<T>>(url, data, config).then(res => res.data),

  delete: <T>(client: AxiosInstance, url: string, config?: ApiRequestConfig) =>
    client.delete<ApiResponse<T>>(url, config).then(res => res.data),
};

// ============================================
// FILE UPLOAD HELPER
// ============================================

/**
 * Upload file with multipart/form-data
 */
export const uploadFile = <T>(
  client: AxiosInstance,
  url: string,
  formData: FormData,
  onProgress?: (progress: number) => void,
  config?: ApiRequestConfig
) => {
  return client
    .post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
      onUploadProgress: onProgress
        ? (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            onProgress(progress);
          }
        : undefined,
    })
    .then(res => res.data);
};

// Legacy exports for backward compatibility
export const apiV2 = apiClientV2;
export default apiClient;
