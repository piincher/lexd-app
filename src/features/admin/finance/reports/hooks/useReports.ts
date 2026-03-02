/**
 * Financial Reports Hooks - React Query hooks for financial analytics
 * Phase 5: Financial Reports Dashboard
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { reportsApi } from '../api/reportsApi';
import {
  DashboardSummary,
  RevenueReport,
  ContainerProfitability,
  CustomerAnalytics,
  ReportPeriod,
  ExportReportParams,
} from '../types';
import { ApiClientError } from '@src/api/client';

// ============================================
// QUERY KEYS
// ============================================

export const reportsQueryKeys = {
  all: ['financial-reports'] as const,
  
  // Dashboard
  dashboard: () => [...reportsQueryKeys.all, 'dashboard'] as const,
  
  // Revenue Reports
  revenue: () => [...reportsQueryKeys.all, 'revenue'] as const,
  revenueByPeriod: (period: ReportPeriod, startDate?: string, endDate?: string) =>
    [...reportsQueryKeys.revenue(), period, startDate, endDate] as const,
  
  // Container Profitability
  containerProfit: () => [...reportsQueryKeys.all, 'container-profit'] as const,
  containerProfitById: (id: string) =>
    [...reportsQueryKeys.containerProfit(), id] as const,
  allContainerProfits: () => [...reportsQueryKeys.containerProfit(), 'all'] as const,
  
  // Customer Analytics
  customerAnalytics: () => [...reportsQueryKeys.all, 'customer-analytics'] as const,
  customerById: (id: string) =>
    [...reportsQueryKeys.customerAnalytics(), id] as const,
  topCustomers: (limit?: number) =>
    [...reportsQueryKeys.customerAnalytics(), 'top', limit] as const,
};

// ============================================
// DASHBOARD HOOKS
// ============================================

/**
 * Get dashboard summary with key financial metrics
 */
