import { useRef, useCallback } from 'react';
import { useAnalytics, AnalyticsEvents } from '../useAnalytics';

interface UseComponentInteractionsOptions {
  trackInteractions?: boolean;
  metadata?: Record<string, string | number | boolean>;
}

export function useComponentInteractions(
  componentName: string,
  options: UseComponentInteractionsOptions = {}
) {
  const { trackInteractions = true, metadata = {} } = options;
  const { logEvent } = useAnalytics();
  const interactionCount = useRef(0);

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

  return {
    trackInteraction,
    trackFormSubmit,
    trackItemSelect,
    interactionCount,
  };
}
