import { apiClientV2 } from '@src/api/client';
import type {
  AdminTicket,
  AdminTicketFilters,
  AdminTicketsResponse,
  AdminTicketStatus,
} from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string | null;
}

const BASE_URL = '/tickets/admin';

const buildListParams = (filters?: AdminTicketFilters) => {
  const params: Record<string, string | number> = {};

  if (filters?.status) params.status = filters.status;
  if (filters?.search?.trim()) params.search = filters.search.trim();
  if (filters?.userId) params.userId = filters.userId;
  if (filters?.page) params.page = filters.page;
  if (filters?.limit) params.limit = filters.limit;

  return Object.keys(params).length ? params : undefined;
};

export const adminTicketApi = {
  getTickets: (filters?: AdminTicketFilters) =>
    apiClientV2.get<ApiResponse<AdminTicketsResponse>>(`${BASE_URL}/all`, {
      params: buildListParams(filters),
    }),

  getTicketById: (id: string) =>
    apiClientV2.get<ApiResponse<{ ticket: AdminTicket }>>(`${BASE_URL}/${id}`),

  replyToTicket: (id: string, message: string) =>
    apiClientV2.post<ApiResponse<{ ticket: AdminTicket }>>(`${BASE_URL}/${id}/messages`, {
      message,
    }),

  updateStatus: (id: string, status: AdminTicketStatus, note?: string) =>
    apiClientV2.put<ApiResponse<{ ticket: AdminTicket }>>(`${BASE_URL}/${id}/status`, {
      status,
      note,
    }),
};

export default adminTicketApi;
