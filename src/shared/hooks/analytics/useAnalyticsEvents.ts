/**
 * Analytics Events Hook
 *
 * Provides generic event logging, batch queuing, and convenience trackers.
 */

import { useRef, useCallback } from 'react';
import { trackEvent } from '../../lib/analytics';
import { AnalyticsEvents, type AnalyticsEventName, type AnalyticsParams, sanitizeParams } from './constants';

export function useAnalyticsEvents() {
  const pendingEvents = useRef<Array<{ name: string; params?: AnalyticsParams }>>([]);

  const logEvent = useCallback(async (
    name: AnalyticsEventName | string,
    params?: AnalyticsParams
  ): Promise<void> => {
    try {
      const sanitizedParams = sanitizeParams(params);
      await trackEvent(name, sanitizedParams);
    } catch (error) {
      console.warn('[Analytics] Failed to log event:', error);
    }
  }, []);

  const queueEvent = useCallback((
    name: AnalyticsEventName | string,
    params?: AnalyticsParams
  ): void => {
    pendingEvents.current.push({ name, params });
  }, []);

  const flushEvents = useCallback(async (): Promise<void> => {
    const events = pendingEvents.current;
    pendingEvents.current = [];
    await Promise.all(events.map(event => logEvent(event.name, event.params)));
  }, [logEvent]);

  const trackButtonClick = useCallback(async (
    buttonName: string,
    screenName?: string,
    additionalParams?: AnalyticsParams
  ): Promise<void> => {
    await logEvent(AnalyticsEvents.BUTTON_CLICK, {
      button_name: buttonName,
      screen_name: screenName,
      ...additionalParams,
    });
  }, [logEvent]);

  const trackApiError = useCallback(async (
    endpoint: string,
    error: Error,
    statusCode?: number
  ): Promise<void> => {
    await logEvent(AnalyticsEvents.API_ERROR, {
      endpoint,
      error_message: error.message,
      status_code: statusCode,
    });
  }, [logEvent]);

  return {
    logEvent,
    queueEvent,
    flushEvents,
    trackButtonClick,
    trackApiError,
  };
}
