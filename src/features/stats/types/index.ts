/**
 * Stats Feature Types
 * SRP: Type definitions for admin statistics and analytics (v2 API)
 */

// ============================================
// PERIOD / FILTER TYPES
// ============================================

export type PeriodFilter = '7d' | '30d' | '90d' | '1y';

export interface PeriodOption {
  key: PeriodFilter;
  label: string;
}

// ============================================
// V2 ANALYTICS DASHBOARD
// ============================================

export interface DashboardKPIs {
  todayRevenue: number;
  todayRevenueFCFA: number;
  thisWeekRevenue: number;
  thisWeekRevenueFCFA: number;
  thisMonthRevenue: number;
  thisMonthRevenueFCFA: number;
  activeContainers: number;
  pendingPayments: number;
  newCustomersThisMonth: number;
  goodsInTransit: number;
}

export interface OutstandingData {
  total: number;
  totalFCFA: number;
  count: number;
  overdueCount: number;
  overdueAmount: number;
  overdueAmountFCFA: number;
}

export interface RecentPayment {
  paymentId: string;
  amount: number;
  amountFCFA: number;
  customer: {
    id: string;
    name: string;
  };
  paymentMethod: string;
  paidAt: string;
}

export interface DashboardTopCustomer {
  userId: string;
  name: string;
  totalRevenue: number;
}

export interface DashboardResponse {
  kpis: DashboardKPIs;
  revenue: {
    today: number;
    todayFCFA: number;
    thisWeek: number;
    thisWeekFCFA: number;
    thisMonth: number;
    thisMonthFCFA: number;
    last30Days: number;
    last30DaysFCFA: number;
  };
  transactions: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    last30Days: number;
  };
  topCustomers: DashboardTopCustomer[];
  recentPayments: RecentPayment[];
  outstanding: OutstandingData;
  generatedAt: string;
}

// ============================================
// TOP CUSTOMERS
// ============================================

export interface TopCustomer {
  userId: string;
  name: string;
  phoneNumber: string;
  totalRevenue: number;
  totalRevenueFCFA: number;
  transactionCount: number;
  avgTransaction: number;
  avgTransactionFCFA: number;
  goodsStats: {
    totalGoods: number;
    totalCBM: number;
    deliveredGoods: number;
  };
  retention: {
    isReturning: boolean;
    previousPayments: number;
  };
  activity: {
    firstPayment: string;
    lastPayment: string;
  };
}

export interface TopCustomersResponse {
  customers: TopCustomer[];
  period: string;
  summary: {
    totalCustomers: number;
    totalRevenue: number;
    totalRevenueFCFA: number;
    returningCustomers: number;
  };
}

// ============================================
// CONTAINER UTILIZATION
// ============================================

export interface ContainerSummary {
  totalContainers: number;
  avgFillRate: number;
  totalRevenue: number;
  totalRevenueFCFA: number;
}

export interface ContainerUtilizationResponse {
  summary: ContainerSummary;
  byShippingLine: Record<string, {
    containers: number;
    avgFillRate: number;
    totalRevenue: number;
    totalRevenueFCFA: number;
  }>;
  containers: Array<{
    containerId: string;
    containerNumber: string;
    shippingMode: string;
    shippingLine: string;
    status: string;
    capacity: {
      maxCBM: number;
      maxWeight: number;
      usedCBM: number;
      usedWeight: number;
    };
    utilization: {
      cbmPercentage: number;
      weightPercentage: number;
    };
    metrics: {
      goodsCount: number;
      revenue: number;
      revenueFCFA: number;
    };
  }>;
}

// ============================================
// PAYMENT METRICS
// ============================================

export interface PaymentMetricsSummary {
  totalTransactions: number;
  completedTransactions: number;
  collectionRate: number;
  totalCollected: number;
  totalCollectedFCFA: number;
  totalOutstanding: number;
  totalOutstandingFCFA: number;
}

export interface PaymentMethodBreakdown {
  method: string;
  count: number;
  total: number;
  totalFCFA: number;
  percentage: number;
}

export interface PaymentMetricsResponse {
  period: string;
  summary: PaymentMetricsSummary;
  paymentMethods: PaymentMethodBreakdown[];
  transactionStatuses: Array<{
    status: string;
    count: number;
    total: number;
    totalFCFA: number;
  }>;
  outstandingAging: Array<{
    range: string;
    count: number;
    totalValue: number;
    totalValueFCFA: number;
  }>;
  dailyTrend: Array<{
    date: string;
    count: number;
    total: number;
    totalFCFA: number;
  }>;
}

// ============================================
// GOODS VOLUME
// ============================================

export interface GoodsVolumeResponse {
  period: string;
  summary: {
    totalGoods: number;
    totalCBM: number;
    totalValue: number;
    totalValueFCFA: number;
  };
  byStatus: Array<{
    status: string;
    count: number;
    totalCBM: number;
    totalWeight: number;
    totalValue: number;
    totalValueFCFA: number;
  }>;
  byShippingMode: Array<{
    shippingMode: string;
    count: number;
    totalCBM: number;
    totalValue: number;
    totalValueFCFA: number;
  }>;
  byPaymentStatus: Array<{
    paymentStatus: string;
    count: number;
    totalValue: number;
    totalValueFCFA: number;
    totalPaid: number;
    totalPaidFCFA: number;
    balanceDue: number;
    balanceDueFCFA: number;
  }>;
  dailyTrend: Array<{
    date: string;
    count: number;
    totalCBM: number;
    totalValue: number;
    totalValueFCFA: number;
  }>;
}

// ============================================
// UI COMPONENT TYPES
// ============================================

export interface KPIItem {
  label: string;
  value: string;
  subtitle?: string;
  icon: string;
  color: string;
  bgColor: string;
}
