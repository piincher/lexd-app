/**
 * Financial Reports Types
 * Type definitions for financial analytics and reporting
 */

// ============================================
// PERIOD TYPES
// ============================================

export type ReportPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'CUSTOM';

export interface DateRange {
  startDate: string;
  endDate: string;
}

// ============================================
// REVENUE REPORT
// ============================================

export interface RevenueSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
}

export interface RevenueBreakdown {
  goodsRevenue: number;
  shippingRevenue: number;
  customsRevenue: number;
  storageRevenue: number;
}

export interface DailyTrendPoint {
  date: string;
  revenue: number;
  expenses: number;
}

export interface TopContainerReport {
  containerId: string;
  containerNumber: string;
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
}

export interface TopCustomerReport {
  userId: string;
  name: string;
  totalRevenue: number;
}

export interface RevenueReport {
  period: string;
  type: ReportPeriod;
  dateRange: DateRange;
  summary: RevenueSummary;
  breakdown: RevenueBreakdown;
  dailyTrend: DailyTrendPoint[];
  topContainers: TopContainerReport[];
  topCustomers: TopCustomerReport[];
  paymentMethodBreakdown: PaymentMethodBreakdown;
}

export interface PaymentMethodBreakdown {
  balance: number;
  card: number;
  mobileMoney: number;
  cash: number;
}

// ============================================
// DASHBOARD SUMMARY
// ============================================

export interface RecentPayment {
  paymentId: string;
  amount: number;
  customerName: string;
  paidAt: string;
}

export interface DashboardSummary {
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  yearRevenue: number;
  outstandingReceivables: number;
  overdueInvoices: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  recentPayments: RecentPayment[];
  trendIndicators: TrendIndicators;
  topCustomers: TopCustomerReport[];
}

export interface TrendIndicators {
  todayVsYesterday: number;
  weekVsLastWeek: number;
  monthVsLastMonth: number;
}

// ============================================
// CONTAINER PROFITABILITY
// ============================================

export interface ContainerExpense {
  type: 'shipping' | 'handling' | 'customs' | 'storage' | 'insurance' | 'other';
  amount: number;
  description?: string;
}

export interface ContainerRevenue {
  source: 'goods' | 'shipping' | 'customs' | 'storage';
  amount: number;
  count: number;
}

export interface ContainerProfitability {
  containerId: string;
  containerNumber: string;
  shippingLine: string;
  status: string;
  revenue: {
    total: number;
    sources: ContainerRevenue[];
  };
  expenses: {
    total: number;
    breakdown: ContainerExpense[];
  };
  profit: number;
  profitMargin: number;
  goodsCount: number;
  comparison: ContainerComparison;
}

export interface ContainerComparison {
  rank: number;
  totalContainers: number;
  percentile: number;
  averageProfit: number;
}

// ============================================
// CUSTOMER ANALYTICS
// ============================================

export interface CustomerInvoice {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  issuedAt: string;
  paidAt?: string;
}

export interface CustomerPayment {
  paymentId: string;
  amount: number;
  method: string;
  paidAt: string;
}

export interface MonthlySpending {
  month: string;
  amount: number;
}

export interface CustomerAnalytics {
  userId: string;
  name: string;
  email?: string;
  phone?: string;
  totalRevenue: number;
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
  outstandingBalance: number;
  invoiceHistory: CustomerInvoice[];
  paymentHistory: CustomerPayment[];
  spendingTrend: MonthlySpending[];
  averageOrderValue: number;
  firstOrderDate: string;
  lastOrderDate: string;
}

// ============================================
// API REQUEST/RESPONSE TYPES
// ============================================

export interface GetRevenueReportParams {
  period: ReportPeriod;
  startDate?: string;
  endDate?: string;
}

export interface ExportReportParams {
  period: ReportPeriod;
  format: 'pdf' | 'csv' | 'excel';
  startDate?: string;
  endDate?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

// ============================================
// CHART DATA TYPES
// ============================================

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[];
}

export interface PieChartData {
  labels: string[];
  data: number[];
  colors: string[];
}
