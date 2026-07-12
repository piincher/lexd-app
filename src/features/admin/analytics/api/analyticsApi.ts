/**
 * Analytics API
 * API client for analytics endpoints
 */

import { apiClientV2 } from '@src/api/client';
import { DashboardData, RevenueTrendsData, ContainerUtilizationData, CustomerAnalyticsData, AtRiskCustomersData, AtRiskCustomersParams, GoodsVolumeData, PaymentMetricsData, RealtimeData, PeriodFilter, ExportOptions } from '../types';

const BASE_URL = '/analytics';

// Helper to unwrap the standard { success, data, message, meta } response shape
const unwrap = <T>(response: { data?: T | { data?: T } }): T => {
  const payload = response.data;
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data?: T }).data as T;
  }
  return payload as T;
};

// ============================================
// DASHBOARD
// ============================================

export const getDashboard = async (): Promise<DashboardData> => {
  const response = await apiClientV2.get(`${BASE_URL}/dashboard`);
  return unwrap(response);
};

export const getRealtimeMetrics = async (): Promise<RealtimeData> => {
  const response = await apiClientV2.get(`${BASE_URL}/realtime`);
  return unwrap(response);
};

// ============================================
// REVENUE
// ============================================

export const getRevenueTrends = async (
  params: PeriodFilter & { groupBy?: 'day' | 'week' | 'month'; compare?: boolean }
): Promise<RevenueTrendsData> => {
  const response = await apiClientV2.get(`${BASE_URL}/revenue`, { params });
  return unwrap(response);
};

// ============================================
// CONTAINERS
// ============================================

export const getContainerUtilization = async (
  params?: { period?: string }
): Promise<ContainerUtilizationData> => {
  const response = await apiClientV2.get(`${BASE_URL}/containers/utilization`, { params });
  return unwrap(response);
};

// ============================================
// CUSTOMERS
// ============================================

export const getTopCustomers = async (
  params?: { limit?: number; period?: string }
): Promise<CustomerAnalyticsData> => {
  const response = await apiClientV2.get(`${BASE_URL}/customers/top`, { params });
  return unwrap(response);
};

export const getAtRiskCustomers = async (
  params?: AtRiskCustomersParams
): Promise<AtRiskCustomersData> => {
  const response = await apiClientV2.get(`${BASE_URL}/customers/at-risk`, { params });
  return unwrap(response);
};

// ============================================
// GOODS
// ============================================

export const getGoodsVolume = async (
  params?: { period?: string; groupBy?: string }
): Promise<GoodsVolumeData> => {
  const response = await apiClientV2.get(`${BASE_URL}/goods/volume`, { params });
  return unwrap(response);
};

// ============================================
// PAYMENTS
// ============================================

export const getPaymentMetrics = async (
  params?: { period?: string }
): Promise<PaymentMetricsData> => {
  const response = await apiClientV2.get(`${BASE_URL}/payments/metrics`, { params });
  return unwrap(response);
};

// ============================================
// EXPORT
// ============================================

export const exportAnalytics = async (options: ExportOptions): Promise<Blob> => {
  const response = await apiClientV2.get(`${BASE_URL}/export`, {
    params: options,
    responseType: 'blob',
  });
  return response.data;
};

// ============================================
// REPORTS (Legacy endpoints)
// ============================================

export const getDailyRevenue = async (date?: string) => {
  const response = await apiClientV2.get('/reports/revenue/daily', { params: { date } });
  return unwrap(response);
};

export const getWeeklyRevenue = async (week?: number, year?: number) => {
  const response = await apiClientV2.get('/reports/revenue/weekly', { params: { week, year } });
  return unwrap(response);
};

export const getMonthlyRevenue = async (month?: number, year?: number) => {
  const response = await apiClientV2.get('/reports/revenue/monthly', { params: { month, year } });
  return unwrap(response);
};

export const getCustomRevenue = async (start: string, end: string) => {
  const response = await apiClientV2.get('/reports/revenue/custom', { params: { start, end } });
  return unwrap(response);
};

export const getContainerProfitability = async (limit?: number, period?: string) => {
  const response = await apiClientV2.get('/reports/containers/profitability', {
    params: { limit, period },
  });
  return unwrap(response);
};

export const getRevenueTrendsLegacy = async (period?: string, periods?: number) => {
  const response = await apiClientV2.get('/reports/trends', { params: { period, periods } });
  return unwrap(response);
};
