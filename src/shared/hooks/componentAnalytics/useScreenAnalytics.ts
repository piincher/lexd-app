import { useEffect, useRef, useCallback } from 'react';
import { useAnalytics } from '../useAnalytics';
import { usePerformanceTimer } from '../../lib/performance';

export function useScreenAnalytics(
  screenName: string,
  screenClass?: string,
  additionalParams?: Record<string, string | number | boolean>
) {
  const { logScreenView, logEvent, AnalyticsEvents } = useAnalytics();
  const { start, end } = usePerformanceTimer(`screen_${screenName}`);
  const loadStartTime = useRef<number>(Date.now());

  useEffect(() => {
    start();
    loadStartTime.current = Date.now();

    logScreenView(screenName, screenClass, additionalParams);

    return () => {
      const lifetime = Date.now() - loadStartTime.current;
      logEvent(AnalyticsEvents.PERFORMANCE_METRIC, {
        metric_type: 'screen_exit',
        screen_name: screenName,
        lifetime_ms: lifetime,
        ...additionalParams,
      });
    };
  }, [screenName, screenClass, additionalParams, logScreenView, logEvent, start]);

  const reportLoaded = useCallback((
    dataSize?: number,
    itemCount?: number
  ): void => {
    const loadTime = end({
      data_size: dataSize,
      item_count: itemCount,
    });

    logEvent(AnalyticsEvents.LOAD_TIME, {
      screen_name: screenName,
      load_time_ms: Math.round(loadTime),
      data_size: dataSize,
      item_count: itemCount,
      ...additionalParams,
    });
  }, [screenName, additionalParams, end, logEvent, AnalyticsEvents]);

  const trackError = useCallback((
    error: Error,
    context?: string
  ): void => {
    logEvent(AnalyticsEvents.APP_ERROR, {
      screen_name: screenName,
      error_message: error.message,
      error_context: context || 'screen_error',
      ...additionalParams,
    });
  }, [screenName, additionalParams, logEvent, AnalyticsEvents]);

  return {
    reportLoaded,
    trackError,
  };
}
