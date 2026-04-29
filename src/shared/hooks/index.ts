// Shared Hooks - Public API
// Cross-feature hooks that can be used by any feature

export * from './useOrders';
export * from './useUser';
export * from './useNotification';
export * from './useRoutes';
export * from './useOrderDetail';

export * from './useHaptics';
export * from './useAnalytics';
export * from './useComponentAnalytics';
export * from './componentAnalytics';

// Keep existing exports for backward compatibility
export {
  usePushNotifications,
  type UsePushNotificationsReturn,
  type UsePushNotificationsOptions,
} from './usePushNotifications';

export * from './deepLinks';
export * from './useOfflineMutation';
