/**
 * Component Analytics Hook
 *
 * Tracks component lifecycle events and interactions for performance
 * monitoring and user behavior analysis.
 *
 * This is a composition hook that delegates to focused sub-hooks.
 */

import { useComponentMetrics } from './componentAnalytics/useComponentMetrics';
import { useComponentInteractions } from './componentAnalytics/useComponentInteractions';
import { useComponentLifecycle } from './componentAnalytics/useComponentLifecycle';
import { useComponentStats } from './componentAnalytics/useComponentStats';

export { useScreenAnalytics } from './componentAnalytics/useScreenAnalytics';

interface ComponentAnalyticsOptions {
  /** Track mount/unmount events */
  trackLifecycle?: boolean;
  /** Track interaction events */
  trackInteractions?: boolean;
  /** Track render performance */
  trackPerformance?: boolean;
  /** Performance threshold in ms for slow render warning */
  performanceThreshold?: number;
  /** Additional metadata to include with events */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Hook to track component analytics
 */
export function useComponentAnalytics(
  componentName: string,
  options: ComponentAnalyticsOptions = {}
) {
  const {
    trackLifecycle = true,
    trackInteractions = true,
    trackPerformance = true,
    performanceThreshold = 100,
    metadata = {},
  } = options;

  const { renderCount } = useComponentMetrics(componentName, {
    trackPerformance,
    performanceThreshold,
    metadata,
  });

  const {
    trackInteraction,
    trackFormSubmit,
    trackItemSelect,
    interactionCount,
  } = useComponentInteractions(componentName, {
    trackInteractions,
    metadata,
  });

  const { mountTime } = useComponentLifecycle(
    componentName,
    { trackLifecycle, metadata },
    renderCount,
    interactionCount
  );

  const {
    getStats,
    renderCount: renderCountValue,
    interactionCount: interactionCountValue,
  } = useComponentStats(componentName, mountTime, renderCount, interactionCount);

  return {
    trackInteraction,
    trackFormSubmit,
    trackItemSelect,
    getStats,
    renderCount: renderCountValue,
    interactionCount: interactionCountValue,
  };
}

// Default export
export default useComponentAnalytics;
