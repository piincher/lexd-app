/**
 * Notification Hooks - Re-exports
 * @deprecated Import directly from sub-modules for tree-shaking
 */

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
