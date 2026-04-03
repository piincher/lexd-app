/**
 * useAdminStats Hook
 * SRP: Data fetching and computation for admin stats dashboard
 * Uses v2 analytics API exclusively
 */

import { useMemo, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetCurrentUser } from '@src/shared/hooks';
import {
  getDashboard,
  getTopCustomers,
  getPaymentMetrics,
  getGoodsVolume,
  getContainerProfitSummary,
  ContainerProfitSummary,
} from '../../api/statsApi';
import {
  KPIItem,
  DashboardResponse,
  TopCustomersResponse,
  PaymentMetricsResponse,
  GoodsVolumeResponse,
  PeriodFilter,
} from '../../types';

const STATS_KEY = 'admin-stats-v2';

// ============================================
// HELPERS
// ============================================

const formatCurrency = (amount: number | string | undefined | null): string => {
  const num = Number(amount) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toFixed(0);
};

// ============================================
// MAIN HOOK
// ============================================

export const useAdminStats = () => {
  const { data: user } = useGetCurrentUser();
  const [period, setPeriod] = useState<PeriodFilter>('30d');

  // V2 Analytics dashboard (core)
  const {
    data: dashboard,
    isLoading: isLoadingDashboard,
    isError: isDashboardError,
    refetch: refetchDashboard,
  } = useQuery<DashboardResponse>({
    queryKey: [STATS_KEY, 'dashboard'],
    queryFn: getDashboard,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Top customers (period-dependent)
  const {
    data: topCustomersData,
    isLoading: isLoadingCustomers,
    refetch: refetchCustomers,
  } = useQuery<TopCustomersResponse>({
    queryKey: [STATS_KEY, 'top-customers', period],
    queryFn: () => getTopCustomers(period, 5),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Payment metrics (period-dependent)
  const {
    data: paymentMetrics,
    isLoading: isLoadingPayments,
    refetch: refetchPayments,
  } = useQuery<PaymentMetricsResponse>({
    queryKey: [STATS_KEY, 'payment-metrics', period],
    queryFn: () => getPaymentMetrics(period),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Goods volume (period-dependent)
  const {
    data: goodsVolume,
    isLoading: isLoadingGoods,
    refetch: refetchGoods,
  } = useQuery<GoodsVolumeResponse>({
    queryKey: [STATS_KEY, 'goods-volume', period],
    queryFn: () => getGoodsVolume(period),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // CBM profit summary (global across all containers)
  const {
    data: profitSummary,
    isLoading: isLoadingProfit,
    refetch: refetchProfit,
  } = useQuery<ContainerProfitSummary>({
    queryKey: [STATS_KEY, 'profit-summary'],
    queryFn: getContainerProfitSummary,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const isLoading = isLoadingDashboard && !dashboard;
  const isError = isDashboardError && !dashboard;

  const refetch = useCallback(() => {
    refetchDashboard();
    refetchCustomers();
    refetchPayments();
    refetchGoods();
    refetchProfit();
  }, [refetchDashboard, refetchCustomers, refetchPayments, refetchGoods, refetchProfit]);

  // Shipping mode breakdown from goods volume
  const shippingModeCounts = useMemo(() => {
    const byMode = goodsVolume?.byShippingMode || [];
    let air = 0;
    let sea = 0;
    byMode.forEach((m) => {
      const mode = m.shippingMode?.toLowerCase();
      if (mode === 'air' || mode === 'aerien') air += m.count;
      else if (mode === 'sea' || mode === 'maritime') sea += m.count;
    });
    return { air, sea };
  }, [goodsVolume]);

  // Payment summary from payment metrics
  const paymentSummary = useMemo(() => {
    const s = paymentMetrics?.summary;
    return {
      collectionRate: Number(s?.collectionRate) || 0,
      totalCollected: Number(s?.totalCollectedFCFA) || 0,
      totalOutstanding: Number(s?.totalOutstandingFCFA) || 0,
      completedTransactions: Number(s?.completedTransactions) || 0,
      totalTransactions: Number(s?.totalTransactions) || 0,
    };
  }, [paymentMetrics]);

  // Build KPI cards from dashboard data
  const kpiItems: KPIItem[] = useMemo(() => {
    const kpis = dashboard?.kpis;
    const monthRevenue = Number(kpis?.thisMonthRevenueFCFA) || 0;
    const weekRevenue = Number(kpis?.thisWeekRevenueFCFA) || 0;
    const goodsInTransit = Number(kpis?.goodsInTransit) || 0;
    const activeContainers = Number(kpis?.activeContainers) || 0;
    const newCustomers = Number(kpis?.newCustomersThisMonth) || 0;
    const pendingPayments = Number(kpis?.pendingPayments) || 0;

    return [
      {
        label: 'Revenu du Mois',
        value: `${formatCurrency(monthRevenue)} F`,
        subtitle: `${formatCurrency(weekRevenue)} F cette semaine`,
        icon: 'wallet-outline',
        color: '#10B981',
        bgColor: '#ECFDF5',
      },
      {
        label: 'En Transit',
        value: goodsInTransit.toString(),
        subtitle: `${activeContainers} conteneurs actifs`,
        icon: 'airplane-outline',
        color: '#3B82F6',
        bgColor: '#EFF6FF',
      },
      {
        label: 'Nouveaux Clients',
        value: newCustomers.toString(),
        subtitle: 'Ce mois-ci',
        icon: 'people-outline',
        color: '#8B5CF6',
        bgColor: '#F5F3FF',
      },
      {
        label: 'Paiements',
        value: pendingPayments.toString(),
        subtitle: 'En attente',
        icon: 'time-outline',
        color: '#F59E0B',
        bgColor: '#FFFBEB',
      },
    ];
  }, [dashboard]);

  return {
    user,
    isLoading,
    isError,
    refetch,
    period,
    setPeriod,
    // KPIs
    kpiItems,
    // Dashboard
    dashboard,
    // Goods & Shipping
    goodsVolume,
    isLoadingGoods,
    shippingModeCounts,
    // Payment
    paymentMetrics,
    paymentSummary,
    isLoadingPayments,
    // Customers
    topCustomers: topCustomersData?.customers || [],
    customersSummary: topCustomersData?.summary,
    isLoadingCustomers,
    // Recent payments
    recentPayments: dashboard?.recentPayments || [],
    // Outstanding
    outstanding: dashboard?.outstanding,
    // CBM Profit
    profitSummary: profitSummary ?? null,
    isLoadingProfit,
  };
};