export const useGetDashboardSummary = (
  options?: UseQueryOptions<DashboardSummary, ApiClientError>
) => {
  return useQuery({
    queryKey: reportsQueryKeys.dashboard(),
    queryFn: async () => {
      const response = await reportsApi.getDashboardSummary();
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

// ============================================
// REVENUE REPORT HOOKS
// ============================================

/**
 * Get daily revenue trend for the last 7 days (for dashboard chart)
 */
export const useGetDailyRevenueTrend = (
  options?: UseQueryOptions<RevenueReport, ApiClientError>
) => {
  return useQuery({
    queryKey: [...reportsQueryKeys.revenue(), 'daily-trend'],
    queryFn: async () => {
      const response = await reportsApi.getRevenueReport('DAILY');
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Get revenue report for a specific period
 */
export const useGetRevenueReport = (
  period: ReportPeriod,
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<RevenueReport, ApiClientError>
) => {
  return useQuery({
    queryKey: reportsQueryKeys.revenueByPeriod(period, startDate, endDate),
    queryFn: async () => {
      const response = await reportsApi.getRevenueReport(period, { startDate, endDate });
      return response.data.data;
    },
    enabled: period !== 'CUSTOM' || (!!startDate && !!endDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Get custom date range revenue report
 */
export const useGetCustomRevenueReport = (
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<RevenueReport, ApiClientError>
) => {
  return useQuery({
    queryKey: reportsQueryKeys.revenueByPeriod('CUSTOM', startDate, endDate),
    queryFn: async () => {
      const response = await reportsApi.getCustomRevenueReport(startDate, endDate);
      return response.data.data;
    },
    enabled: !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ============================================
// CONTAINER PROFITABILITY HOOKS
// ============================================

/**
 * Get profitability for a specific container
 */
export const useGetContainerProfitability = (
  containerId: string | undefined,
  options?: UseQueryOptions<ContainerProfitability, ApiClientError>
) => {
  return useQuery({
    queryKey: reportsQueryKeys.containerProfitById(containerId || ''),
    queryFn: async () => {
      const response = await reportsApi.getContainerProfitability(containerId!);
      return response.data.data;
    },
    enabled: !!containerId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Get profitability for all containers
 */
export const useGetAllContainersProfitability = (
  limit: number = 10,
  period: string = '30d',
  options?: UseQueryOptions<ContainerProfitability[], ApiClientError>
) => {
  return useQuery({
    queryKey: [...reportsQueryKeys.allContainerProfits(), limit, period],
    queryFn: async () => {
      const response = await reportsApi.getAllContainersProfitability(limit, period);
      return response.data.data.containers;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ============================================
// CUSTOMER ANALYTICS HOOKS
// ============================================

/**
 * Get analytics for a specific customer
 */
export const useGetCustomerAnalytics = (
  customerId: string | undefined,
  options?: UseQueryOptions<CustomerAnalytics, ApiClientError>
) => {
  return useQuery({
    queryKey: reportsQueryKeys.customerById(customerId || ''),
    queryFn: async () => {
      const response = await reportsApi.getCustomerAnalytics(customerId!);
      return response.data.data;
    },
    enabled: !!customerId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Get top customers by revenue
 */
export const useGetTopCustomers = (
  limit: number = 10,
  period: string = '30d',
  options?: UseQueryOptions<CustomerAnalytics[], ApiClientError>
) => {
  return useQuery({
    queryKey: [...reportsQueryKeys.topCustomers(limit), period],
    queryFn: async () => {
      const response = await reportsApi.getTopCustomers(limit, period);
      return response.data.data.customers;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ============================================
// EXPORT MUTATIONS
// ============================================

/**
 * Export financial report
 */
export const useExportReport = () => {
  return useMutation({
    mutationFn: async (params: ExportReportParams) => {
      const response = await reportsApi.exportReport(params);
      return response.data;
    },
  });
};

/**
 * Download PDF report
 */
export const useDownloadPdf = () => {
  return useMutation({
    mutationFn: async ({
      period,
      startDate,
      endDate,
    }: {
      period: ReportPeriod;
      startDate?: string;
      endDate?: string;
    }) => {
      const response = await reportsApi.downloadPdf(period, startDate, endDate);
      return response.data;
    },
  });
};

// ============================================
// INVALIDATION HOOKS
// ============================================

/**
 * Hook to invalidate financial reports queries
 */
export const useReportsInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateDashboard = () => {
    queryClient.invalidateQueries({ queryKey: reportsQueryKeys.dashboard() });
  };

  const invalidateRevenue = () => {
    queryClient.invalidateQueries({ queryKey: reportsQueryKeys.revenue() });
  };

  const invalidateContainerProfits = () => {
    queryClient.invalidateQueries({ queryKey: reportsQueryKeys.containerProfit() });
  };

  const invalidateCustomerAnalytics = () => {
    queryClient.invalidateQueries({ queryKey: reportsQueryKeys.customerAnalytics() });
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: reportsQueryKeys.all });
  };

  return {
    invalidateDashboard,
    invalidateRevenue,
    invalidateContainerProfits,
    invalidateCustomerAnalytics,
    invalidateAll,
  };
};

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Hook to format currency in XOF
 */
export const useFormatCurrency = () => {
  return (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
};

/**
 * Hook to format percentage
 */
export const useFormatPercentage = () => {
  return (value: number, decimals: number = 1): string => {
    return `${(value || 0).toFixed(decimals)}%`;
  };
};

/**
 * Hook to format large numbers
 */
export const useFormatNumber = () => {
  return (num: number): string => {
    const n = num || 0;
    if (n >= 1000000) {
      return `${(n / 1000000).toFixed(1)}M`;
    }
    if (n >= 1000) {
      return `${(n / 1000).toFixed(1)}K`;
    }
    return n.toLocaleString('fr-FR');
  };
};

/**
 * Hook to get trend color and icon
 */
export const useTrendIndicator = () => {
  return (value: number) => {
    if (value > 0) {
      return {
        color: '#10B981',
        icon: 'trending-up',
        sign: '+',
      };
    }
    if (value < 0) {
      return {
        color: '#EF4444',
        icon: 'trending-down',
        sign: '',
      };
    }
    return {
      color: '#6B7280',
      icon: 'trending-neutral',
      sign: '',
    };
  };
};
