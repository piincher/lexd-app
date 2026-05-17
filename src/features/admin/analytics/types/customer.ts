/**
 * Customer Analytics Types
 */

export interface GoodsStats {
  totalGoods: number;
  totalCBM: number;
  deliveredGoods: number;
}

export interface PaymentMethodStat {
  count: number;
  total: number;
  totalFCFA: number;
}

export interface CustomerRetention {
  isReturning: boolean;
  previousPayments: number;
}

export interface CustomerActivity {
  firstPayment: string;
  lastPayment: string;
}

export interface CustomerAnalyticsItem {
  userId: string;
  name: string;
  phoneNumber?: string;
  totalRevenue: number;
  totalRevenueFCFA: number;
  transactionCount: number;
  avgTransaction: number;
  avgTransactionFCFA: number;
  goodsStats: GoodsStats;
  paymentMethods: Record<string, PaymentMethodStat>;
  retention: CustomerRetention;
  activity: CustomerActivity;
}

export interface CustomerAnalyticsData {
  customers: CustomerAnalyticsItem[];
  period: string;
  summary: {
    totalCustomers: number;
    totalRevenue: number;
    totalRevenueFCFA: number;
    returningCustomers: number;
  };
}
