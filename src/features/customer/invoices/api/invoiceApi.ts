import { apiClientV2 as apiClient } from '@src/api/client';
import { ApiResponse } from '@src/api/types';
import {
  Invoice,
  InvoiceFilters,
  InvoicesListResponse,
} from './types';

const BASE_URL = '/invoices';

export const invoiceApi = {
  getMyInvoices: async (filters: InvoiceFilters = {}): Promise<InvoicesListResponse> => {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));

    const response = await apiClient.get<ApiResponse<InvoicesListResponse>>(
      `${BASE_URL}/my?${params.toString()}`
    );
    return response.data.data;
  },

  getInvoice: async (id: string): Promise<Invoice> => {
    const response = await apiClient.get<ApiResponse<Invoice>>(`${BASE_URL}/${id}`);
    return response.data.data;
  },

  payInvoice: async (id: string, paymentData: {
    paymentMethod: string;
    paymentReference?: string;
  }): Promise<Invoice> => {
    const response = await apiClient.post<ApiResponse<Invoice>>(
      `${BASE_URL}/${id}/pay`,
      paymentData
    );
    return response.data.data;
  },

  downloadInvoicePdf: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(`${BASE_URL}/${id}/pdf`, {
      responseType: 'blob',
    });
    return response.data;
  },

  shareInvoice: async (id: string): Promise<{ shareUrl: string }> => {
    const response = await apiClient.post<ApiResponse<{ shareUrl: string }>>(
      `${BASE_URL}/${id}/share`
    );
    return response.data.data;
  },
};
