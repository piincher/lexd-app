/**
 * useAdminStatsData Hook
 * SRP: Raw data fetching for admin stats dashboard
 */

import { useCallback } from 'react';
import { useGetCurrentUser } from '@src/shared/hooks/useUser';
import { useAdminStatsQueries } from './useAdminStatsQueries';
import { useAdminStatsDateRange } from './useAdminStatsDateRange';

export const useAdminStatsData = () => {
  const { data: user } = useGetCurrentUser();
  const { period, setPeriod } = useAdminStatsDateRange();
  const {
    dashboardQuery,
    customersQuery,
    paymentsQuery,
    goodsQuery,
    operationsQuery,
    profitQuery,
  } = useAdminStatsQueries(period);

  const isLoading = dashboardQuery.isLoading && !dashboardQuery.data;
  const isError = dashboardQuery.isError && !dashboardQuery.data;
  const isFetchingPeriodData =
    customersQuery.isLoading || paymentsQuery.isLoading || goodsQuery.isLoading || operationsQuery.isLoading;

  const refetch = useCallback(() => {
    dashboardQuery.refetch();
    customersQuery.refetch();
    paymentsQuery.refetch();
    goodsQuery.refetch();
    operationsQuery.refetch();
    profitQuery.refetch();
  }, [dashboardQuery, customersQuery, paymentsQuery, goodsQuery, operationsQuery, profitQuery]);

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
