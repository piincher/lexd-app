/**
 * Analytics Hook
 *
 * Provides Firebase Analytics integration for tracking screen views,
 * user events, and errors in the application.
 *
 * This is a thin composition of focused analytics sub-hooks.
 */

import { useAnalyticsEvents } from './analytics/useAnalyticsEvents';
import { useAnalyticsScreen } from './analytics/useAnalyticsScreen';
import { useAnalyticsUser } from './analytics/useAnalyticsUser';
import { useAnalyticsEcommerce } from './analytics/useAnalyticsEcommerce';
import { useAnalyticsError } from './analytics/useAnalyticsError';
import { AnalyticsEvents } from './analytics/constants';

export { AnalyticsEvents };
export type { AnalyticsEventName, AnalyticsParams } from './analytics/constants';

export function useAnalytics() {
  const events = useAnalyticsEvents();
  const screen = useAnalyticsScreen();
  const user = useAnalyticsUser();
  const ecommerce = useAnalyticsEcommerce();
  const error = useAnalyticsError();

  return {
    ...events,
    ...screen,
    ...user,
    ...ecommerce,
    ...error,
    AnalyticsEvents,
  };
}

export {
  useAnalyticsEvents,
  useAnalyticsScreen,
  useAnalyticsUser,
  useAnalyticsEcommerce,
  useAnalyticsError,
};

export default useAnalytics;
