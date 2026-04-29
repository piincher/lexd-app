/**
 * Analytics Container Data Hooks
 * React Query hooks for container utilization and profitability
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import * as analyticsApi from '../../api/analyticsApi';
import { ContainerUtilizationData } from '../../types';
import { analyticsQueryKeys } from './useAnalyticsQueryKeys';

export const useGetContainerUtilization = (
  params: { period?: string } = {},
  options?: UseQueryOptions<ContainerUtilizationData>
) => {
  return useQuery({
    queryKey: analyticsQueryKeys.containers(params),
    queryFn: () => analyticsApi.getContainerUtilization(params),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

export const useGetAllContainersProfitability = (limit = 10, period = '30d', options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['reports', 'containers', 'profitability', limit, period],
    queryFn: () => analyticsApi.getContainerProfitability(limit, period),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
