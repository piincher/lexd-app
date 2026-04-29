/**
 * Waypoint Add/Remove Mutation Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { waypointService } from '../../services/WaypointService';
import { ContainerWaypoint } from '../../types/waypoints';
import { waypointQueryKeys } from '@src/shared/hooks/useWaypoints';

/**
 * Add a new waypoint
 */
export const useAddWaypoint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      waypoint,
    }: {
      containerId: string;
      waypoint: ContainerWaypoint;
    }) => {
      const response = await waypointService.addWaypoint(containerId, waypoint);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(variables.containerId),
      });
    },
  });
};

/**
 * Remove a waypoint
 */
export const useRemoveWaypoint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      waypointIndex,
    }: {
      containerId: string;
      waypointIndex: number;
    }) => {
      const response = await waypointService.removeWaypoint(
        containerId,
        waypointIndex
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(variables.containerId),
      });
    },
  });
};
