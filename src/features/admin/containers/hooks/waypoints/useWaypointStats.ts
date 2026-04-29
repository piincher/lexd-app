/**
 * Waypoint Stats & Presence Hooks
 */

import { useGetWaypoints } from '@src/shared/hooks/useWaypoints';

/**
 * Hook to get waypoint statistics
 */
export const useWaypointStats = (containerId: string | undefined) => {
  const { data: waypoints } = useGetWaypoints(containerId);

  const stats = {
    total: waypoints?.waypoints?.length || 0,
    completed: waypoints?.waypoints?.filter((w) => w.status === 'COMPLETED').length || 0,
    inProgress: waypoints?.waypoints?.filter((w) => w.status === 'IN_PROGRESS').length || 0,
    pending: waypoints?.waypoints?.filter((w) => w.status === 'PENDING').length || 0,
    delayed: waypoints?.waypoints?.filter((w) => w.status === 'DELAYED').length || 0,
    seaSegments: waypoints?.waypoints?.filter((w) => w.segmentType === 'SEA').length || 0,
    roadSegments: waypoints?.waypoints?.filter((w) => w.segmentType === 'ROAD').length || 0,
    airSegments: waypoints?.waypoints?.filter((w) => w.segmentType === 'AIR').length || 0,
    progressPercentage: waypoints?.progressPercentage || 0,
  };

  return stats;
};

/**
 * Hook to check if container has waypoints initialized
 */
export const useHasWaypoints = (containerId: string | undefined) => {
  const { data: waypoints, isLoading } = useGetWaypoints(containerId);
  return {
    hasWaypoints: !!waypoints?.waypoints?.length,
    isLoading,
    waypointsCount: waypoints?.waypoints?.length || 0,
  };
};
