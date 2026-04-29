/**
 * Analytics Payment Data Hook
 * React Query hook for payment metrics
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import * as analyticsApi from '../../api/analyticsApi';
import { PaymentMetricsData } from '../../types';
import { analyticsQueryKeys } from './useAnalyticsQueryKeys';

export const useGetPaymentMetrics = (
  params: { period?: string } = { period: '30d' },
  options?: UseQueryOptions<PaymentMetricsData>
) => {
  return useQuery({
    queryKey: analyticsQueryKeys.payments(params),
    queryFn: () => analyticsApi.getPaymentMetrics(params),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};
