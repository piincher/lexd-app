/**
 * Customer Tracking Hooks
 * Re-exports from tracking/ sub-directory for backward compatibility.
 */

export {
  // Query keys
  trackingQueryKeys,
  // Authenticated queries
  useGetContainerTracking,
  useGetGoodsTracking,
  useGetMyTrackingEvents,
  useGetDeliveryProgress,
  useGetEstimatedDelivery,
  // Public tracking queries
  useGetPublicTracking,
  useVerifyContainerNumber,
  // Mutations
  useMarkEventsAsRead,
  useSubscribeToTrackingUpdates,
  useUnsubscribeFromTrackingUpdates,
  // Utilities
  useIsNearDestination,
  useDaysUntilDelivery,
  useHasUnreadTrackingEvents,
} from './tracking';
