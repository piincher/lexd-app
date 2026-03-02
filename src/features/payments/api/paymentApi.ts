import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const API_BASE_URL = `${API_URL}/api/v2/payments`;

/**
 * Get auth headers for API requests
 */
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    Authorization: token ? `Bearer ${token}` : '',
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
  const headers = await getAuthHeaders();
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
  const headers = await getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/initialize`, data, { headers });
  return response.data.data;
};

/**
 * Verify payment status
 */
export const verifyPayment = async (
  data: VerifyPaymentRequest
): Promise<VerifyPaymentResponse> => {
  const headers = await getAuthHeaders();
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
  const headers = await getAuthHeaders();
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
  const headers = await getAuthHeaders();
  const response = await axios.get(`${API_BASE_URL}/${paymentId}`, { headers });
  return response.data.data;
};

/**
 * Top up balance
 */
export const topUpBalance = async (
  data: TopUpRequest
): Promise<InitializePaymentResponse> => {
  const headers = await getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/topup`, data, { headers });
  return response.data.data;
};

/**
 * Cancel payment
 */
export const cancelPayment = async (paymentId: string): Promise<any> => {
  const headers = await getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/cancel/${paymentId}`, {}, { headers });
  return response.data.data;
};

/**
 * Get balance due
 */
export const getBalanceDue = async (): Promise<BalanceDueResponse> => {
  const headers = await getAuthHeaders();
  const response = await axios.get(`${API_BASE_URL}/balance-due`, { headers });
  return response.data.data;
};

/**
 * Calculate balance for specific goods
 */
export const calculateBalanceForGoods = async (goodsIds: string[]): Promise<BalanceDueResponse> => {
  const headers = await getAuthHeaders();
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
  const headers = await getAuthHeaders();
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
  const headers = await getAuthHeaders();
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
  const headers = await getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/initiate`, data, { headers });
  return response.data.data;
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
};
