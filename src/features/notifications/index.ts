/**
 * Notifications Feature - Public API
 * 
 * In-App Notification System for ChinaLink Express
 * Provides real-time notifications, toast messages, and notification center
 */

// Types
export type {
  NotificationType,
  NotificationCategory,
  InAppNotification,
  NotificationFilters,
  GetNotificationsParams,
  PaginatedNotifications,
  UnreadCountResponse,
} from './types';

export {
  NOTIFICATION_TYPE_CONFIG,
  NOTIFICATION_CATEGORY_CONFIG,
  NOTIFICATION_PRIORITY_CONFIG,
} from './types';

// API
export { notificationApi } from './api';
export type {
  ApiResponse,
  PaginatedNotifications,
  UnreadCountResponse,
  GetNotificationsParams,
  InAppNotification as NotificationApiType,
} from './api';

// Hooks
export {
  notificationQueryKeys,
  useGetNotifications,
  useGetNotificationsInfinite,
  useGetUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
  useDismissNotification,
  useDeleteNotification,
  usePushNotifications,
  usePushToken,
  useNotificationPermissions,
  useNotificationBadge,
  useNotificationHistory,
  useNotificationListeners,
} from './hooks';

export type {
  UsePushNotificationsReturn,
  UsePushNotificationsOptions,
  UsePushTokenReturn,
  UseNotificationPermissionsReturn,
  UseNotificationBadgeReturn,
  UseNotificationHistoryReturn,
  UseNotificationListenersOptions,
  UseNotificationListenersReturn,
} from './hooks';

// Components
export {
  NotificationItem,
  NotificationBell,
  NotificationBadge,
  NotificationDropdown,
  NotificationToast,
  NotificationSkeleton,
  NotificationProvider,
  useNotificationContext,
  useShowNotification,
} from './components';

// Screens
export {
  NotificationsScreen,
  NotificationDetailScreen,
} from './screens';

// Utils
export {
  formatRelativeTime,
  formatFullDate,
  formatShortDate,
} from './utils/timeUtils';
