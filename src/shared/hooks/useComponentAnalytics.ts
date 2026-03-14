/**
 * Component Analytics Hook
 * 
 * Tracks component lifecycle events and interactions for performance
 * monitoring and user behavior analysis.
 */

import { useEffect, useRef, useCallback } from 'react';
import { useAnalytics, AnalyticsEvents } from './useAnalytics';
import { usePerformanceTimer } from '../lib/performance';

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

  const { logEvent } = useAnalytics();
  const { start: startTimer, end: endTimer } = usePerformanceTimer(componentName);
  
  // Track mount time and render count
  const mountTime = useRef<number>(Date.now());
  const renderCount = useRef<number>(0);
  const interactionCount = useRef<number>(0);

  // Start performance measurement on each render
  if (trackPerformance) {
    startTimer();
  }

  useEffect(() => {
    renderCount.current += 1;

    if (trackPerformance) {
      const renderTime = endTimer({ renderCount: renderCount.current });
      
      // Log slow renders
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

  useEffect(() => {
    if (!trackLifecycle) return;

    // Log component mount
    mountTime.current = Date.now();
    logEvent(AnalyticsEvents.PERFORMANCE_METRIC, {
      metric_type: 'component_mount',
      component: componentName,
      timestamp: new Date().toISOString(),
      ...metadata,
    });

    return () => {
      // Log component unmount with lifetime
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
  }, [componentName, trackLifecycle, logEvent, metadata]);

  /**
   * Track user interaction
   */
  const trackInteraction = useCallback((
    action: string,
    params?: Record<string, string | number | boolean>
  ): void => {
    if (!trackInteractions) return;

    interactionCount.current += 1;

    logEvent(AnalyticsEvents.PERFORMANCE_METRIC, {
      metric_type: 'component_interaction',
      component: componentName,
      action,
      interaction_count: interactionCount.current,
      ...metadata,
      ...params,
    });
  }, [componentName, trackInteractions, logEvent, metadata]);

  /**
   * Track form submission
   */
  const trackFormSubmit = useCallback((
    formName: string,
    isValid: boolean,
    errorCount?: number
  ): void => {
    if (!trackInteractions) return;

    logEvent(AnalyticsEvents.FORM_SUBMIT, {
      form_name: formName,
      component: componentName,
      is_valid: isValid,
      error_count: errorCount || 0,
      ...metadata,
    });
  }, [componentName, trackInteractions, logEvent, metadata]);

  /**
   * Track item selection
   */
  const trackItemSelect = useCallback((
    itemId: string,
    itemName?: string,
    itemCategory?: string
  ): void => {
    if (!trackInteractions) return;

    logEvent(AnalyticsEvents.ITEM_SELECT, {
      component: componentName,
      item_id: itemId,
      item_name: itemName,
      item_category: itemCategory,
      ...metadata,
    });
  }, [componentName, trackInteractions, logEvent, metadata]);

  /**
   * Get component analytics stats
   */
  const getStats = useCallback(() => ({
    componentName,
    mountTime: mountTime.current,
    renderCount: renderCount.current,
    interactionCount: interactionCount.current,
    lifetime: Date.now() - mountTime.current,
  }), [componentName]);

  return {
    trackInteraction,
    trackFormSubmit,
    trackItemSelect,
    getStats,
    renderCount: renderCount.current,
    interactionCount: interactionCount.current,
  };
}

/**
 * Hook specifically for screen analytics
 */
export function useScreenAnalytics(
  screenName: string,
  screenClass?: string,
  additionalParams?: Record<string, string | number | boolean>
) {
  const { logScreenView, logEvent, AnalyticsEvents } = useAnalytics();
  const { start: startTimer, end: endTimer } = usePerformanceTimer(`screen_${screenName}`);
  const loadStartTime = useRef<number>(Date.now());

  useEffect(() => {
    // Start timing screen load
    startTimer();
    loadStartTime.current = Date.now();

    // Log screen view
    logScreenView(screenName, screenClass, additionalParams);

    return () => {
      // Log screen exit
      const lifetime = Date.now() - loadStartTime.current;
      logEvent(AnalyticsEvents.PERFORMANCE_METRIC, {
        metric_type: 'screen_exit',
        screen_name: screenName,
        lifetime_ms: lifetime,
        ...additionalParams,
      });
    };
  }, [screenName, screenClass, additionalParams, logScreenView, logEvent, startTimer]);

  /**
   * Report screen fully loaded
   */
  const reportLoaded = useCallback((
    dataSize?: number,
    itemCount?: number
  ): void => {
    const loadTime = endTimer({ 
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
  }, [screenName, additionalParams, endTimer, logEvent, AnalyticsEvents]);

  /**
   * Track screen-specific error
   */
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

// Default export
export default useComponentAnalytics;
