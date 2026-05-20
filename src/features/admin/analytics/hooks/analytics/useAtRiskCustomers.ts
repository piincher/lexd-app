/**
 * At-Risk Customers Hook
 * React Query hook for churn risk analytics
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import * as analyticsApi from '../../api/analyticsApi';
import { AtRiskCustomersData } from '../../types';
import { analyticsQueryKeys } from './useAnalyticsQueryKeys';

export const useGetAtRiskCustomers = (
  params: { days?: number; page?: number; limit?: number } = { days: 60, page: 1, limit: 20 },
  options?: UseQueryOptions<AtRiskCustomersData>
) => {
  return useQuery({
    queryKey: [...analyticsQueryKeys.all, 'at-risk', params],
    queryFn: () => analyticsApi.getAtRiskCustomers(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
