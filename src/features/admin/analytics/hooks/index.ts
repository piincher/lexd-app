/**
 * Analytics Hooks Index
 * Export all analytics hooks
 */

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
  // Legacy hooks
  useGetDailyRevenueTrend,
  useGetAllContainersProfitability,
  useGetRevenueTrendsLegacy,
} from './useAnalytics';

export { analyticsQueryKeys } from './useAnalytics';
