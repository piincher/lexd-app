/**
 * Revenue Trends Analytics Types
 */

export interface RevenueTrendPoint {
  period: string;
  revenue: number;
  revenueFCFA: number;
  transactionCount: number;
  avgTransaction: number;
  avgTransactionFCFA: number;
}

export interface GrowthComparison {
  revenueGrowth: number;
  periodComparison: Array<{
    period: string;
    currentRevenue: number;
    previousRevenue: number;
    growth: number;
  }>;
}

export interface RevenueTrendsData {
  period: {
    startDate: string;
    endDate: string;
    groupBy: 'day' | 'week' | 'month';
  };
  current: RevenueTrendPoint[];
  comparison?: RevenueTrendPoint[];
  growth?: GrowthComparison;
  summary: {
    totalRevenue: number;
    totalTransactions: number;
    avgRevenue: number;
  };
}
