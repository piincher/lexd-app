/**
 * Customer Container Hooks - Public API
 */

export {
  useGetMyContainers,
  useGetContainerDetails,
  useGetContainerForGoods,
  useGetMyPackingList,
  useDownloadPackingListPDF,
  useCustomerContainerInvalidation,
} from './useCustomerContainers';

// ============================================
// TRACKING HOOKS
// ============================================

export {
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
  
  // Query keys
  trackingQueryKeys,
} from './useCustomerTracking';
