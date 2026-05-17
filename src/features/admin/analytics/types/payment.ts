/**
 * Payment Metrics Analytics Types
 */

export interface PaymentMethodMetric {
  method: string;
  count: number;
  total: number;
  totalFCFA: number;
  percentage: number;
}

export interface TransactionStatusMetric {
  status: string;
  count: number;
  total: number;
  totalFCFA: number;
}

export interface OutstandingAgingBucket {
  range: string;
  count: number;
  totalValue: number;
  totalValueFCFA: number;
}

export interface DailyPaymentPoint {
  date: string;
  count: number;
  total: number;
  totalFCFA: number;
}

export interface PaymentMetricsData {
  period: string;
  summary: {
    totalTransactions: number;
    completedTransactions: number;
    collectionRate: number;
    totalCollected: number;
    totalCollectedFCFA: number;
    totalOutstanding: number;
    totalOutstandingFCFA: number;
  };
  paymentMethods: PaymentMethodMetric[];
  transactionStatuses: TransactionStatusMetric[];
  outstandingAging: OutstandingAgingBucket[];
  dailyTrend: DailyPaymentPoint[];
}
