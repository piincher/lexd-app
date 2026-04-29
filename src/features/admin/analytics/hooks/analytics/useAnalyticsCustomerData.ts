/**
 * Analytics Customer Data Hook
 * React Query hook for top customers analytics
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import * as analyticsApi from '../../api/analyticsApi';
import { CustomerAnalyticsData } from '../../types';
import { analyticsQueryKeys } from './useAnalyticsQueryKeys';

export const useGetTopCustomers = (
  params: { limit?: number; period?: string } = { limit: 10, period: '30d' },
  options?: UseQueryOptions<CustomerAnalyticsData>
) => {
  return useQuery({
    queryKey: analyticsQueryKeys.customers(params),
    queryFn: () => analyticsApi.getTopCustomers(params),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};
