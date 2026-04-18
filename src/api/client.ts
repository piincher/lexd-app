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
import { useAuth } from '@src/store/Auth';
import { ApiError, ApiException, ApiRequestConfig, ApiResponse } from './types';

// ============================================
// ENVIRONMENT CONFIGURATION
// ============================================

type Environment = 'local' | 'staging' | 'production';

const ENV: Environment = (process.env.EXPO_PUBLIC_ENV as Environment) || 'local';

const API_CONFIG = {
  local: {
    baseURL: 'http://192.168.0.100:3000/api/v1',
    baseURLV2: 'http://192.168.0.100:3000/api/v2',
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

const currentConfig = API_CONFIG[ENV];

// ============================================
// TOKEN REFRESH STATE (shared across instances)
// ============================================

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
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

const doRefresh = async (): Promise<string> => {
  const { refreshToken } = useAuth.getState();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  const res = await refreshClient.post('/auth/refresh', { refreshToken });
  const data = res.data.data || res.data;
  const newAccessToken = data.accessToken || data.token;
  const newRefreshToken = data.refreshToken;
  const expiresIn = data.expiresIn;

  useAuth.getState().setAuth({
    user: useAuth.getState().user as any,
    token: newAccessToken,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    expiresIn,
  });
  return newAccessToken;
};

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Standard API Error class
 */
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
 */
const shouldRetry = (error: AxiosError, retryCount: number): boolean => {
  if (retryCount >= 3) return false;
  
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
// REQUEST/RESPONSE INTERCEPTORS
// ============================================

/**
 * Request interceptor - adds auth token
 */
const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = useAuth.getState().token;
  const url = config.url || '';
  
  // Only add auth header if token exists and is not empty
  if (token && token.trim() !== '' && !config.headers.get('skipAuth')) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(`[API Client] Adding auth token for ${url}: ${token.slice(0, 20)}...`);
  } else {
    console.log(`[API Client] No auth token for ${url} (hasToken=${!!token}, skipAuth=${!!config.headers.get('skipAuth')})`);
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
 * Create configured axios instance
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
  const responseErrorInterceptor = async (error: AxiosError<ApiResponse<unknown>>): Promise<never> => {
    const config = error.config as ApiRequestConfig | undefined;

    if (!config) {
      return Promise.reject(new ApiClientError(error));
    }

    // Skip error handling if requested
    if (config.headers?.['skipErrorHandling']) {
      return Promise.reject(error);
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
      const responseData = error.response?.data as any;
      console.log('[API Client] 401 response for', config.url, 'data:', JSON.stringify(responseData));
      const isTokenExpired = responseData?.code === 'TOKEN_EXPIRED';
      const cfg = config as ApiRequestConfig & { _skipRefresh?: boolean };

      if (isTokenExpired && !cfg._skipRefresh) {
        if (!isRefreshing) {
          isRefreshing = true;
          doRefresh()
            .then((newToken) => {
              isRefreshing = false;
              onTokenRefreshed(newToken);
            })
            .catch(async (refreshErr) => {
              isRefreshing = false;
              refreshSubscribers = [];
              await useAuth.getState().logOut();
              return Promise.reject(refreshErr);
            });
        }

        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken) => {
            cfg.headers = cfg.headers || {};
            cfg.headers.Authorization = `Bearer ${newToken}`;
            resolve(client.request(cfg));
          });
        });
      }

      // Not a refreshable expiry — force logout
      const token = useAuth.getState().token;
      if (token && token.trim() !== '') {
        await useAuth.getState().logOut();
      }
    }

    return Promise.reject(new ApiClientError(error));
  };

  // Add interceptors
  client.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
  client.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

  return client;
};

// ============================================
// API CLIENT INSTANCES
// ============================================

export const apiClient = createApiClient(currentConfig.baseURL);
export const apiClientV2 = createApiClient(currentConfig.baseURLV2);

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
