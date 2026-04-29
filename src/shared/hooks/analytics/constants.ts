/**
 * Analytics Constants
 *
 * Shared analytics event names, types, and utilities.
 */

// Analytics event names (standardized)
export const AnalyticsEvents = {
  SCREEN_VIEW: 'screen_view',
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  ITEM_SELECT: 'item_select',
  ITEM_ADD: 'item_add',
  ITEM_REMOVE: 'item_remove',
  ORDER_CREATED: 'order_created',
  ORDER_UPDATED: 'order_updated',
  ORDER_VIEWED: 'order_viewed',
  ORDER_CANCELLED: 'order_cancelled',
  CONTAINER_VIEWED: 'container_viewed',
  CONTAINER_UPDATED: 'container_updated',
  CONTAINER_SCANNED: 'container_scanned',
  GOODS_VIEWED: 'goods_viewed',
  GOODS_SCANNED: 'goods_scanned',
  GOODS_STATUS_CHANGED: 'goods_status_changed',
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_COMPLETED: 'payment_completed',
  PAYMENT_FAILED: 'payment_failed',
  TOP_UP_COMPLETED: 'top_up_completed',
  USER_LOGIN: 'login',
  USER_LOGOUT: 'logout',
  USER_REGISTERED: 'sign_up',
  USER_UPDATED: 'user_updated',
  APP_ERROR: 'app_error',
  API_ERROR: 'api_error',
  VALIDATION_ERROR: 'validation_error',
  PERFORMANCE_METRIC: 'performance_metric',
  LOAD_TIME: 'load_time',
  SEARCH: 'search',
  FILTER_APPLIED: 'filter_applied',
  SORT_APPLIED: 'sort_applied',
  QR_SCAN: 'qr_scan',
  NOTIFICATION_RECEIVED: 'notification_received',
  NOTIFICATION_OPENED: 'notification_opened',
} as const;

export type AnalyticsEventName = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

export interface AnalyticsParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Sanitize parameters for Mixpanel Analytics
 * - Truncate strings to 100 characters
 * - Remove null/undefined values
 * - Ensure valid types
 */
export function sanitizeParams(params?: AnalyticsParams): Record<string, string | number | boolean> {
  if (!params) return {};

  const sanitized: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;

    if (typeof value === 'string') {
      sanitized[key] = value.slice(0, 100);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    } else {
      sanitized[key] = String(value).slice(0, 100);
    }
  }

  return sanitized;
}
