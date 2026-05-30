/**
 * Container Tracking Hook
 * React Query hook for container tracking with GPS and ETA
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { trackingApi, ContainerTrackingResponse } from '../api/trackingApi';
import { trackingQueryKeys } from '../constants/queryKeys';
import { ApiClientError } from '../api';

/**
 * Hook to fetch container tracking info with GPS and ETA
 * @param containerId The container ID
 * @param options Additional React Query options
 * @returns Query result with tracking data including GPS coordinates and ETA
 */
export const useContainerTracking = (
  containerId: string | undefined,
  options?: UseQueryOptions<ContainerTrackingResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: trackingQueryKeys.container(containerId || ''),
    queryFn: async () => {
      const response = await trackingApi.getContainerTracking(containerId!);
      return response.data.data;
    },
    enabled: !!containerId,
    staleTime: 2 * 60 * 1000, // 2 minutes (frequent updates for GPS)
    refetchInterval: (query) => {
      // Refetch more frequently if in transit
      const data = query.state.data as ContainerTrackingResponse | undefined;
      if (data?.currentStatus === 'IN_TRANSIT') {
        return 2 * 60 * 1000; // Every 2 minutes for in-transit
      }
      return 5 * 60 * 1000; // Every 5 minutes otherwise
    },
    // Polling fires only while the screen is foregrounded. Backgrounded apps
    // were the dominant source of request volume — customers leave tracking
    // screens open for hours. This guard cuts that to zero.
    refetchIntervalInBackground: false,
    ...options,
  });
};
