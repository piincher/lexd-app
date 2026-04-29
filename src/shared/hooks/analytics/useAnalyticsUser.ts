/**
 * Analytics User Hook
 *
 * Manages user identity and properties in Firebase Analytics.
 */

import { useCallback } from 'react';
import { setUserProperty, setUserId } from '../../lib/analytics';

export function useAnalyticsUser() {
  const setUserProperty = useCallback(async (
    name: string,
    value: string | null
  ): Promise<void> => {
    try {
      await setUserProperty(name, value);
    } catch (error) {
      console.warn('[Analytics] Failed to set user property:', error);
    }
  }, []);

  const setUserId = useCallback(async (userId: string | null): Promise<void> => {
    try {
      await setUserId(userId);
    } catch (error) {
      console.warn('[Analytics] Failed to set user ID:', error);
    }
  }, []);

  return { setUserProperty, setUserId };
}
