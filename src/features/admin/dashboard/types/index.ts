/**
 * Admin Dashboard Types
 * TypeScript type definitions for admin dashboard features
 */

// Outstanding Payments Types
export interface OutstandingClient {
  clientId: string;
  clientName: string;
  phoneNumber: string;
  totalOwed: number;
  goodsCount: number;
}

export interface PaymentCounts {
  UNPAID: number;
  PARTIAL: number;
  PAID: number;
}

export interface AgingBuckets {
  '0-30': number;
  '31-60': number;
  '60+': number;
}

export interface OutstandingPaymentsData {
  totalOutstanding: number;
  counts: PaymentCounts;
  topClients: OutstandingClient[];
  aging: AgingBuckets;
}

// Unassigned Goods Types
export interface UnassignedGoodsItem {
  goodsId: string;
  description: string;
  clientName: string;
  receivedAt: string;
  daysWaiting: number;
}

export interface UnassignedGoodsByShippingMode {
  AIR: number;
  SEA: number;
}

export interface UnassignedGoodsByAge {
  '0-3': number;
  '4-7': number;
  '8+': number;
}

export interface UnassignedGoodsData {
  total: number;
  byShippingMode: UnassignedGoodsByShippingMode;
  byAge: UnassignedGoodsByAge;
  oldestGoods: UnassignedGoodsItem[];
}

// Outstanding Payments List Types
export interface OutstandingPaymentItem {
  _id: string;
  goodsId: string;
  description: string;
  clientId: string;
  clientName: string;
  phoneNumber: string;
  totalCost: number;
  amountPaid: number;
  balanceDue: number;
  paymentStatus: 'UNPAID' | 'PARTIAL';
  shippingMode: string;
  createdAt: string;
  receivedAt: string;
}

export interface OutstandingPaymentsListData {
  items: OutstandingPaymentItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Unified admin work queue
export type WorkQueueKind = 'owner' | 'intake' | 'assignment' | 'payment';
export type WorkQueueSeverity = 'critical' | 'warning' | 'info';
export type WorkQueueFilter = 'all' | 'critical' | 'goods' | 'payment';

export interface AdminWorkQueueItem {
  id: string;
  goodsId: string;
  kind: WorkQueueKind;
  severity: WorkQueueSeverity;
  title: string;
  description: string;
  clientName?: string;
  ageDays: number;
  amountDue?: number;
}

export interface WorkQueueSourceData<T> {
  items: T[];
  total: number;
  truncated: boolean;
}
