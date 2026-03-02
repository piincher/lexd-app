/**
 * Payment API Types
 * API-specific type definitions for payment endpoints
 */

import {
  Payment,
  UnpaidGoods,
  PaymentIntent,
  PaymentStatus,
} from '../types';

// ============================================
// GENERIC API RESPONSE
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

// ============================================
// BALANCE DUE ENDPOINT
// ============================================

export interface GetBalanceDueResponse {
  totalBalanceDue: number;
  currency: string;
  unpaidGoods: UnpaidGoods[];
}

// ============================================
// INITIATE PAYMENT ENDPOINT
// ============================================

export interface InitiatePaymentRequest {
  goodsIds: string[];
  paymentMethod: 'ORANGE_MONEY' | 'WAVE' | 'CARD';
  phoneNumber?: string;
}

export interface InitiatePaymentResponse {
  payment: PaymentIntent;
}

// ============================================
// VERIFY PAYMENT ENDPOINT
// ============================================

export interface VerifyPaymentResponse {
  payment: Payment;
  status: PaymentStatus;
}

// ============================================
// PAYMENT HISTORY ENDPOINT
// ============================================

export interface GetPaymentHistoryParams {
  status?: PaymentStatus;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export interface GetPaymentHistoryResponse {
  payments: Payment[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ============================================
// RECEIPT ENDPOINT
// ============================================

export interface DownloadReceiptResponse {
  receiptUrl: string;
  expiresAt: string;
}
