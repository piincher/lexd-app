/**
 * Waypoint Bulk Update Mutation Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { waypointService } from '../../services/WaypointService';
import { WaypointUpdate } from '../../types/waypoints';
import { waypointQueryKeys } from '@src/shared/hooks/useWaypoints';

/**
 * Bulk update waypoints
 */
export const useBulkUpdateWaypoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      updates,
    }: {
      containerId: string;
      updates: Array<{
        waypointIndex: number;
        data: WaypointUpdate;
      }>;
    }) => {
      const response = await waypointService.bulkUpdateWaypoints(
        containerId,
        updates
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
