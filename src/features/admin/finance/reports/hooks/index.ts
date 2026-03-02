/**
 * Financial Reports Hooks
 * Export all financial report hooks
 */

export {
  // Query hooks
  useGetDashboardSummary,
  useGetDailyRevenueTrend,
  useGetRevenueReport,
  useGetCustomRevenueReport,
  useGetContainerProfitability,
  useGetAllContainersProfitability,
  useGetCustomerAnalytics,
  useGetTopCustomers,
  
  // Mutation hooks
  useExportReport,
  useDownloadPdf,
  
  // Utility hooks
  useReportsInvalidation,
  useFormatCurrency,
  useFormatPercentage,
  useFormatNumber,
  useTrendIndicator,
  
  // Query keys
  reportsQueryKeys,
} from './useReports';
