/**
 * Dashboard API Service
 * Handles admin dashboard-related API calls
 */

import { apiClientV2 } from '@src/api/client';
import type { OutstandingPaymentsData, OutstandingPaymentsListData, UnassignedGoodsData } from '../types';

/**
 * Get outstanding payments summary
 * Returns aggregated data about unpaid/partial payments with aging and top clients
 */
export const getOutstandingPayments = async (): Promise<OutstandingPaymentsData> => {
  const response = await apiClientV2.get('/payments/outstanding');
  return response.data.data; // Backend returns { success, data, message, error }
};

/**
 * Get outstanding payments list (paginated)
 * Returns detailed list of all goods/orders with outstanding balance
 */
export const getOutstandingPaymentsList = async (
  page = 1,
  limit = 20,
  status?: string,
  search?: string
): Promise<OutstandingPaymentsListData> => {
  const response = await apiClientV2.get('/payments/outstanding/list', {
    params: { page, limit, status, search },
  });
  return response.data.data;
};

/**
 * Get unassigned goods alert data
 * Returns aggregated data about goods not yet assigned to containers
 */
export const getUnassignedGoods = async (): Promise<UnassignedGoodsData> => {
  const response = await apiClientV2.get('/goods/unassigned/alert');
  return response.data.data; // Backend returns { success, data, message, error }
};
