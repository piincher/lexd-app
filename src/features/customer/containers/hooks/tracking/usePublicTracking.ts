/**
 * Public Tracking Queries
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { customerTrackingService } from '../../services/customerTrackingService';
import { PublicTrackingInfo } from '../../types/tracking';
import { ApiClientError } from '../../api';
import { trackingQueryKeys } from './trackingQueryKeys';

export const useGetPublicTracking = (
  containerNumber: string | undefined,
  options?: UseQueryOptions<PublicTrackingInfo, ApiClientError>
) => {
  return useQuery({
    queryKey: trackingQueryKeys.publicTracking(containerNumber || ''),
    queryFn: async () => {
      const response = await customerTrackingService.getPublicTracking(
        containerNumber!
      );
      return response.data;
    },
    enabled: !!containerNumber,
    staleTime: 2 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof ApiClientError && error.statusCode === 404) {
        return false;
      }
      return failureCount < 2;
    },
    ...options,
  });
};

export const useVerifyContainerNumber = (
  containerNumber: string | undefined,
  options?: UseQueryOptions<
    { exists: boolean; isInTransit: boolean },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: [...trackingQueryKeys.public(), 'verify', containerNumber || ''],
    queryFn: async () => {
      const response = await customerTrackingService.verifyContainerNumber(
        containerNumber!
      );
      return response.data;
    },
    enabled: !!containerNumber && containerNumber.length >= 8,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
