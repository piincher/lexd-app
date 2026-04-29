/**
 * Waypoint Initialization Mutation Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { waypointService } from '../../services/WaypointService';
import { waypointQueryKeys } from '@src/shared/hooks/useWaypoints';

/**
 * Initialize waypoints for a container
 */
export const useInitializeWaypoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (containerId: string) => {
      const response = await waypointService.initializeWaypoints(containerId);
      return response.data;
    },
    onSuccess: (_, containerId) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(containerId),
      });
    },
  });
};
