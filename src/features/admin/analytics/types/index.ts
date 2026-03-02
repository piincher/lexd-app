/**
 * Analytics Types
 * Type definitions for analytics dashboard
 */

// ============================================
// COMMON TYPES
// ============================================

export interface PeriodFilter {
  from?: string;
  to?: string;
  period?: '7d' | '30d' | '90d' | '1y';
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// ============================================
// DASHBOARD TYPES
// ============================================

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

// ============================================
// REVENUE TRENDS
// ============================================

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

// ============================================
// CONTAINER UTILIZATION
// ============================================

export interface ContainerCapacity {
  maxCBM: number;
  maxWeight: number;
  usedCBM: number;
  usedWeight: number;
}

export interface ContainerUtilization {
  cbmPercentage: number;
  weightPercentage: number;
}

export interface ContainerMetrics {
  goodsCount: number;
  revenue: number;
  revenueFCFA: number;
}

export interface ContainerUtilizationItem {
  containerId: string;
  containerNumber: string;
  shippingMode: 'SEA' | 'AIR';
  shippingLine?: string;
  status: string;
  capacity: ContainerCapacity;
  utilization: ContainerUtilization;
  metrics: ContainerMetrics;
  timeline?: {
    bookedAt?: string;
    departedAt?: string;
    arrivedAt?: string;
  };
}

export interface ShippingLineStats {
  containers: number;
  avgFillRate: number;
  totalRevenue: number;
  totalRevenueFCFA: number;
}

export interface ContainerUtilizationData {
  summary: {
    totalContainers: number;
    avgFillRate: number;
    totalRevenue: number;
    totalRevenueFCFA: number;
  };
  byShippingLine: Record<string, ShippingLineStats>;
  containers: ContainerUtilizationItem[];
}

// ============================================
// CUSTOMER ANALYTICS
// ============================================

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

// ============================================
// GOODS VOLUME
// ============================================

export interface VolumeByStatus {
  status: string;
  count: number;
  totalCBM: number;
  totalWeight: number;
  totalValue: number;
  totalValueFCFA: number;
}

export interface VolumeByShippingMode {
  shippingMode: string;
  count: number;
  totalCBM: number;
  totalValue: number;
  totalValueFCFA: number;
}

export interface VolumeByPaymentStatus {
  paymentStatus: string;
  count: number;
  totalValue: number;
  totalValueFCFA: number;
  totalPaid: number;
  totalPaidFCFA: number;
  balanceDue: number;
  balanceDueFCFA: number;
}

export interface DailyVolumePoint {
  date: string;
  count: number;
  totalCBM: number;
  totalValue: number;
  totalValueFCFA: number;
}

export interface GoodsVolumeData {
  period: string;
  summary: {
    totalGoods: number;
    totalCBM: number;
    totalValue: number;
    totalValueFCFA: number;
  };
  byStatus: VolumeByStatus[];
  byShippingMode: VolumeByShippingMode[];
  byPaymentStatus: VolumeByPaymentStatus[];
  dailyTrend: DailyVolumePoint[];
}

// ============================================
// PAYMENT METRICS
// ============================================

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

// ============================================
// REAL-TIME METRICS
// ============================================

export interface RealtimeMetric {
  todayRevenue: number;
  todayRevenueFCFA: number;
  activeContainers: number;
  pendingPayments: number;
  goodsInTransit: number;
  readyForPickup: number;
}

export interface RecentActivity {
  type: 'payment' | 'delivery' | 'arrival';
  amount?: number;
  amountFCFA?: number;
  customer?: string;
  timestamp: string;
}

export interface RealtimeData {
  timestamp: string;
  metrics: RealtimeMetric;
  recentActivity: RecentActivity[];
}

// ============================================
// CHART DATA
// ============================================

export interface ChartDataPoint {
  label: string;
  value: number;
  valueFCFA?: number;
  color?: string;
}

export interface LineChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color: string;
  }>;
}

export interface BarChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color: string;
  }>;
}

export interface PieChartData {
  labels: string[];
  data: number[];
  colors: string[];
}

// ============================================
// EXPORT
// ============================================

export interface ExportOptions {
  type: 'revenue' | 'customers' | 'containers' | 'goods' | 'payments';
  format: 'json' | 'csv' | 'xlsx' | 'pdf';
  from?: string;
  to?: string;
}

// ============================================
// COMPONENT PROPS
// ============================================

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export type DateRangePreset = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';

export interface ChartProps {
  width?: number;
  height?: number;
  showLegend?: boolean;
  showLabels?: boolean;
}
