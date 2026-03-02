/**
 * Financial Reports Feature
 * Phase 5: Financial Reports Dashboard
 * 
 * This module provides comprehensive financial analytics and reporting
 * capabilities for the admin dashboard.
 */

// API
export { reportsApi } from './api';
export type {
  RevenueReport,
  DashboardSummary,
  ContainerProfitability,
  CustomerAnalytics,
  ReportPeriod,
  DateRange,
  RevenueSummary,
  RevenueBreakdown,
  DailyTrendPoint,
  TopContainerReport,
  TopCustomerReport,
} from './types';

// Hooks
export {
  useGetDashboardSummary,
  useGetRevenueReport,
  useGetCustomRevenueReport,
  useGetContainerProfitability,
  useGetAllContainersProfitability,
  useGetCustomerAnalytics,
  useGetTopCustomers,
  useExportReport,
  useDownloadPdf,
  useReportsInvalidation,
  useFormatCurrency,
  useFormatPercentage,
  useFormatNumber,
  useTrendIndicator,
  reportsQueryKeys,
} from './hooks';

// Screens
export {
  FinancialDashboardScreen,
  RevenueReportScreen,
  ContainerProfitScreen,
  CustomerAnalyticsScreen,
} from './screens';

// Components
export {
  RevenueChart,
  PieChart,
  ProfitMarginCard,
  TopCustomersList,
  TopContainersList,
  PeriodSelector,
  SummaryCard,
} from './components';
