/**
 * Waypoint Status Options Hook
 */

import { useGetWaypoints } from '@src/shared/hooks/useWaypoints';
import {
  ExtendedWaypointStatus,
  getLocationCategory,
} from '@src/shared/types/waypointStatus';

/**
 * Hook to get available status options for a specific waypoint
 * Returns port-specific status options based on location
 */
export const useWaypointStatusOptions = (
  containerId: string | undefined,
  waypointIndex: number | undefined
) => {
  const { data: waypointsResponse } = useGetWaypoints(containerId);

  const waypoint = waypointIndex !== undefined
    ? waypointsResponse?.waypoints?.[waypointIndex]
    : undefined;

  const locationCode = waypoint?.location?.portCode || '';
  const currentStatus = waypoint?.status as ExtendedWaypointStatus;

  return {
    waypoint,
    locationCode,
    currentStatus,
    isPort: getLocationCategory(locationCode) === 'DISCHARGE_PORT',
    isBorder: getLocationCategory(locationCode) === 'BORDER',
    isWarehouse: getLocationCategory(locationCode) === 'WAREHOUSE',
  };
};
