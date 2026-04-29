/**
 * Tracking Queries - Authenticated
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { customerTrackingService } from '../../services/customerTrackingService';
import { CustomerTrackingInfo } from '../../types/tracking';
import { ApiClientError } from '../../api';
import { trackingQueryKeys } from './trackingQueryKeys';

export const useGetContainerTracking = (
  containerId: string | undefined,
  options?: UseQueryOptions<CustomerTrackingInfo, ApiClientError>
) => {
  return useQuery({
    queryKey: trackingQueryKeys.list(containerId || ''),
    queryFn: async () => {
      const response = await customerTrackingService.getContainerTracking(
        containerId!
      );
      return response.data;
    },
    enabled: !!containerId,
    staleTime: 2 * 60 * 1000,
    refetchInterval: (query) => {
      const data = query.state.data as CustomerTrackingInfo | undefined;
      if (data?.currentStatus === 'IN_TRANSIT') {
        return 2 * 60 * 1000;
      }
      return 5 * 60 * 1000;
    },
    ...options,
  });
};

export const useGetGoodsTracking = (
  goodsId: string | undefined,
  options?: UseQueryOptions<CustomerTrackingInfo, ApiClientError>
) => {
  return useQuery({
    queryKey: [...trackingQueryKeys.all, 'goods', goodsId || ''],
    queryFn: async () => {
      const response = await customerTrackingService.getGoodsTracking(goodsId!);
      return response.data;
    },
    enabled: !!goodsId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};
