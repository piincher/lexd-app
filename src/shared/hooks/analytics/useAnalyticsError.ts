/**
 * Analytics Error Hook
 *
 * Logs application errors to Firebase Analytics and Sentry.
 */

import { useCallback } from 'react';
import { trackEvent } from '../../lib/analytics';
import { captureException } from '../../lib/sentry';
import { AnalyticsEvents } from './constants';
import type { AnalyticsParams } from './constants';

export function useAnalyticsError() {
  const logError = useCallback(async (
    error: Error,
    context?: string,
    additionalData?: AnalyticsParams
  ): Promise<void> => {
    try {
      await trackEvent(AnalyticsEvents.APP_ERROR, {
        error_message: error.message,
        error_name: error.name,
        error_context: context || 'unknown',
        ...additionalData,
      });

      captureException(error, { context, ...additionalData });
    } catch (e) {
      console.warn('[Analytics] Failed to log error:', e);
    }
  }, []);

  return { logError };
}
