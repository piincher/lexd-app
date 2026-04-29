/**
 * Analytics Goods Data Hook
 * React Query hook for goods volume analytics
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import * as analyticsApi from '../../api/analyticsApi';
import { GoodsVolumeData } from '../../types';
import { analyticsQueryKeys } from './useAnalyticsQueryKeys';

export const useGetGoodsVolume = (
  params: { period?: string; groupBy?: string } = { period: '30d' },
  options?: UseQueryOptions<GoodsVolumeData>
) => {
  return useQuery({
    queryKey: analyticsQueryKeys.goods(params),
    queryFn: () => analyticsApi.getGoodsVolume(params),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};
