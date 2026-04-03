/**
 * Analytics Hook
 * 
 * Provides Firebase Analytics integration for tracking screen views,
 * user events, and errors in the application.
 */

import { useCallback, useRef } from 'react';
import analytics from '@react-native-firebase/analytics';
import { captureException, addBreadcrumb } from '../lib/sentry';

// Analytics event names (standardized)
export const AnalyticsEvents = {
  // Screen views
  SCREEN_VIEW: 'screen_view',
  
  // User actions
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  ITEM_SELECT: 'item_select',
  ITEM_ADD: 'item_add',
  ITEM_REMOVE: 'item_remove',
  
  // Order related
  ORDER_CREATED: 'order_created',
  ORDER_UPDATED: 'order_updated',
  ORDER_VIEWED: 'order_viewed',
  ORDER_CANCELLED: 'order_cancelled',
  
  // Container related
  CONTAINER_VIEWED: 'container_viewed',
  CONTAINER_UPDATED: 'container_updated',
  CONTAINER_SCANNED: 'container_scanned',
  
  // Goods related
  GOODS_VIEWED: 'goods_viewed',
  GOODS_SCANNED: 'goods_scanned',
  GOODS_STATUS_CHANGED: 'goods_status_changed',
  
  // Payment related
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_COMPLETED: 'payment_completed',
  PAYMENT_FAILED: 'payment_failed',
  TOP_UP_COMPLETED: 'top_up_completed',
  
  // User related
  USER_LOGIN: 'login',
  USER_LOGOUT: 'logout',
  USER_REGISTERED: 'sign_up',
  USER_UPDATED: 'user_updated',
  
  // Errors
  APP_ERROR: 'app_error',
  API_ERROR: 'api_error',
  VALIDATION_ERROR: 'validation_error',
  
  // Performance
  PERFORMANCE_METRIC: 'performance_metric',
  LOAD_TIME: 'load_time',
  
  // Feature usage
  SEARCH: 'search',
  FILTER_APPLIED: 'filter_applied',
  SORT_APPLIED: 'sort_applied',
  QR_SCAN: 'qr_scan',
  NOTIFICATION_RECEIVED: 'notification_received',
  NOTIFICATION_OPENED: 'notification_opened',
} as const;

type AnalyticsEventName = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

interface AnalyticsParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Hook for analytics tracking
 */
export function useAnalytics() {
  // Track pending events for batch processing
  const pendingEvents = useRef<Array<{ name: string; params?: AnalyticsParams }>>([]);

  /**
   * Log screen view
   */
  const logScreenView = useCallback(async (
    screenName: string,
    screenClass?: string,
    additionalParams?: AnalyticsParams
  ): Promise<void> => {
    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenClass || screenName,
      });

      // Also add breadcrumb for Sentry
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

  /**
   * Log custom event
   */
  const logEvent = useCallback(async (
    name: AnalyticsEventName | string,
    params?: AnalyticsParams
  ): Promise<void> => {
    try {
      // Sanitize params to ensure they meet Firebase requirements
      const sanitizedParams = sanitizeParams(params);
      
      await analytics().logEvent(name, sanitizedParams);
    } catch (error) {
      console.warn('[Analytics] Failed to log event:', error);
    }
  }, []);

  /**
   * Log error event
   */
  const logError = useCallback(async (
    error: Error,
    context?: string,
    additionalData?: AnalyticsParams
  ): Promise<void> => {
    try {
      // Log to Firebase
      await analytics().logEvent(AnalyticsEvents.APP_ERROR, {
        error_message: error.message,
        error_name: error.name,
        error_context: context || 'unknown',
        ...additionalData,
      });

      // Also capture in Sentry
      captureException(error, { context, ...additionalData });
    } catch (e) {
      console.warn('[Analytics] Failed to log error:', e);
    }
  }, []);

  /**
   * Log user property
   */
  const setUserProperty = useCallback(async (
    name: string,
    value: string | null
  ): Promise<void> => {
    try {
      await analytics().setUserProperty(name, value);
    } catch (error) {
      console.warn('[Analytics] Failed to set user property:', error);
    }
  }, []);

  /**
   * Log user ID (hashed for privacy)
   */
  const setUserId = useCallback(async (userId: string | null): Promise<void> => {
    try {
      await analytics().setUserId(userId);
    } catch (error) {
      console.warn('[Analytics] Failed to set user ID:', error);
    }
  }, []);

  /**
   * Log purchase/transaction
   */
  const logPurchase = useCallback(async (
    transactionId: string,
    value: number,
    currency: string = 'XOF',
    items?: Array<{
      itemId: string;
      itemName: string;
      itemCategory?: string;
      quantity?: number;
      price?: number;
    }>
  ): Promise<void> => {
    try {
      await analytics().logPurchase({
        transaction_id: transactionId,
        value,
        currency,
        items: items?.map(item => ({
          item_id: item.itemId,
          item_name: item.itemName,
          item_category: item.itemCategory,
          quantity: item.quantity || 1,
          price: item.price,
        })),
      });
    } catch (error) {
      console.warn('[Analytics] Failed to log purchase:', error);
    }
  }, []);

  /**
   * Queue event for batch processing
   */
  const queueEvent = useCallback((
    name: AnalyticsEventName | string,
    params?: AnalyticsParams
  ): void => {
    pendingEvents.current.push({ name, params });
  }, []);

  /**
   * Flush queued events
   */
  const flushEvents = useCallback(async (): Promise<void> => {
    const events = pendingEvents.current;
    pendingEvents.current = [];

    await Promise.all(
      events.map(event => logEvent(event.name, event.params))
    );
  }, [logEvent]);

  /**
   * Track button click
   */
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

  /**
   * Track API error
   */
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
    logScreenView,
    logEvent,
    logError,
    setUserProperty,
    setUserId,
    logPurchase,
    queueEvent,
    flushEvents,
    trackButtonClick,
    trackApiError,
    AnalyticsEvents,
  };
}

/**
 * Sanitize parameters for Firebase Analytics
 * - Truncate strings to 100 characters
 * - Remove null/undefined values
 * - Ensure valid types
 */
function sanitizeParams(params?: AnalyticsParams): Record<string, string | number | boolean> {
  if (!params) return {};

  const sanitized: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(params)) {
    // Skip null/undefined values
    if (value === null || value === undefined) continue;

    // Handle strings - truncate to 100 characters
    if (typeof value === 'string') {
      sanitized[key] = value.slice(0, 100);
    }
    // Handle numbers and booleans directly
    else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    }
    // Convert other types to string
    else {
      sanitized[key] = String(value).slice(0, 100);
    }
  }

  return sanitized;
}

// Default export
export default useAnalytics;
