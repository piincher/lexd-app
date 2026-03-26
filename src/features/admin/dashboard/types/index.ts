/**
 * Admin Dashboard Types
 * TypeScript type definitions for admin dashboard features
 */

// Outstanding Payments Types
export interface OutstandingClient {
  clientId: string;
  clientName: string;
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
