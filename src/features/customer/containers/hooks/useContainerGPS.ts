/**
 * Container GPS Hook
 * React Query hook for container GPS location
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { trackingApi } from '../api/trackingApi';
import { trackingQueryKeys } from '../constants/queryKeys';
import { ApiClientError } from '@src/api/client';

export interface GPSLocation {
  latitude: number;
  longitude: number;
  timestamp: string;
  accuracy?: number;
  speed?: number;
}

/**
 * Hook to fetch GPS location only
 * @param containerId The container ID
 * @returns Query result with GPS coordinates
 */
export const useContainerGPS = (
  containerId: string | undefined,
  options?: UseQueryOptions<GPSLocation, ApiClientError>
) => {
  return useQuery({
    queryKey: trackingQueryKeys.gps(containerId || ''),
    queryFn: async () => {
      const response = await trackingApi.getGPSLocation(containerId!);
      return response.data.data;
    },
    enabled: !!containerId,
    staleTime: 1 * 60 * 1000, // 1 minute (GPS updates frequently)
    refetchInterval: 60 * 1000, // Poll every minute
    ...options,
  });
};
