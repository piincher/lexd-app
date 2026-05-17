/**
 * Dashboard Analytics Types
 */

export interface KPIData {
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

export interface RevenueSummary {
  today: number;
  todayFCFA: number;
  thisWeek: number;
  thisWeekFCFA: number;
  thisMonth: number;
  thisMonthFCFA: number;
  last30Days: number;
  last30DaysFCFA: number;
}

export interface TransactionSummary {
  today: number;
  thisWeek: number;
  thisMonth: number;
  last30Days: number;
}

export interface OutstandingSummary {
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

export interface TopCustomer {
  userId: string;
  name: string;
  totalRevenue: number;
  totalRevenueFCFA: number;
}

export interface DashboardData {
  kpis: KPIData;
  revenue: RevenueSummary;
  transactions: TransactionSummary;
  topCustomers: TopCustomer[];
  recentPayments: RecentPayment[];
  outstanding: OutstandingSummary;
  generatedAt: string;
}
