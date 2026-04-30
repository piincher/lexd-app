/**
 * Stats API
 * SRP: API calls for admin analytics (v2 endpoints only)
 */

import { apiClientV2 } from '@src/api/client';
import {
  DashboardResponse,
  TopCustomersResponse,
  ContainerUtilizationResponse,
  PaymentMetricsResponse,
  GoodsVolumeResponse,
  OperationsAnalyticsResponse,
  PeriodFilter,
} from '../types';

// All v2 responses are wrapped: { success: true, data: { ... } }
const extractData = <T>(response: { data?: unknown }): T => {
  const payload = response.data;
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: T }).data;
  }
  return (payload ?? response) as T;
};

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await apiClientV2.get('/analytics/dashboard');
  return extractData<DashboardResponse>(response);
};

export const getOperationsAnalytics = async (
  period: PeriodFilter = '30d'
): Promise<OperationsAnalyticsResponse> => {
  const response = await apiClientV2.get('/analytics/operations', {
    params: { period },
  });
  return extractData<OperationsAnalyticsResponse>(response);
};

export const getTopCustomers = async (
  period: PeriodFilter = '30d',
  limit: number = 5
): Promise<TopCustomersResponse> => {
  const response = await apiClientV2.get('/analytics/customers/top', {
    params: { period, limit },
  });
  return extractData<TopCustomersResponse>(response);
};

export const getContainerUtilization = async (
  period: PeriodFilter = '30d'
): Promise<ContainerUtilizationResponse> => {
  const response = await apiClientV2.get('/analytics/containers/utilization', {
    params: { period },
  });
  return extractData<ContainerUtilizationResponse>(response);
};

export const getPaymentMetrics = async (
  period: PeriodFilter = '30d'
): Promise<PaymentMetricsResponse> => {
  const response = await apiClientV2.get('/analytics/payments/metrics', {
    params: { period },
  });
  return extractData<PaymentMetricsResponse>(response);
};

export const getGoodsVolume = async (
  period: PeriodFilter = '30d'
): Promise<GoodsVolumeResponse> => {
  const response = await apiClientV2.get('/analytics/goods/volume', {
    params: { period },
  });
  return extractData<GoodsVolumeResponse>(response);
};

export interface ContainerProfitSummary {
  summary: {
    totalRevenue: number;
    totalCollected: number;
    totalCost: number;
    totalProfit: number;
    totalCBM: number;
    overallMargin: number;
    containerCount: number;
    cbmCostPerUnit: number;
  };
  containers: {
    containerId: string;
    containerNumber: string;
    status: string;
    shippingMode: string;
    totalCBM: number;
    revenue: number;
    collected: number;
    cost: number;
    profit: number;
    profitMargin: number;
    goodsCount: number;
  }[];
}

export const getContainerProfitSummary = async (): Promise<ContainerProfitSummary> => {
  const response = await apiClientV2.get('/containers/profit-summary');
  return extractData<ContainerProfitSummary>(response);
};
