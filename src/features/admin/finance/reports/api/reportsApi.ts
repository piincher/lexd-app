/**
 * Financial Reports API
 * API endpoints for financial analytics and reporting
 */

import { apiClientV2 } from '@src/api/client';
import { AxiosResponse } from 'axios';
import {
  ApiResponse,
  DashboardSummary,
  RevenueReport,
  ContainerProfitability,
  CustomerAnalytics,
  GetRevenueReportParams,
  ExportReportParams,
  ReportPeriod,
} from './types';

const axios = apiClientV2;
const BASE_URL = '/reports';

/**
 * Financial Reports API client
 */
export const reportsApi = {
  // ============================================
  // DASHBOARD ENDPOINTS
  // ============================================

  /**
   * Get dashboard summary with key financial metrics
   */
  getDashboardSummary: (): Promise<AxiosResponse<ApiResponse<DashboardSummary>>> =>
    axios.get(`${BASE_URL}/revenue/dashboard`),

  // ============================================
  // REVENUE REPORT ENDPOINTS
  // ============================================

  /**
   * Get revenue report for a specific period
   */
  getRevenueReport: (
    period: ReportPeriod,
    params?: { startDate?: string; endDate?: string }
  ): Promise<AxiosResponse<ApiResponse<RevenueReport>>> =>
    axios.get(`${BASE_URL}/revenue/${period.toLowerCase()}`, { params }),

  /**
   * Get revenue report for a custom date range
   */
  getCustomRevenueReport: (
    startDate: string,
    endDate: string
  ): Promise<AxiosResponse<ApiResponse<RevenueReport>>> =>
    axios.get(`${BASE_URL}/revenue/custom`, { params: { startDate, endDate } }),

  // ============================================
  // CONTAINER PROFITABILITY ENDPOINTS
  // ============================================

  /**
   * Get profitability report for a specific container
   */
  getContainerProfitability: (
    containerId: string
  ): Promise<AxiosResponse<ApiResponse<ContainerProfitability>>> =>
    axios.get(`${BASE_URL}/containers/${containerId}/profitability`),

  /**
   * Get profitability for all containers
   */
  getAllContainersProfitability: (limit?: number, period?: string): Promise<
    AxiosResponse<ApiResponse<{ containers: ContainerProfitability[]; period: string; totalCount: number }>>
  > => axios.get(`${BASE_URL}/containers/profitability`, { params: { limit, period } }),

  // ============================================
  // CUSTOMER ANALYTICS ENDPOINTS
  // ============================================

  /**
   * Get analytics for a specific customer
   */
  getCustomerAnalytics: (
    customerId: string
  ): Promise<AxiosResponse<ApiResponse<CustomerAnalytics>>> =>
    axios.get(`${BASE_URL}/customers/${customerId}/analytics`),

  /**
   * Get top customers by revenue
   */
  getTopCustomers: (limit?: number, period?: string): Promise<
    AxiosResponse<ApiResponse<{ customers: CustomerAnalytics[]; period: string; totalCount: number }>>
  > => axios.get(`${BASE_URL}/customers/top`, { params: { limit, period } }),

  // ============================================
  // EXPORT ENDPOINTS
  // ============================================

  /**
   * Export financial report
   */
  exportReport: (params: ExportReportParams): Promise<AxiosResponse<Blob>> =>
    axios.get(`${BASE_URL}/export`, {
      params,
      responseType: 'blob',
    }),

  /**
   * Download report as PDF
   */
  downloadPdf: (
    period: ReportPeriod,
    startDate?: string,
    endDate?: string
  ): Promise<AxiosResponse<Blob>> =>
    axios.get(`${BASE_URL}/export/pdf`, {
      params: { period: period.toLowerCase(), startDate, endDate },
      responseType: 'blob',
    }),
};

export default reportsApi;
