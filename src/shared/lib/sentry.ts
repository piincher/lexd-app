/**
 * Sentry Configuration
 *
 * Centralized error, session, replay, and navigation tracing setup.
 */

import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

type SentryRuntimeConfig = {
  dsn: string;
  environment: string;
  tracesSampleRate: number;
  profilesSampleRate: number;
  replaysSessionSampleRate: number;
  replaysOnErrorSampleRate: number;
  debug: boolean;
};

const DEFAULT_PRODUCTION_TRACES_SAMPLE_RATE = 0.2;
const DEFAULT_PRODUCTION_PROFILES_SAMPLE_RATE = 0.05;
const DEFAULT_PRODUCTION_REPLAY_SESSION_SAMPLE_RATE = 0.01;
const DEFAULT_PRODUCTION_REPLAY_ERROR_SAMPLE_RATE = 1.0;

const reactNavigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

let initialized = false;

export function initSentry(config?: Partial<SentryRuntimeConfig>): void {
  if (initialized) {
    return;
  }

  const runtimeConfig = getSentryConfig(config);
  if (!runtimeConfig.dsn) {
    if (__DEV__) {
      console.warn('[Sentry] EXPO_PUBLIC_SENTRY_DSN is not configured.');
    }
    return;
  }

  initialized = true;

  Sentry.init({
    dsn: runtimeConfig.dsn,
    environment: runtimeConfig.environment,
    debug: runtimeConfig.debug,
    enableNative: true,
    enableNativeCrashHandling: true,
    enableAutoSessionTracking: true,
    enableAutoPerformanceTracing: true,
    attachStacktrace: true,
    sendDefaultPii: false,
    tracesSampleRate: runtimeConfig.tracesSampleRate,
    _experiments: {
      profilesSampleRate: runtimeConfig.profilesSampleRate,
      replaysSessionSampleRate: runtimeConfig.replaysSessionSampleRate,
      replaysOnErrorSampleRate: runtimeConfig.replaysOnErrorSampleRate,
    },
    integrations: [
      reactNavigationIntegration,
      Sentry.mobileReplayIntegration({
        maskAllText: true,
        maskAllImages: true,
        maskAllVectors: true,
      }),
    ],
    beforeSend: (event) => (shouldIgnoreError(event) ? null : event),
    ignoreErrors: [
      'AbortError',
      'Cancelled by user',
      'Network request failed',
      'Request was cancelled',
      'The user aborted a request.',
    ],
  });

  Sentry.setTags({
    app_version: Constants.expoConfig?.version ?? 'unknown',
    eas_project_id: Constants.easConfig?.projectId ?? 'unknown',
    expo_channel: Updates.channel || 'unknown',
    expo_runtime_version: Updates.runtimeVersion ?? 'unknown',
    expo_update_id: Updates.updateId ?? 'embedded',
  });
}

export function registerSentryNavigationContainer(navigationContainerRef: unknown): void {
  if (!initialized) {
    return;
  }

  reactNavigationIntegration.registerNavigationContainer(navigationContainerRef);
}

export function setSentryUser(userId: string | null, email?: string, username?: string): void {
  if (!userId) {
    Sentry.setUser(null);
    return;
  }

  Sentry.setUser({ id: userId, email, username });
}

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

export function captureException(error: Error, context?: Record<string, unknown>): void {
  if (!context) {
    Sentry.captureException(error);
    return;
  }

  Sentry.withScope((scope) => {
    scope.setExtras(context);
    Sentry.captureException(error);
  });
}

export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = 'info'
): void {
  Sentry.captureMessage(message, level);
}

export function startSpan<T>(
  name: string,
  operation: string,
  callback: () => T
): T {
  return Sentry.startSpan({ name, op: operation }, callback);
}

function getSentryConfig(config?: Partial<SentryRuntimeConfig>): SentryRuntimeConfig {
  const environment =
    config?.environment ??
    process.env.EXPO_PUBLIC_ENV ??
    process.env.APP_ENV ??
    (__DEV__ ? 'development' : 'production');

  const isProduction = environment === 'production';

  return {
    dsn:
      config?.dsn ??
      'https://c94705caef41cca8dd2739debd894d68@o4504673761296384.ingest.us.sentry.io/4507324627353600',
    environment,
    debug: config?.debug ?? (__DEV__ && process.env.EXPO_PUBLIC_SENTRY_DEBUG === 'true'),
    tracesSampleRate:
      config?.tracesSampleRate ??
      readSampleRate('EXPO_PUBLIC_SENTRY_TRACES_SAMPLE_RATE', isProduction ? DEFAULT_PRODUCTION_TRACES_SAMPLE_RATE : 1.0),
    profilesSampleRate:
      config?.profilesSampleRate ??
      readSampleRate('EXPO_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE', isProduction ? DEFAULT_PRODUCTION_PROFILES_SAMPLE_RATE : 0.0),
    replaysSessionSampleRate:
      config?.replaysSessionSampleRate ??
      readSampleRate('EXPO_PUBLIC_SENTRY_REPLAY_SESSION_SAMPLE_RATE', isProduction ? DEFAULT_PRODUCTION_REPLAY_SESSION_SAMPLE_RATE : 0.0),
    replaysOnErrorSampleRate:
      config?.replaysOnErrorSampleRate ??
      readSampleRate('EXPO_PUBLIC_SENTRY_REPLAY_ERROR_SAMPLE_RATE', isProduction ? DEFAULT_PRODUCTION_REPLAY_ERROR_SAMPLE_RATE : 1.0),
  };
}

function readSampleRate(envName: string, fallback: number): number {
  const value = readSampleRateEnv(envName);
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, 0), 1);
}

function readSampleRateEnv(envName: string): string | undefined {
  switch (envName) {
    case 'EXPO_PUBLIC_SENTRY_TRACES_SAMPLE_RATE':
      return process.env.EXPO_PUBLIC_SENTRY_TRACES_SAMPLE_RATE;
    case 'EXPO_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE':
      return process.env.EXPO_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE;
    case 'EXPO_PUBLIC_SENTRY_REPLAY_SESSION_SAMPLE_RATE':
      return process.env.EXPO_PUBLIC_SENTRY_REPLAY_SESSION_SAMPLE_RATE;
    case 'EXPO_PUBLIC_SENTRY_REPLAY_ERROR_SAMPLE_RATE':
      return process.env.EXPO_PUBLIC_SENTRY_REPLAY_ERROR_SAMPLE_RATE;
    default:
      return undefined;
  }
}

function shouldIgnoreError(event: Sentry.Event): boolean {
  const exceptionMessage = event.exception?.values?.[0]?.value ?? '';
  const logMessage = event.logentry?.message ?? '';
  const combinedMessage = `${exceptionMessage} ${logMessage}`.toLowerCase();

  if (isDevelopmentOnlyError(combinedMessage)) {
    return true;
  }

  return [
    'aborterror',
    'cancelled by user',
    'network request failed',
    'request was cancelled',
    'the user aborted a request',
  ].some((message) => combinedMessage.includes(message));
}

function isDevelopmentOnlyError(message: string): boolean {
  if (__DEV__) {
    return false;
  }

  return [
    'warning:',
    'strictmode',
    'proptypes',
    'checkproptypes',
  ].some((developmentMessage) => message.includes(developmentMessage));
}

export const withErrorBoundary = Sentry.withErrorBoundary;
export { Sentry };

export default {
  initSentry,
  registerSentryNavigationContainer,
  setSentryUser,
  addBreadcrumb,
  captureException,
  captureMessage,
  startSpan,
  withErrorBoundary,
  Sentry,
};
