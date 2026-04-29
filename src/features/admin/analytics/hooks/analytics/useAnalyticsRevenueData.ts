/**
 * Analytics Revenue Data Hooks
 * React Query hooks for revenue trends and legacy revenue reports
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import * as analyticsApi from '../../api/analyticsApi';
import { RevenueTrendsData, PeriodFilter } from '../../types';
import { analyticsQueryKeys } from './useAnalyticsQueryKeys';

export const useGetRevenueTrends = (
  params: PeriodFilter & { groupBy?: 'day' | 'week' | 'month'; compare?: boolean } = {},
  options?: UseQueryOptions<RevenueTrendsData>
) => {
  return useQuery({
    queryKey: analyticsQueryKeys.revenue(params),
    queryFn: () => analyticsApi.getRevenueTrends(params),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

export const useGetDailyRevenueTrend = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['reports', 'daily'],
    queryFn: () => analyticsApi.getDailyRevenue(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetRevenueTrendsLegacy = (period = 'monthly', periods = 12, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['reports', 'trends', period, periods],
    queryFn: () => analyticsApi.getRevenueTrendsLegacy(period, periods),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};
