/**
 * Delivery Info Queries
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { customerTrackingService } from '../../services/customerTrackingService';
import { TrackingStatus } from '../../types/tracking';
import { ApiClientError } from '../../api';
import { trackingQueryKeys } from './trackingQueryKeys';

export const useGetDeliveryProgress = (
  containerId: string | undefined,
  options?: UseQueryOptions<
    {
      progressPercentage: number;
      currentStatus: TrackingStatus;
      daysInTransit: number;
      estimatedDaysRemaining: number | null;
    },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: trackingQueryKeys.progress(containerId || ''),
    queryFn: async () => {
      const response = await customerTrackingService.getDeliveryProgress(
        containerId!
      );
      return response.data;
    },
    enabled: !!containerId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useGetEstimatedDelivery = (
  containerId: string | undefined,
  options?: UseQueryOptions<
    {
      estimatedDelivery: string;
      confidence: 'HIGH' | 'MEDIUM' | 'LOW';
      factors: string[];
    },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: trackingQueryKeys.estimatedDelivery(containerId || ''),
    queryFn: async () => {
      const response = await customerTrackingService.getEstimatedDelivery(
        containerId!
      );
      return response.data;
    },
    enabled: !!containerId,
    staleTime: 30 * 1000,
    ...options,
  });
};
