/**
 * Container Hooks - Public API
 */

export {
  useGetAllContainers,
  useGetContainerById,
  useGetContainersByStatus,
  useGetReadyForDeparture,
  useGetUnassignedGoods,
  useGetPackingList,
  useCreateContainer,
  useUpdateContainerStatus,
  useDeleteContainer,
  useAssignGoodsToContainer,
  useRemoveGoodsFromContainer,
  useContainerStats,
  // Phase 3: Route hooks
  useGetActiveRoutesForMode,
  // Phase 3: Pickup workflow hooks
  useMarkReadyForPickup,
  useMarkContainerDelivered,
  useMarkGoodsDelivered,
  // Dual-ledger profit reconciliation hooks
  useReconcileContainer,
  useGetClientAllocations,
} from './useContainers';

export { containerQueryKeys } from './useContainers';

// ============================================
// SCREEN HOOKS
// ============================================

export { useContainerListScreen } from './useContainerListScreen';

// ============================================
// WAYPOINT HOOKS
// ============================================

export {
  // Queries
  useGetWaypoints,
  useGetTrackingStatus,

  // Mutations
  useInitializeWaypoints,
  useUpdateWaypoint,
  useUpdateWaypointStatus,
  useAddWaypoint,
  useRemoveWaypoint,
  useUpdateSeaSegment,
  useUpdateRoadSegment,
  useBulkUpdateWaypoints,
  useMarkWaypointsCompleted,
  useUpdateCurrentPosition,

  // Utilities
  useWaypointStats,
  useHasWaypoints,

  // Query keys
  waypointQueryKeys,
} from './useWaypoints';

// ============================================
// TRANSIT STATUS HOOKS
// ============================================

export {
  transitStatusQueryKeys,
  useGetTransitStatus,
  useGetTransitHistory,
  useUpdateTransitStatus,
  useValidateTransitTransition,
  useBulkUpdateTransitStatus,
  useTransitProgress,
} from './transit';

// Loading List Hooks
export { useLoadingListData, MAX_CBM } from './useLoadingListData';
export { useLoadingListMetrics } from './useLoadingListMetrics';

// Waypoint Update Form Hook
export { useWaypointUpdateForm } from './useWaypointUpdateForm';
export { useWaypointFormState } from './useWaypointFormState';
export { useWaypointFormValidation } from './useWaypointFormValidation';
export { useWaypointFormSubmission } from './useWaypointFormSubmission';

// Transit Status Manager Hook
export { useTransitStatusManager } from './useTransitStatusManager';
