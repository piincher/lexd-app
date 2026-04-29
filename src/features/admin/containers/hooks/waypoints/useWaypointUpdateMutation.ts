/**
 * Waypoint Update Mutation Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { waypointService } from '../../services/WaypointService';
import { WaypointUpdate } from '../../types/waypoints';
import { waypointQueryKeys } from '@src/shared/hooks/useWaypoints';

/**
 * Update a specific waypoint
 */
export const useUpdateWaypoint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      waypointIndex,
      data,
    }: {
      containerId: string;
      waypointIndex: number;
      data: WaypointUpdate;
    }) => {
      const response = await waypointService.updateWaypoint(
        containerId,
        waypointIndex,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.detail(
          variables.containerId,
          variables.waypointIndex
        ),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(variables.containerId),
      });
    },
  });
};
