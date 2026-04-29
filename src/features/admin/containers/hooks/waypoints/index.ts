/**
 * Waypoint Hooks - Barrel Export
 */

// Re-export shared query keys and base query
export { waypointQueryKeys, useGetWaypoints } from '@src/shared/hooks/useWaypoints';

// Query hooks
export { useGetTrackingStatus } from './useWaypointQueries';

// Core mutation hooks
export { useInitializeWaypoints } from './useWaypointInitMutation';
export { useUpdateWaypoint } from './useWaypointUpdateMutation';
export { useAddWaypoint, useRemoveWaypoint } from './useWaypointAddRemoveMutations';

// Segment mutation hooks
export { useUpdateSeaSegment, useUpdateRoadSegment } from './useWaypointSegmentMutations';

// Bulk & position mutation hooks
export { useBulkUpdateWaypoints } from './useWaypointBulkUpdateMutation';
export { useMarkWaypointsCompleted, useUpdateCurrentPosition } from './useWaypointCompletionMutations';

// Status mutation hook
export { useUpdateWaypointStatus } from './useWaypointStatusMutation';

// Stats & utility hooks
export { useWaypointStats, useHasWaypoints } from './useWaypointStats';

// Port-specific hooks
export { useWaypointStatusOptions } from './useWaypointStatusOptions';
