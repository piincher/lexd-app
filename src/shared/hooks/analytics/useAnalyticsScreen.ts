/**
 * Analytics Screen Hook
 *
 * Tracks screen views via Firebase and Sentry breadcrumbs.
 */

import { useCallback } from 'react';
import { trackScreenView } from '../../lib/analytics';
import { addBreadcrumb } from '../../lib/sentry';
import type { AnalyticsParams } from './constants';

export function useAnalyticsScreen() {
  const logScreenView = useCallback(async (
    screenName: string,
    screenClass?: string,
    additionalParams?: AnalyticsParams
  ): Promise<void> => {
    try {
      await trackScreenView(screenName, screenClass || screenName);

      addBreadcrumb(
        `Screen viewed: ${screenName}`,
        'navigation',
        'info',
        { screenName, ...additionalParams }
      );
    } catch (error) {
      console.warn('[Analytics] Failed to log screen view:', error);
    }
  }, []);

  return { logScreenView };
}
