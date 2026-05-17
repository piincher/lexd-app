/**
 * useAdminStatsQueries Hook
 * SRP: Data fetching queries for admin stats dashboard
 */

import { useQuery } from '@tanstack/react-query';
import {
  getDashboard,
  getTopCustomers,
  getPaymentMetrics,
  getGoodsVolume,
  getContainerProfitSummary,
  getOperationsAnalytics,
  ContainerProfitSummary,
} from '../api/statsApi';
import {
  DashboardResponse,
  TopCustomersResponse,
  PaymentMetricsResponse,
  GoodsVolumeResponse,
  OperationsAnalyticsResponse,
  PeriodFilter,
} from '../types';

const STATS_KEY = 'admin-stats-v2';

export const useAdminStatsQueries = (period: PeriodFilter) => {
  const dashboardQuery = useQuery<DashboardResponse>({
    queryKey: [STATS_KEY, 'dashboard'],
    queryFn: getDashboard,
    staleTime: 5 * 60 * 1000,
  });

  const customersQuery = useQuery<TopCustomersResponse>({
    queryKey: [STATS_KEY, 'top-customers', period],
    queryFn: () => getTopCustomers(period, 5),
    staleTime: 5 * 60 * 1000,
  });

  const paymentsQuery = useQuery<PaymentMetricsResponse>({
    queryKey: [STATS_KEY, 'payment-metrics', period],
    queryFn: () => getPaymentMetrics(period),
    staleTime: 5 * 60 * 1000,
  });

  const goodsQuery = useQuery<GoodsVolumeResponse>({
    queryKey: [STATS_KEY, 'goods-volume', period],
    queryFn: () => getGoodsVolume(period),
    staleTime: 5 * 60 * 1000,
  });

  const operationsQuery = useQuery<OperationsAnalyticsResponse>({
    queryKey: [STATS_KEY, 'operations', period],
    queryFn: () => getOperationsAnalytics(period),
    staleTime: 5 * 60 * 1000,
  });

  const profitQuery = useQuery<ContainerProfitSummary>({
    queryKey: [STATS_KEY, 'profit-summary'],
    queryFn: getContainerProfitSummary,
    staleTime: 5 * 60 * 1000,
  });

  return {
    dashboardQuery,
    customersQuery,
    paymentsQuery,
    goodsQuery,
    operationsQuery,
    profitQuery,
  };
};
