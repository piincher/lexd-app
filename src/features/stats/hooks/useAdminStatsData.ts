/**
 * useAdminStatsData Hook
 * SRP: Raw data fetching for admin stats dashboard
 */

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetCurrentUser } from '@src/shared/hooks/useUser';
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

export const useAdminStatsData = () => {
  const { data: user } = useGetCurrentUser();
  const [period, setPeriod] = useState<PeriodFilter>('30d');

  const dashboardQuery = useQuery<DashboardResponse>({
    queryKey: [STATS_KEY, 'dashboard'],
    queryFn: getDashboard,
    staleTime: 5 * 60 * 1000,
    // Use global retry config
  });

  const customersQuery = useQuery<TopCustomersResponse>({
    queryKey: [STATS_KEY, 'top-customers', period],
    queryFn: () => getTopCustomers(period, 5),
    staleTime: 5 * 60 * 1000,
    // Use global retry config
  });

  const paymentsQuery = useQuery<PaymentMetricsResponse>({
    queryKey: [STATS_KEY, 'payment-metrics', period],
    queryFn: () => getPaymentMetrics(period),
    staleTime: 5 * 60 * 1000,
    // Use global retry config
  });

  const goodsQuery = useQuery<GoodsVolumeResponse>({
    queryKey: [STATS_KEY, 'goods-volume', period],
    queryFn: () => getGoodsVolume(period),
    staleTime: 5 * 60 * 1000,
    // Use global retry config
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
    // Use global retry config
  });

  const isLoading = dashboardQuery.isLoading && !dashboardQuery.data;
  const isError = dashboardQuery.isError && !dashboardQuery.data;
  const isFetchingPeriodData =
    customersQuery.isLoading || paymentsQuery.isLoading || goodsQuery.isLoading || operationsQuery.isLoading;
  const refetchDashboard = dashboardQuery.refetch;
  const refetchCustomers = customersQuery.refetch;
  const refetchPayments = paymentsQuery.refetch;
  const refetchGoods = goodsQuery.refetch;
  const refetchOperations = operationsQuery.refetch;
  const refetchProfit = profitQuery.refetch;

  const refetch = useCallback(() => {
    refetchDashboard();
    refetchCustomers();
    refetchPayments();
    refetchGoods();
    refetchOperations();
    refetchProfit();
  }, [
    refetchDashboard,
    refetchCustomers,
    refetchPayments,
    refetchGoods,
    refetchOperations,
    refetchProfit,
  ]);

  return {
    user,
    period,
    setPeriod,
    dashboard: dashboardQuery.data,
    isLoading,
    isError,
    isFetchingPeriodData,
    refetch,
    goodsVolume: goodsQuery.data,
    isLoadingGoods: goodsQuery.isLoading,
    operations: operationsQuery.data,
    isLoadingOperations: operationsQuery.isLoading,
    paymentMetrics: paymentsQuery.data,
    isLoadingPayments: paymentsQuery.isLoading,
    topCustomersData: customersQuery.data,
    isLoadingCustomers: customersQuery.isLoading,
    profitSummary: profitQuery.data ?? null,
    isLoadingProfit: profitQuery.isLoading,
  };
};
