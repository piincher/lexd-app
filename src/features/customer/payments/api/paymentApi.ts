/**
 * Payment API
 * API endpoints for customer payment portal
 */

import { apiClientV2 } from '@src/api/client';
import {
  ApiResponse,
  GetBalanceDueResponse,
  InitiatePaymentRequest,
  InitiatePaymentResponse,
  VerifyPaymentResponse,
  GetPaymentHistoryParams,
  GetPaymentHistoryResponse,
  DownloadReceiptResponse,
} from './types';

const axios = apiClientV2;
const BASE_URL = '/payments';

/**
 * Payment API client
 * Customer-facing payment operations
 */
export const paymentApi = {
  /**
   * Get customer's total balance due and unpaid goods
   * @returns Balance due information with list of unpaid goods
   */
  getBalanceDue: () =>
    axios.get<ApiResponse<GetBalanceDueResponse>>(`${BASE_URL}/balance-due`),

  /**
   * Initiate a payment for selected goods
   * @param data Payment initiation data including goods IDs and payment method
   * @returns Payment intent with transaction reference
   */
  initiatePayment: (data: InitiatePaymentRequest) =>
    axios.post<ApiResponse<InitiatePaymentResponse>>(`${BASE_URL}/initiate`, data),

  /**
   * Verify payment status
   * @param paymentId The payment ID to verify
   * @returns Current payment status and details
   */
  verifyPayment: (paymentId: string) =>
    axios.get<ApiResponse<VerifyPaymentResponse>>(`${BASE_URL}/verify/${paymentId}`),

  /**
   * Get customer's payment history
   * @param params Optional filters for pagination and status
   * @returns List of past payments with pagination
   */
  getPaymentHistory: (params?: GetPaymentHistoryParams) =>
    axios.get<ApiResponse<GetPaymentHistoryResponse>>(`${BASE_URL}`, { params }),

  /**
   * Download payment receipt
   * @param paymentId The payment ID
   * @returns Receipt download URL
   */
  downloadReceipt: (paymentId: string) =>
    axios.get<ApiResponse<DownloadReceiptResponse>>(`${BASE_URL}/${paymentId}/receipt`),

  /**
   * Retry a failed payment
   * @param paymentId The failed payment ID
   * @returns Updated payment intent
   */
  retryPayment: (paymentId: string) =>
    axios.post<ApiResponse<InitiatePaymentResponse>>(`${BASE_URL}/${paymentId}/retry`),
};

export default paymentApi;
