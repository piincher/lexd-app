/**
 * Analytics Dashboard Hook
 * Encapsulates all data fetching and business logic for the analytics dashboard
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  useGetDashboard,
  useGetRevenueTrends,
  useGetContainerUtilization,
  useGetTopCustomers,
  useGetGoodsVolume,
  useGetPaymentMetrics,
} from './useAnalytics';

type Period = '7d' | '30d' | '90d' | '1y';

export const useAnalyticsDashboard = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('30d');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const dashboardQuery = useGetDashboard();
  const revenueQuery = useGetRevenueTrends({ period: selectedPeriod, groupBy: 'day' });
  const containerQuery = useGetContainerUtilization({ period: selectedPeriod });
  const customersQuery = useGetTopCustomers({ limit: 10, period: selectedPeriod });
  const goodsQuery = useGetGoodsVolume({ period: selectedPeriod });
  const paymentsQuery = useGetPaymentMetrics({ period: selectedPeriod });

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      dashboardQuery.refetch();
    }, 60000);
    return () => clearInterval(interval);
  }, [autoRefresh, dashboardQuery.refetch]);

  const isLoading =
    dashboardQuery.isLoading ||
    revenueQuery.isLoading ||
    containerQuery.isLoading ||
    customersQuery.isLoading ||
    goodsQuery.isLoading ||
    paymentsQuery.isLoading;

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      dashboardQuery.refetch(),
      revenueQuery.refetch(),
      containerQuery.refetch(),
      customersQuery.refetch(),
      goodsQuery.refetch(),
      paymentsQuery.refetch(),
    ]);
    setRefreshing(false);
  }, [dashboardQuery, revenueQuery, containerQuery, customersQuery, goodsQuery, paymentsQuery]);

  const handleExport = useCallback((format: string) => {
    setShowExportDialog(false);
    console.log(`Exporting in ${format} format...`);
  }, []);

  const navigateToContainerList = useCallback(() => {
    navigation.navigate('ContainerList' as never);
  }, [navigation]);

  const navigateToReports = useCallback(() => {
    navigation.navigate('Reports' as never);
  }, [navigation]);

  return {
    selectedPeriod,
    setSelectedPeriod,
    refreshing,
    showExportDialog,
    setShowExportDialog,
    autoRefresh,
    setAutoRefresh,
    isLoading,
    isError: dashboardQuery.isError,
    error: dashboardQuery.error,
    handleRefresh,
    handleExport,
    navigateToContainerList,
    navigateToReports,
    dashboard: dashboardQuery.data,
    revenueTrends: revenueQuery.data,
    containerUtil: containerQuery.data,
    topCustomers: customersQuery.data,
    goodsVolume: goodsQuery.data,
    paymentMetrics: paymentsQuery.data,
  };
};
