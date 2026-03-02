/**
 * Analytics Hooks
 * React Query hooks for analytics data fetching
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import * as analyticsApi from '../api/analyticsApi';
import {
  DashboardData,
  RevenueTrendsData,
  ContainerUtilizationData,
  CustomerAnalyticsData,
  GoodsVolumeData,
  PaymentMetricsData,
  RealtimeData,
  PeriodFilter,
  ExportOptions,
} from '../types';

// ============================================
// QUERY KEYS
// ============================================

export const analyticsQueryKeys = {
  all: ['analytics'] as const,
  dashboard: () => [...analyticsQueryKeys.all, 'dashboard'] as const,
  realtime: () => [...analyticsQueryKeys.all, 'realtime'] as const,
  revenue: (params?: PeriodFilter & { groupBy?: string; compare?: boolean }) =>
    [...analyticsQueryKeys.all, 'revenue', params] as const,
  containers: (params?: { period?: string }) =>
    [...analyticsQueryKeys.all, 'containers', params] as const,
  customers: (params?: { limit?: number; period?: string }) =>
    [...analyticsQueryKeys.all, 'customers', params] as const,
  goods: (params?: { period?: string; groupBy?: string }) =>
    [...analyticsQueryKeys.all, 'goods', params] as const,
  payments: (params?: { period?: string }) =>
    [...analyticsQueryKeys.all, 'payments', params] as const,
};

// ============================================
// DASHBOARD HOOKS
// ============================================

export const useGetDashboard = (options?: UseQueryOptions<DashboardData>) => {
  return useQuery({
    queryKey: analyticsQueryKeys.dashboard(),
    queryFn: analyticsApi.getDashboard,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
    ...options,
  });
};

export const useGetRealtimeMetrics = (options?: UseQueryOptions<RealtimeData>) => {
  return useQuery({
    queryKey: analyticsQueryKeys.realtime(),
    queryFn: analyticsApi.getRealtimeMetrics,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Auto-refresh every 30 seconds
    ...options,
  });
};

// ============================================
// REVENUE HOOKS
// ============================================

export const useGetRevenueTrends = (
  params: PeriodFilter & { groupBy?: 'day' | 'week' | 'month'; compare?: boolean } = {},
  options?: UseQueryOptions<RevenueTrendsData>
) => {
  return useQuery({
    queryKey: analyticsQueryKeys.revenue(params),
    queryFn: () => analyticsApi.getRevenueTrends(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

// ============================================
// CONTAINER HOOKS
// ============================================

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

// ============================================
// CUSTOMER HOOKS
// ============================================

export const useGetTopCustomers = (
  params: { limit?: number; period?: string } = { limit: 10, period: '30d' },
  options?: UseQueryOptions<CustomerAnalyticsData>
) => {
  return useQuery({
    queryKey: analyticsQueryKeys.customers(params),
    queryFn: () => analyticsApi.getTopCustomers(params),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

// ============================================
// GOODS HOOKS
// ============================================

export const useGetGoodsVolume = (
  params: { period?: string; groupBy?: string } = { period: '30d' },
  options?: UseQueryOptions<GoodsVolumeData>
) => {
  return useQuery({
    queryKey: analyticsQueryKeys.goods(params),
    queryFn: () => analyticsApi.getGoodsVolume(params),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

// ============================================
// PAYMENT HOOKS
// ============================================

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

// ============================================
// EXPORT HOOK
// ============================================

export const useExportAnalytics = () => {
  return useMutation({
    mutationFn: analyticsApi.exportAnalytics,
  });
};

// ============================================
// INVALIDATION HOOKS
// ============================================

export const useAnalyticsInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateDashboard = () => {
    queryClient.invalidateQueries({ queryKey: analyticsQueryKeys.dashboard() });
  };

  const invalidateRevenue = () => {
    queryClient.invalidateQueries({ queryKey: analyticsQueryKeys.all });
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: analyticsQueryKeys.all });
  };

  return {
    invalidateDashboard,
    invalidateRevenue,
    invalidateAll,
  };
};

// ============================================
// UTILITY HOOKS
// ============================================

export const useFormatCurrency = () => {
  return (amount: number, currency = 'XOF') => {
    if (amount === undefined || amount === null) return '-';
    
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
};

export const useFormatNumber = () => {
  return (num: number, decimals = 0) => {
    if (num === undefined || num === null) return '-';
    
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };
};

export const useFormatPercentage = () => {
  return (value: number, decimals = 1) => {
    if (value === undefined || value === null) return '-';
    
    return `${value.toFixed(decimals)}%`;
  };
};

export const useTrendIndicator = () => {
  return (value: number) => {
    if (value > 0) return { icon: 'trending-up', color: '#10B981', text: `+${value.toFixed(1)}%` };
    if (value < 0) return { icon: 'trending-down', color: '#EF4444', text: `${value.toFixed(1)}%` };
    return { icon: 'trending-neutral', color: '#6B7280', text: '0%' };
  };
};

// ============================================
// LEGACY REPORTS HOOKS (for backwards compatibility)
// ============================================

export const useGetDailyRevenueTrend = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['reports', 'daily'],
    queryFn: () => analyticsApi.getDailyRevenue(),
    staleTime: 5 * 60 * 1000,
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

export const useGetRevenueTrendsLegacy = (period = 'monthly', periods = 12, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['reports', 'trends', period, periods],
    queryFn: () => analyticsApi.getRevenueTrendsLegacy(period, periods),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};
