/**
 * useAdminStats Hook
 * SRP: Orchestrates admin stats data, computations, and refresh
 */

import { useAdminStatsData } from './useAdminStatsData';
import { useStatsComputations } from './useStatsComputations';
import { useStatsRefresh } from './useStatsRefresh';

export const useAdminStats = () => {
  const data = useAdminStatsData();
  const computations = useStatsComputations(data.dashboard, data.goodsVolume, data.paymentMetrics);
  const refresh = useStatsRefresh(data.refetch);

  return {
    user: data.user,
    isLoading: data.isLoading,
    isError: data.isError,
    isFetchingPeriodData: data.isFetchingPeriodData,
    refetch: data.refetch,
    period: data.period,
    setPeriod: data.setPeriod,
    kpiItems: computations.kpiItems,
    dashboard: data.dashboard,
    goodsVolume: data.goodsVolume,
    isLoadingGoods: data.isLoadingGoods,
    shippingModeCounts: computations.shippingModeCounts,
    paymentMetrics: data.paymentMetrics,
    paymentSummary: computations.paymentSummary,
    isLoadingPayments: data.isLoadingPayments,
    topCustomers: data.topCustomersData?.customers || [],
    isLoadingCustomers: data.isLoadingCustomers,
    recentPayments: data.dashboard?.recentPayments || [],
    outstanding: data.dashboard?.outstanding,
    profitSummary: data.profitSummary,
    isLoadingProfit: data.isLoadingProfit,
    totalGoods: computations.totalGoods,
    refreshing: refresh.refreshing,
    onRefresh: refresh.onRefresh,
  };
};
