import { useEffect, useRef } from 'react';
import { useAnalytics, AnalyticsEvents } from '../useAnalytics';

interface UseComponentLifecycleOptions {
  trackLifecycle?: boolean;
  metadata?: Record<string, string | number | boolean>;
}

export function useComponentLifecycle(
  componentName: string,
  options: UseComponentLifecycleOptions = {},
  renderCount: React.MutableRefObject<number>,
  interactionCount: React.MutableRefObject<number>
) {
  const { trackLifecycle = true, metadata = {} } = options;
  const { logEvent } = useAnalytics();
  const mountTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!trackLifecycle) return;

    mountTime.current = Date.now();
    logEvent(AnalyticsEvents.PERFORMANCE_METRIC, {
      metric_type: 'component_mount',
      component: componentName,
      timestamp: new Date().toISOString(),
      ...metadata,
    });

    return () => {
      const lifetime = Date.now() - mountTime.current;
      logEvent(AnalyticsEvents.PERFORMANCE_METRIC, {
        metric_type: 'component_unmount',
        component: componentName,
        lifetime_ms: lifetime,
        total_renders: renderCount.current,
        total_interactions: interactionCount.current,
        ...metadata,
      });
    };
  }, [componentName, trackLifecycle, logEvent, metadata, renderCount, interactionCount]);

  return { mountTime };
}
