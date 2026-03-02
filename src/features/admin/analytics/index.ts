/**
 * Analytics Feature Index
 * Main export file for the analytics feature
 */

// Components
export {
  KPICards,
  RevenueChart,
  ContainerUtilizationChart,
  TopCustomersChart,
  GoodsVolumeChart,
  PaymentMetrics,
} from './components';

// Hooks
export {
  useGetDashboard,
  useGetRealtimeMetrics,
  useGetRevenueTrends,
  useGetContainerUtilization,
  useGetTopCustomers,
  useGetGoodsVolume,
  useGetPaymentMetrics,
  useExportAnalytics,
  useAnalyticsInvalidation,
  useFormatCurrency,
  useFormatNumber,
  useFormatPercentage,
  useTrendIndicator,
  analyticsQueryKeys,
} from './hooks';

// Screens
export {
  AnalyticsDashboardScreen,
  RevenueReportScreen,
  CustomerAnalyticsScreen,
} from './screens';

// API
export * from './api';

// Types
export * from './types';
