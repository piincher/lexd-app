/**
 * Analytics API
 * API client for analytics endpoints
 */

import { apiClient } from '@src/api/client';
import { DashboardData, RevenueTrendsData, ContainerUtilizationData, CustomerAnalyticsData, GoodsVolumeData, PaymentMetricsData, RealtimeData, PeriodFilter, ExportOptions } from '../types';

const BASE_URL = '/v2/analytics';

// ============================================
// DASHBOARD
// ============================================

export const getDashboard = async (): Promise<DashboardData> => {
  const response = await apiClient.get(`${BASE_URL}/dashboard`);
  return response.data;
};

export const getRealtimeMetrics = async (): Promise<RealtimeData> => {
  const response = await apiClient.get(`${BASE_URL}/realtime`);
  return response.data;
};

// ============================================
// REVENUE
// ============================================

export const getRevenueTrends = async (
  params: PeriodFilter & { groupBy?: 'day' | 'week' | 'month'; compare?: boolean }
): Promise<RevenueTrendsData> => {
  const response = await apiClient.get(`${BASE_URL}/revenue`, { params });
  return response.data;
};

// ============================================
// CONTAINERS
// ============================================

export const getContainerUtilization = async (
  params?: { period?: string }
): Promise<ContainerUtilizationData> => {
  const response = await apiClient.get(`${BASE_URL}/containers/utilization`, { params });
  return response.data;
};

// ============================================
// CUSTOMERS
// ============================================

export const getTopCustomers = async (
  params?: { limit?: number; period?: string }
): Promise<CustomerAnalyticsData> => {
  const response = await apiClient.get(`${BASE_URL}/customers/top`, { params });
  return response.data;
};

// ============================================
// GOODS
// ============================================

export const getGoodsVolume = async (
  params?: { period?: string; groupBy?: string }
): Promise<GoodsVolumeData> => {
  const response = await apiClient.get(`${BASE_URL}/goods/volume`, { params });
  return response.data;
};

// ============================================
// PAYMENTS
// ============================================

export const getPaymentMetrics = async (
  params?: { period?: string }
): Promise<PaymentMetricsData> => {
  const response = await apiClient.get(`${BASE_URL}/payments/metrics`, { params });
  return response.data;
};

// ============================================
// EXPORT
// ============================================

export const exportAnalytics = async (options: ExportOptions): Promise<Blob> => {
  const response = await apiClient.get(`${BASE_URL}/export`, {
    params: options,
    responseType: 'blob',
  });
  return response.data;
};

// ============================================
// REPORTS (Legacy endpoints)
// ============================================

export const getDailyRevenue = async (date?: string) => {
  const response = await apiClient.get('/v2/reports/revenue/daily', { params: { date } });
  return response.data;
};

export const getWeeklyRevenue = async (week?: number, year?: number) => {
  const response = await apiClient.get('/v2/reports/revenue/weekly', { params: { week, year } });
  return response.data;
};

export const getMonthlyRevenue = async (month?: number, year?: number) => {
  const response = await apiClient.get('/v2/reports/revenue/monthly', { params: { month, year } });
  return response.data;
};

export const getCustomRevenue = async (start: string, end: string) => {
  const response = await apiClient.get('/v2/reports/revenue/custom', { params: { start, end } });
  return response.data;
};

export const getContainerProfitability = async (limit?: number, period?: string) => {
  const response = await apiClient.get('/v2/reports/containers/profitability', {
    params: { limit, period },
  });
  return response.data;
};

export const getRevenueTrendsLegacy = async (period?: string, periods?: number) => {
  const response = await apiClient.get('/v2/reports/trends', { params: { period, periods } });
  return response.data;
};
