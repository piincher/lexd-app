import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { waypointService } from '@src/shared/services/waypointService';
import { WaypointsResponse } from '@src/shared/types/containerWaypoints';
import { ApiClientError } from '@src/api/client';

export const waypointQueryKeys = {
  all: ['waypoints'] as const,
  lists: () => [...waypointQueryKeys.all, 'list'] as const,
  list: (containerId: string) => [...waypointQueryKeys.lists(), containerId] as const,
  details: () => [...waypointQueryKeys.all, 'detail'] as const,
  detail: (containerId: string, index: number) =>
    [...waypointQueryKeys.details(), containerId, index] as const,
  status: (containerId: string) =>
    [...waypointQueryKeys.list(containerId), 'status'] as const,
  seaSegments: (containerId: string) =>
    [...waypointQueryKeys.list(containerId), 'sea-segments'] as const,
  roadSegments: (containerId: string) =>
    [...waypointQueryKeys.list(containerId), 'road-segments'] as const,
};

export const useGetWaypoints = (
  containerId: string | undefined,
  options?: UseQueryOptions<WaypointsResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: waypointQueryKeys.list(containerId || ''),
    queryFn: async () => {
      const response = await waypointService.getWaypoints(containerId!);
      return response.data;
    },
    enabled: !!containerId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};
