/**
 * Waypoint Segment Mutation Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { waypointService } from '../../services/WaypointService';
import { SeaSegmentUpdate, RoadSegmentUpdate } from '../../types/waypoints';
import { waypointQueryKeys } from '@src/shared/hooks/useWaypoints';

/**
 * Update a sea segment
 */
export const useUpdateSeaSegment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      segmentIndex,
      data,
    }: {
      containerId: string;
      segmentIndex: number;
      data: SeaSegmentUpdate;
    }) => {
      const response = await waypointService.updateSeaSegment(
        containerId,
        segmentIndex,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.seaSegments(variables.containerId),
      });
    },
  });
};

/**
 * Update a road segment
 */
export const useUpdateRoadSegment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      segmentIndex,
      data,
    }: {
      containerId: string;
      segmentIndex: number;
      data: RoadSegmentUpdate;
    }) => {
      const response = await waypointService.updateRoadSegment(
        containerId,
        segmentIndex,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.roadSegments(variables.containerId),
      });
    },
  });
};
