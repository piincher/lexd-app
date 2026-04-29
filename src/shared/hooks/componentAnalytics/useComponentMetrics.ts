import { useEffect, useRef } from 'react';
import { useAnalytics, AnalyticsEvents } from '../useAnalytics';
import { usePerformanceTimer } from '../../lib/performance';

interface UseComponentMetricsOptions {
  trackPerformance?: boolean;
  performanceThreshold?: number;
  metadata?: Record<string, string | number | boolean>;
}

export function useComponentMetrics(
  componentName: string,
  options: UseComponentMetricsOptions = {}
) {
  const {
    trackPerformance = true,
    performanceThreshold = 100,
    metadata = {},
  } = options;

  const { logEvent } = useAnalytics();
  const { start, end } = usePerformanceTimer(componentName);
  const renderCount = useRef(0);

  if (trackPerformance) {
    start();
  }

  useEffect(() => {
    renderCount.current += 1;

    if (trackPerformance) {
      const renderTime = end({ renderCount: renderCount.current });

      if (renderTime > performanceThreshold) {
        logEvent(AnalyticsEvents.PERFORMANCE_METRIC, {
          metric_type: 'slow_render',
          component: componentName,
          render_time_ms: Math.round(renderTime),
          render_count: renderCount.current,
          threshold_ms: performanceThreshold,
          ...metadata,
        });
      }
    }
  });

  return { renderCount };
}
