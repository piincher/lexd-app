import { apiClientV2 as apiClient } from '@src/api/client';
import { ApiResponse } from '@src/api/types';
import {
  Invoice,
  CreateInvoiceInput,
  UpdateInvoiceInput,
  MarkPaidInput,
  InvoiceFilters,
  InvoicesListResponse,
  InvoiceStats,
} from './types';

const BASE_URL = '/admin/invoices';

export const invoiceApi = {
  getInvoices: async (filters: InvoiceFilters = {}): Promise<InvoicesListResponse> => {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.type) params.append('type', filters.type);
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.search) params.append('search', filters.search);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));

    const response = await apiClient.get<ApiResponse<InvoicesListResponse>>(
      `${BASE_URL}?${params.toString()}`
    );
    return response.data.data;
  },

  getInvoice: async (id: string): Promise<Invoice> => {
    const response = await apiClient.get<ApiResponse<Invoice>>(`${BASE_URL}/${id}`);
    return response.data.data;
  },

  createInvoice: async (data: CreateInvoiceInput): Promise<Invoice> => {
    const response = await apiClient.post<ApiResponse<Invoice>>(BASE_URL, data);
    return response.data.data;
  },

  updateInvoice: async (id: string, data: UpdateInvoiceInput): Promise<Invoice> => {
    const response = await apiClient.put<ApiResponse<Invoice>>(`${BASE_URL}/${id}`, data);
    return response.data.data;
  },

  deleteInvoice: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },

  sendInvoice: async (id: string): Promise<Invoice> => {
    const response = await apiClient.post<ApiResponse<Invoice>>(`${BASE_URL}/${id}/send`);
    return response.data.data;
  },

  cancelInvoice: async (id: string, reason?: string): Promise<Invoice> => {
    const response = await apiClient.post<ApiResponse<Invoice>>(`${BASE_URL}/${id}/cancel`, { reason });
    return response.data.data;
  },

  markPaid: async (id: string, data: MarkPaidInput): Promise<Invoice> => {
    const response = await apiClient.post<ApiResponse<Invoice>>(`${BASE_URL}/${id}/pay`, data);
    return response.data.data;
  },

  getInvoiceStats: async (): Promise<InvoiceStats> => {
    const response = await apiClient.get<ApiResponse<InvoiceStats>>(`${BASE_URL}/stats`);
    return response.data.data;
  },

  downloadInvoicePdf: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(`${BASE_URL}/${id}/pdf`, {
      responseType: 'blob',
    });
    return response.data;
  },

  previewInvoice: async (data: CreateInvoiceInput): Promise<Invoice> => {
    const response = await apiClient.post<ApiResponse<Invoice>>(`${BASE_URL}/preview`, data);
    return response.data.data;
  },
};
