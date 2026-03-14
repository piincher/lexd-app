/**
 * Sentry Configuration
 * 
 * Provides error tracking and performance monitoring for production.
 * Filters out known non-critical errors to reduce noise.
 */

import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';

interface SentryConfig {
  dsn: string;
  environment: string;
  release?: string;
  dist?: string;
  enableAutoPerformanceTracking?: boolean;
  enableNative?: boolean;
  debug?: boolean;
}

/**
 * Initialize Sentry with configuration
 */
export function initSentry(config?: Partial<SentryConfig>): void {
  const dsn = config?.dsn || 
    process.env.EXPO_PUBLIC_SENTRY_DSN || 
    Constants.expoConfig?.extra?.sentryDsn;

  if (!dsn) {
    console.warn('[Sentry] DSN not configured. Sentry will not be initialized.');
    return;
  }

  Sentry.init({
    dsn,
    environment: config?.environment || process.env.NODE_ENV || 'development',
    release: config?.release || Constants.expoConfig?.version || 'unknown',
    dist: config?.dist || Constants.expoConfig?.ios?.buildNumber || Constants.expoConfig?.android?.versionCode?.toString(),
    enableAutoPerformanceTracking: config?.enableAutoPerformanceTracking ?? true,
    enableNative: config?.enableNative ?? true,
    debug: config?.debug ?? __DEV__,
    
    // Filter events before sending
    beforeSend: (event) => {
      // Filter out known non-critical errors
      if (shouldIgnoreError(event)) {
        return null;
      }
      
      // Filter out development errors in production
      if (!__DEV__ && isDevelopmentError(event)) {
        return null;
      }
      
      return event;
    },
    
    // Configure sample rates for performance
    tracesSampleRate: __DEV__ ? 1.0 : 0.2,
    
    // Ignore specific errors
    ignoreErrors: [
      'Network request failed',
      'Cancelled by user',
      'Request was cancelled',
      'AbortError',
      'The user aborted a request.',
    ],
  });

  // Set global tags
  Sentry.setTags({
    app_version: Constants.expoConfig?.version || 'unknown',
    platform: Constants.platform?.ios ? 'ios' : Constants.platform?.android ? 'android' : 'web',
  });

  console.log('[Sentry] Initialized successfully');
}

/**
 * Check if an error should be ignored
 */
function shouldIgnoreError(event: Sentry.Event): boolean {
  const ignoredMessages = [
    'Network request failed',
    'Cancelled by user',
    'Request was cancelled',
    'AbortError',
    'The user aborted a request.',
    'No space left on device',
    'Disk full',
  ];

  // Check exception message
  const exceptionMessage = event.exception?.values?.[0]?.value;
  if (exceptionMessage) {
    const shouldIgnore = ignoredMessages.some(msg => 
      exceptionMessage.toLowerCase().includes(msg.toLowerCase())
    );
    if (shouldIgnore) return true;
  }

  // Check logentry message
  const logMessage = event.logentry?.message;
  if (logMessage) {
    const shouldIgnore = ignoredMessages.some(msg => 
      logMessage.toLowerCase().includes(msg.toLowerCase())
    );
    if (shouldIgnore) return true;
  }

  return false;
}

/**
 * Check if error is a development-only error
 */
function isDevelopmentError(event: Sentry.Event): boolean {
  const devErrors = [
    'Warning:',
    ' StrictMode',
    'PropTypes',
    'checkPropTypes',
  ];

  const exceptionMessage = event.exception?.values?.[0]?.value || '';
  return devErrors.some(err => exceptionMessage.includes(err));
}

/**
 * Set user context for Sentry
 */
export function setSentryUser(userId: string | null, email?: string, username?: string): void {
  if (userId) {
    Sentry.setUser({
      id: userId,
      email,
      username,
    });
  } else {
    Sentry.setUser(null);
  }
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category?: string,
  level: Sentry.SeverityLevel = 'info',
  data?: Record<string, unknown>
): void {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data,
    timestamp: Date.now() / 1000,
  });
}

/**
 * Capture exception with context
 */
export function captureException(
  error: Error,
  context?: Record<string, unknown>
): void {
  if (context) {
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      Sentry.captureException(error);
    });
  } else {
    Sentry.captureException(error);
  }
}

/**
 * Capture message
 */
export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = 'info'
): void {
  Sentry.captureMessage(message, level);
}

/**
 * Start performance span
 */
export function startSpan(name: string, operation: string): void {
  Sentry.startSpan({ name, op: operation }, () => {
    // Span started
  });
}

/**
 * Create error boundary wrapper
 */
export const withErrorBoundary = Sentry.withErrorBoundary;

// Re-export Sentry for direct access if needed
export { Sentry };

// Default export
export default {
  initSentry,
  setSentryUser,
  addBreadcrumb,
  captureException,
  captureMessage,
  startSpan,
  withErrorBoundary,
  Sentry,
};
