/**
 * Container ETA Hook
 * React Query hook for container ETA calculations
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { trackingApi } from '../api/trackingApi';
import { trackingQueryKeys } from '../constants/queryKeys';
import { ApiClientError } from '../api';

export interface ETACalculation {
  estimatedArrival: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  factors: string[];
  daysRemaining: number | null;
  delayRisk: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
}

/**
 * Hook to fetch ETA calculation only
 * @param containerId The container ID
 * @returns Query result with ETA
 */
export const useContainerETA = (
  containerId: string | undefined,
  options?: UseQueryOptions<ETACalculation, ApiClientError>
) => {
  return useQuery({
    queryKey: trackingQueryKeys.eta(containerId || ''),
    queryFn: async () => {
      const response = await trackingApi.getETA(containerId!);
      return response.data.data;
    },
    enabled: !!containerId,
    staleTime: 30 * 1000,
    ...options,
  });
};
