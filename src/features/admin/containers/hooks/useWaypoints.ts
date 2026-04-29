/**
 * Waypoint Hooks - Re-export barrel
 * @deprecated Import from `./waypoints` directly for tree-shaking
 */

export {
  // Query keys & base query
  waypointQueryKeys,
  useGetWaypoints,
  // Queries
  useGetTrackingStatus,
  // Core mutations
  useInitializeWaypoints,
  useUpdateWaypoint,
  useAddWaypoint,
  useRemoveWaypoint,
  // Segment mutations
  useUpdateSeaSegment,
  useUpdateRoadSegment,
  // Bulk mutations
  useBulkUpdateWaypoints,
  useMarkWaypointsCompleted,
  useUpdateCurrentPosition,
  // Status mutation
  useUpdateWaypointStatus,
  // Utilities
  useWaypointStats,
  useHasWaypoints,
  // Port-specific
  useWaypointStatusOptions,
} from './waypoints';
