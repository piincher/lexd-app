import { apiClientV2 } from '@src/api/client';
import type {
  InitializePaymentRequest,
  InitializePaymentResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  PaymentHistoryResponse,
  TopUpRequest,
  RefundRequest,
  BalanceDueResponse,
  PaymentProviderInfo,
} from '../types';

const BASE_URL = '/payments';

/**
 * Payment API Service
 * Handles all payment-related API calls
 */

/**
 * Get available payment providers
 */
export const getPaymentProviders = async (
  country?: string,
  currency?: string
): Promise<{ providers: PaymentProviderInfo[] }> => {
  const params = new URLSearchParams();
  if (country) params.append('country', country);
  if (currency) params.append('currency', currency);

  const response = await apiClientV2.get(`${BASE_URL}/providers?${params.toString()}`);
  return response.data.data;
};

/**
 * Initialize a new payment
 */
export const initializePayment = async (
  data: InitializePaymentRequest
): Promise<InitializePaymentResponse> => {
  const response = await apiClientV2.post(`${BASE_URL}/initialize`, data);
  return response.data.data;
};

/**
 * Verify payment status
 */
export const verifyPayment = async (
  data: VerifyPaymentRequest
): Promise<VerifyPaymentResponse> => {
  const response = await apiClientV2.post(`${BASE_URL}/verify`, data);
  return response.data.data;
};

/**
 * Get payment history
 */
export const getPaymentHistory = async (params?: {
  status?: string;
  provider?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  userId?: string;
}): Promise<PaymentHistoryResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.status) queryParams.append('status', params.status);
  if (params?.provider) queryParams.append('provider', params.provider);
  if (params?.startDate) queryParams.append('startDate', params.startDate);
  if (params?.endDate) queryParams.append('endDate', params.endDate);
  if (params?.userId) queryParams.append('userId', params.userId);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const response = await apiClientV2.get(`${BASE_URL}/history?${queryParams.toString()}`);
  return response.data.data;
};

/**
 * Get payment details
 */
export const getPaymentDetails = async (paymentId: string): Promise<any> => {
  const response = await apiClientV2.get(`${BASE_URL}/${paymentId}`);
  return response.data.data;
};

/**
 * Top up balance
 */
export const topUpBalance = async (
  data: TopUpRequest
): Promise<InitializePaymentResponse> => {
  const response = await apiClientV2.post(`${BASE_URL}/topup`, data);
  return response.data.data;
};

/**
 * Cancel payment
 */
export const cancelPayment = async (paymentId: string): Promise<any> => {
  const response = await apiClientV2.post(`${BASE_URL}/cancel/${paymentId}`, {});
  return response.data.data;
};

/**
 * Get balance due
 */
export const getBalanceDue = async (): Promise<BalanceDueResponse> => {
  const response = await apiClientV2.get(`${BASE_URL}/balance-due`);
  return response.data.data;
};

/**
 * Calculate balance for specific goods
 */
export const calculateBalanceForGoods = async (goodsIds: string[]): Promise<BalanceDueResponse> => {
  const response = await apiClientV2.post(
    `${BASE_URL}/balance-due`,
    { goodsIds }
  );
  return response.data.data;
};

/**
 * Refund payment (admin only)
 */
export const refundPayment = async (data: RefundRequest): Promise<any> => {
  const response = await apiClientV2.post(`${BASE_URL}/refund`, data);
  return response.data.data;
};

/**
 * Poll payment status (real-time updates)
 */
export const pollPaymentStatus = async (
  provider: string,
  transactionId: string,
  options?: { maxAttempts?: number; intervalMs?: number }
): Promise<any> => {
  const queryParams = new URLSearchParams();
  if (options?.maxAttempts) queryParams.append('maxAttempts', options.maxAttempts.toString());
  if (options?.intervalMs) queryParams.append('intervalMs', options.intervalMs.toString());

  const response = await apiClientV2.post(
    `${BASE_URL}/poll?${queryParams.toString()}`,
    { provider, transactionId }
  );
  return response.data.data;
};

/**
 * Legacy: Initiate payment (backward compatibility)
 */
export const initiatePayment = async (data: {
  goodsIds: string[];
  paymentMethod: string;
  phoneNumber?: string;
  email?: string;
  idempotencyKey?: string;
}): Promise<any> => {
  const response = await apiClientV2.post(`${BASE_URL}/initiate`, data);
  return response.data.data;
};

/**
 * Get user's payment history (admin-recorded payments)
 */
export const getMyPaymentHistory = async (filters?: {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  paymentMethod?: string;
}): Promise<{
  payments: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}> => {
  const queryParams = new URLSearchParams();

  if (filters?.page) queryParams.append('page', filters.page.toString());
  if (filters?.limit) queryParams.append('limit', filters.limit.toString());
  if (filters?.startDate) queryParams.append('startDate', filters.startDate);
  if (filters?.endDate) queryParams.append('endDate', filters.endDate);
  if (filters?.paymentMethod) queryParams.append('paymentMethod', filters.paymentMethod);

  const response = await apiClientV2.get(`${BASE_URL}/my-history?${queryParams.toString()}`);
  return response.data.data;
};

/**
 * Generate PDF receipt for a payment
 */
export const generateReceipt = async (paymentId: string): Promise<{
  success: boolean;
  data: {
    receiptUrl: string;
    receiptNumber: string;
    generatedAt: string;
  };
  message: string;
}> => {
  const response = await apiClientV2.post(
    `${BASE_URL}/${paymentId}/receipt/generate`,
    {}
  );
  return response.data;
};

/**
 * Download receipt PDF as blob
 */
export const downloadReceipt = async (paymentId: string): Promise<Blob> => {
  const response = await apiClientV2.get(
    `${BASE_URL}/${paymentId}/receipt`,
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

// Default export
export default {
  getPaymentProviders,
  initializePayment,
  verifyPayment,
  getPaymentHistory,
  getPaymentDetails,
  topUpBalance,
  cancelPayment,
  getBalanceDue,
  calculateBalanceForGoods,
  refundPayment,
  pollPaymentStatus,
  initiatePayment,
  getMyPaymentHistory,
  generateReceipt,
  downloadReceipt,
};
