/**
 * Notification Hooks - Public API
 */

// Core notification hooks (direct sub-module exports)
export {
  notificationQueryKeys,
  useGetNotifications,
  useGetNotificationsInfinite,
  useGetUnreadCount,
} from './notifications/useNotificationQueries';

export { useMarkAsRead } from './notifications/useMarkAsRead';
export { useMarkAllAsRead } from './notifications/useMarkAllAsRead';
export { useDismissNotification } from './notifications/useDismissNotification';
export { useDeleteNotification } from './notifications/useDeleteNotification';

export {
  publicNotificationQueryKeys,
  useGetPublicNotifications,
  useGetPublicNotificationsInfinite,
  useGetPublicNotificationsPolling,
  useGetPublicNotificationStats,
} from './usePublicNotificationQueries';

export { usePublicNotificationDisplay } from './usePublicNotificationDisplay';
export { usePublicNotifications } from './usePublicNotifications';

export { useNotificationDetail } from './useNotificationDetail';

// Push notification hooks
export { usePushNotifications } from './usePushNotifications';
export type {
  UsePushNotificationsReturn,
  UsePushNotificationsOptions,
} from './usePushNotifications';

export { usePushToken } from './usePushToken';
export type { UsePushTokenReturn } from './usePushToken';

export { useNotificationPermissions } from './useNotificationPermissions';
export type { UseNotificationPermissionsReturn } from './useNotificationPermissions';

export { useNotificationBadge } from './useNotificationBadge';
export type { UseNotificationBadgeReturn } from './useNotificationBadge';

export { useNotificationHistory } from './useNotificationHistory';
export type { UseNotificationHistoryReturn } from './useNotificationHistory';

export { useNotificationListeners } from './useNotificationListeners';

export { useNotificationFilterState } from './useNotificationFilterState';
export { useNotificationFilter } from './useNotificationFilter';
export { useNotificationPagination } from './useNotificationPagination';
export { useNotificationScreenMutations } from './useNotificationScreenMutations';

export { useNotificationsScreen } from './useNotificationsScreen';

export { useNotificationNavigation } from './useNotificationNavigation';
export type {
  UseNotificationListenersOptions,
  UseNotificationListenersReturn,
} from './useNotificationListeners';
