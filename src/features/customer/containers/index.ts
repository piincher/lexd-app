/**
 * Customer Containers Feature
 * Customer-facing container tracking with Maersk-style timeline
 */

// API
export { customerContainerApi } from './api/customerContainerApi';
export type {
  GetMyContainersResponse,
  GetContainerDetailsResponse,
  GetContainerForGoodsResponse,
  GetMyContainersParams,
  ClientPackingListResponse,
  ClientPackingListItem,
  PackingListConsignee,
  PackingListTracking,
  PackingListSchedule,
  PackingListSignature,
  ClientPackingListSummary,
} from './api/types';

// Tracking API
export { customerTrackingService } from './services';

// Hooks
export {
  useGetMyContainers,
  useGetContainerDetails,
  useGetContainerForGoods,
  useGetMyPackingList,
  useCustomerContainerInvalidation,
} from './hooks/useCustomerContainers';

// Tracking Hooks
export {
  useGetContainerTracking,
  useGetGoodsTracking,
  useGetMyTrackingEvents,
  useGetDeliveryProgress,
  useGetEstimatedDelivery,
  useGetPublicTracking,
  useVerifyContainerNumber,
  useMarkEventsAsRead,
  useSubscribeToTrackingUpdates,
  useUnsubscribeFromTrackingUpdates,
  useIsNearDestination,
  useDaysUntilDelivery,
  useHasUnreadTrackingEvents,
  trackingQueryKeys,
} from './hooks';

// Types
export type {
  CustomerContainerStatus,
  ShippingMode,
  ShippingLine,
  CustomerGoodsInContainer,
  ContainerRoute,
  // eslint-disable-next-line import/export -- Type and component intentionally share this public API name.
  ContainerTimeline,
  CustomerContainer,
  CustomerContainerFilters,
  // Tracking types
  CustomerTrackingInfo,
  PublicTrackingInfo,
  TrackingTimelineEvent,
  TrackingStatus,
  TrackingEventFilters,
} from './types';

export {
  CUSTOMER_STATUS_LABELS,
  CUSTOMER_STATUS_COLORS,
  CUSTOMER_STATUS_BG_COLORS,
  SHIPPING_MODE_LABELS,
  SHIPPING_LINE_LABELS,
  TIMELINE_STEP_LABELS,
  TIMELINE_STEPS_ORDER,
  CUSTOMER_TIMELINE_STEPS,
  // Tracking constants
  TRACKING_STATUS_LABELS,
  TRACKING_STATUS_COLORS,
  TRACKING_STATUS_DESCRIPTIONS,
} from './types';

// Components
// eslint-disable-next-line import/export -- Type and component intentionally share this public API name.
export { ContainerTimeline, ContainerCard } from './components';

// Screens
export { 
  MyContainersScreen, 
  ContainerTrackingScreen,
  ClientPackingListScreen,
  ClientLoadingListScreen,
} from './screens';
