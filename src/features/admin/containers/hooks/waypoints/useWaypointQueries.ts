/**
 * Waypoint Query Hooks
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { waypointService } from '../../services/WaypointService';
import { WaypointStatus } from '../../types/waypoints';
import { ApiClientError } from '@src/api/client';
import { waypointQueryKeys } from '@src/shared/hooks/useWaypoints';

export { waypointQueryKeys };

/**
 * Get current tracking status for a container
 */
export const useGetTrackingStatus = (
  containerId: string | undefined,
  options?: UseQueryOptions<
    {
      currentWaypoint: import('../../types/waypoints').ContainerWaypoint | null;
      nextWaypoint: import('../../types/waypoints').ContainerWaypoint | null;
      progressPercentage: number;
      estimatedTimeRemaining: number | null;
      status: WaypointStatus;
    },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: waypointQueryKeys.status(containerId || ''),
    queryFn: async () => {
      const response = await waypointService.getTrackingStatus(containerId!);
      return response.data;
    },
    enabled: !!containerId,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes for live tracking
    // Halt polling when the admin app is backgrounded — perf audit.
    refetchIntervalInBackground: false,
    ...options,
  });
};
