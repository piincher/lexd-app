/**
 * At-Risk Customers Hook
 * React Query hook for churn risk analytics
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import * as analyticsApi from '../../api/analyticsApi';
import type { AtRiskCustomersData, AtRiskCustomersParams } from '../../types';
import { analyticsQueryKeys } from './useAnalyticsQueryKeys';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';

export const useGetAtRiskCustomers = (
  params: AtRiskCustomersParams = { days: 60, page: 1, limit: 20 },
  options?: UseQueryOptions<AtRiskCustomersData>
) => {
  return useQuery({
    queryKey: [...analyticsQueryKeys.all, 'at-risk', params],
    queryFn: () => analyticsApi.getAtRiskCustomers(params),
    staleTime: DEFAULT_STALE_TIME,
    placeholderData: (previousData) => previousData,
    ...options,
  });
};
