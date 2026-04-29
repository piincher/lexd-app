/**
 * Waypoint Status Mutation Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { waypointService } from '../../services/WaypointService';
import { ContainerWaypoint, WaypointStatus } from '../../types/waypoints';
import { ExtendedWaypointStatus } from '@src/shared/types/waypointStatus';
import { waypointQueryKeys } from '@src/shared/hooks/useWaypoints';

/**
 * Update waypoint status with port-specific validation
 */
export const useUpdateWaypointStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      waypointIndex,
      status,
      additionalData,
    }: {
      containerId: string;
      waypointIndex: number;
      status: ExtendedWaypointStatus;
      additionalData?: Partial<ContainerWaypoint>;
    }) => {
      const response = await waypointService.updateWaypoint(
        containerId,
        waypointIndex,
        { status: status as WaypointStatus, ...additionalData }
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
