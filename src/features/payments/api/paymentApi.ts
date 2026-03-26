import axios from 'axios';
import { useAuth } from '@src/store/Auth';
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

// Use the same API configuration as the main client
const ENV = (process.env.EXPO_PUBLIC_ENV as 'local' | 'staging' | 'production') || 'local';

const API_CONFIG = {
  local: {
    baseURLV2: 'http://192.168.0.112:3000/api/v2',
  },
  staging: {
    baseURLV2: 'https://chinalinkexpressbackend.onrender.com/api/v2',
  },
  production: {
    baseURLV2: 'https://api.myempirebymyma.com/api/v2',
  },
};

const API_BASE_URL = `${API_CONFIG[ENV].baseURLV2}/payments`;

/**
 * Get auth headers for API requests
 * Uses the same approach as the main API client - zustand store
 */
const getAuthHeaders = () => {
  const token = useAuth.getState().token;
  
  // Backend expects raw token without "Bearer " prefix
  return {
    Authorization: token || '',
    'Content-Type': 'application/json',
  };
};

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
  const headers = getAuthHeaders();
  const params = new URLSearchParams();
  if (country) params.append('country', country);
  if (currency) params.append('currency', currency);
  
  const response = await axios.get(`${API_BASE_URL}/providers?${params.toString()}`, {
    headers,
  });
  return response.data.data;
};

/**
 * Initialize a new payment
 */
export const initializePayment = async (
  data: InitializePaymentRequest
): Promise<InitializePaymentResponse> => {
  const headers = getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/initialize`, data, { headers });
  return response.data.data;
};

/**
 * Verify payment status
 */
export const verifyPayment = async (
  data: VerifyPaymentRequest
): Promise<VerifyPaymentResponse> => {
  const headers = getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/verify`, data, { headers });
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
}): Promise<PaymentHistoryResponse> => {
  const headers = getAuthHeaders();
  const queryParams = new URLSearchParams();
  
  if (params?.status) queryParams.append('status', params.status);
  if (params?.provider) queryParams.append('provider', params.provider);
  if (params?.startDate) queryParams.append('startDate', params.startDate);
  if (params?.endDate) queryParams.append('endDate', params.endDate);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  
  const response = await axios.get(`${API_BASE_URL}/history?${queryParams.toString()}`, {
    headers,
  });
  return response.data.data;
};

/**
 * Get payment details
 */
export const getPaymentDetails = async (paymentId: string): Promise<any> => {
  const headers = getAuthHeaders();
  const response = await axios.get(`${API_BASE_URL}/${paymentId}`, { headers });
  return response.data.data;
};

/**
 * Top up balance
 */
export const topUpBalance = async (
  data: TopUpRequest
): Promise<InitializePaymentResponse> => {
  const headers = getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/topup`, data, { headers });
  return response.data.data;
};

/**
 * Cancel payment
 */
export const cancelPayment = async (paymentId: string): Promise<any> => {
  const headers = getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/cancel/${paymentId}`, {}, { headers });
  return response.data.data;
};

/**
 * Get balance due
 */
export const getBalanceDue = async (): Promise<BalanceDueResponse> => {
  const headers = getAuthHeaders();
  const response = await axios.get(`${API_BASE_URL}/balance-due`, { headers });
  return response.data.data;
};

/**
 * Calculate balance for specific goods
 */
export const calculateBalanceForGoods = async (goodsIds: string[]): Promise<BalanceDueResponse> => {
  const headers = getAuthHeaders();
  const response = await axios.post(
    `${API_BASE_URL}/balance-due`,
    { goodsIds },
    { headers }
  );
  return response.data.data;
};

/**
 * Refund payment (admin only)
 */
export const refundPayment = async (data: RefundRequest): Promise<any> => {
  const headers = getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/refund`, data, { headers });
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
  const headers = getAuthHeaders();
  const queryParams = new URLSearchParams();
  if (options?.maxAttempts) queryParams.append('maxAttempts', options.maxAttempts.toString());
  if (options?.intervalMs) queryParams.append('intervalMs', options.intervalMs.toString());
  
  const response = await axios.post(
    `${API_BASE_URL}/poll?${queryParams.toString()}`,
    { provider, transactionId },
    { headers }
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
  const headers = getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/initiate`, data, { headers });
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
  const headers = getAuthHeaders();
  const queryParams = new URLSearchParams();
  
  if (filters?.page) queryParams.append('page', filters.page.toString());
  if (filters?.limit) queryParams.append('limit', filters.limit.toString());
  if (filters?.startDate) queryParams.append('startDate', filters.startDate);
  if (filters?.endDate) queryParams.append('endDate', filters.endDate);
  if (filters?.paymentMethod) queryParams.append('paymentMethod', filters.paymentMethod);
  
  const response = await axios.get(`${API_BASE_URL}/my-history?${queryParams.toString()}`, {
    headers,
  });
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
  const headers = getAuthHeaders();
  const response = await axios.post(
    `${API_BASE_URL}/${paymentId}/receipt/generate`,
    {},
    { headers }
  );
  return response.data;
};

/**
 * Download receipt PDF as blob
 */
export const downloadReceipt = async (paymentId: string): Promise<Blob> => {
  const headers = getAuthHeaders();
  const response = await axios.get(
    `${API_BASE_URL}/${paymentId}/receipt`,
    { 
      headers,
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
