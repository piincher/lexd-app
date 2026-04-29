/**
 * Waypoint Completion & Position Mutation Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { waypointService } from '../../services/WaypointService';
import { waypointQueryKeys } from '@src/shared/hooks/useWaypoints';

/**
 * Mark waypoints as completed
 */
export const useMarkWaypointsCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      waypointIndices,
      completedAt,
    }: {
      containerId: string;
      waypointIndices: number[];
      completedAt?: string;
    }) => {
      const response = await waypointService.markWaypointsCompleted(
        containerId,
        waypointIndices,
        completedAt
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

/**
 * Update current position
 */
export const useUpdateCurrentPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      position,
    }: {
      containerId: string;
      position: {
        waypointIndex: number;
        latitude?: number;
        longitude?: number;
        notes?: string;
      };
    }) => {
      const response = await waypointService.updateCurrentPosition(
        containerId,
        position
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
