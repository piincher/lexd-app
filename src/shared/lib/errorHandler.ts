/**
 * Error Handler - Global async error handling utilities
 * Provides standardized error handling, logging, and user feedback
 */

import * as Sentry from '@sentry/react-native';
import { showMessage } from 'react-native-flash-message';

export interface ErrorContext {
  component?: string;
  screen?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface HandledError {
  message: string;
  code?: string;
  originalError: unknown;
  context: ErrorContext;
  timestamp: string;
}

export interface ToastColors {
  backgroundColor: string;
  textColor: string;
}

/**
 * Handles async errors with proper logging and user feedback
 */
export function handleAsyncError(
  error: unknown,
  context: string | ErrorContext,
  showUserFeedback: boolean = true,
  colors?: ToastColors
): HandledError {
  const errorContext: ErrorContext = typeof context === 'string' 
    ? { component: context } 
    : context;

  // Extract error message
  const message = extractErrorMessage(error);
  const code = extractErrorCode(error);

  // Create handled error object
  const handledError: HandledError = {
    message,
    code,
    originalError: error,
    context: errorContext,
    timestamp: new Date().toISOString(),
  };

  // Log to console in development
  if (__DEV__) {
    console.error(`[ErrorHandler] ${errorContext.component || 'Unknown'}:`, error);
  }

  // Log to Sentry
  Sentry.captureException(error, {
    tags: {
      component: errorContext.component || 'Unknown',
      screen: errorContext.screen || 'Unknown',
      action: errorContext.action || 'Unknown',
      errorCode: code || 'UNKNOWN',
    },
    extra: {
      ...errorContext.metadata,
      handledAt: handledError.timestamp,
    },
    user: errorContext.userId ? { id: errorContext.userId } : undefined,
  });

  // Show user feedback
  if (showUserFeedback) {
    showErrorToast(message, 3000, colors);
  }

  return handledError;
}

/**
 * Handles API errors specifically
 */
export function handleApiError(
  error: unknown,
  endpoint: string,
  context?: Omit<ErrorContext, 'action'>,
  colors?: ToastColors
): HandledError {
  const errorContext: ErrorContext = {
    ...context,
    action: `API_CALL:${endpoint}`,
  };

  // Check for specific HTTP status codes
  const statusCode = extractStatusCode(error);
  let message = 'Une erreur est survenue lors de la communication avec le serveur';

  switch (statusCode) {
    case 400:
      message = 'Requête invalide. Veuillez vérifier vos données.';
      break;
    case 401:
      message = 'Session expirée. Veuillez vous reconnecter.';
      break;
    case 403:
      message = 'Accès refusé. Vous n\'avez pas les permissions nécessaires.';
      break;
    case 404:
      message = 'Ressource non trouvée.';
      break;
    case 422:
      message = 'Données invalides. Veuillez vérifier le formulaire.';
      break;
    case 429:
      message = 'Trop de requêtes. Veuillez réessayer plus tard.';
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      message = 'Erreur serveur. Veuillez réessayer plus tard.';
      break;
    default:
      if (!navigator.onLine) {
        message = 'Pas de connexion internet. Vérifiez votre réseau.';
      }
  }

  return handleAsyncError(error, errorContext, true, colors);
}

/**
 * Handles form validation errors
 */
export function handleFormError(
  error: unknown,
  formName: string,
  context?: Omit<ErrorContext, 'action'>,
  colors?: ToastColors
): HandledError {
  const errorContext: ErrorContext = {
    ...context,
    action: `FORM_SUBMIT:${formName}`,
  };

  const message = extractErrorMessage(error) || 'Erreur de validation du formulaire';

  return handleAsyncError(error, errorContext, true, colors);
}

/**
 * Shows error toast message
 */
export function showErrorToast(message: string, duration: number = 3000, colors?: ToastColors): void {
  showMessage({
    message: 'Erreur',
    description: message,
    type: 'danger',
    backgroundColor: colors?.backgroundColor || '#dc3545',
    color: colors?.textColor || '#FFFFFF',
    duration,
    icon: 'danger',
  });
}

/**
 * Shows success toast message
 */
export function showSuccessToast(message: string, duration: number = 3000, colors?: ToastColors): void {
  showMessage({
    message: 'Succès',
    description: message,
    type: 'success',
    backgroundColor: colors?.backgroundColor || '#28a745',
    color: colors?.textColor || '#FFFFFF',
    duration,
    icon: 'success',
  });
}

/**
 * Shows warning toast message
 */
export function showWarningToast(message: string, duration: number = 3000, colors?: ToastColors): void {
  showMessage({
    message: 'Attention',
    description: message,
    type: 'warning',
    backgroundColor: colors?.backgroundColor || '#ff9800',
    color: colors?.textColor || '#FFFFFF',
    duration,
    icon: 'warning',
  });
}

/**
 * Shows info toast message
 */
export function showInfoToast(message: string, duration: number = 3000, colors?: ToastColors): void {
  showMessage({
    message: 'Information',
    description: message,
    type: 'info',
    backgroundColor: colors?.backgroundColor || '#17a2b8',
    color: colors?.textColor || '#FFFFFF',
    duration,
    icon: 'info',
  });
}

/**
 * Creates a safe async function wrapper
 */
export function withErrorHandling<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  context: string | ErrorContext,
  onError?: (error: HandledError) => void
): (...args: Parameters<T>) => Promise<ReturnType<T> | undefined> {
  return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
    try {
      return (await fn(...args)) as ReturnType<T>;
    } catch (error) {
      const handledError = handleAsyncError(error, context);
      onError?.(handledError);
      return undefined;
    }
  };
}

/**
 * Creates a retry wrapper for async functions
 */
export function withRetry<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  maxRetries: number = 3,
  delay: number = 1000
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    let lastError: unknown;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return (await fn(...args)) as ReturnType<T>;
      } catch (error) {
        lastError = error;

        if (attempt < maxRetries - 1) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
        }
      }
    }

    throw lastError;
  };
}

// Helper functions

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return 'Une erreur inconnue s\'est produite';
}

function extractErrorCode(error: unknown): string | undefined {
  if (error && typeof error === 'object') {
    if ('code' in error) {
      return String((error as { code: unknown }).code);
    }
    if ('errorCode' in error) {
      return String((error as { errorCode: unknown }).errorCode);
    }
  }
  return undefined;
}

function extractStatusCode(error: unknown): number | undefined {
  if (error && typeof error === 'object') {
    if ('status' in error) {
      return Number((error as { status: unknown }).status) || undefined;
    }
    if ('statusCode' in error) {
      return Number((error as { statusCode: unknown }).statusCode) || undefined;
    }
    if ('response' in error && (error as { response: { status?: number } }).response) {
      return (error as { response: { status?: number } }).response.status;
    }
  }
  return undefined;
}

export default {
  handleAsyncError,
  handleApiError,
  handleFormError,
  showErrorToast,
  showSuccessToast,
  showWarningToast,
  showInfoToast,
  withErrorHandling,
  withRetry,
};
