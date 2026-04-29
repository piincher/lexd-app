/**
 * Analytics Sub-Hooks Index
 * Focused hooks for analytics data fetching and utilities
 */

export { analyticsQueryKeys } from './useAnalyticsQueryKeys';

export {
  useGetDashboard,
  useGetRealtimeMetrics,
} from './useAnalyticsDashboardData';

export {
  useGetRevenueTrends,
  useGetDailyRevenueTrend,
  useGetRevenueTrendsLegacy,
} from './useAnalyticsRevenueData';

export {
  useGetContainerUtilization,
  useGetAllContainersProfitability,
} from './useAnalyticsContainerData';

export { useGetTopCustomers } from './useAnalyticsCustomerData';

export { useGetGoodsVolume } from './useAnalyticsGoodsData';

export { useGetPaymentMetrics } from './useAnalyticsPaymentData';

export { useExportAnalytics } from './useAnalyticsExport';

export { useAnalyticsInvalidation } from './useAnalyticsInvalidation';

export {
  useFormatCurrency,
  useFormatNumber,
  useFormatPercentage,
  useTrendIndicator,
} from './useAnalyticsFormatting';
