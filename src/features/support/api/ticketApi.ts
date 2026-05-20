/**
 * Ticket API Wrapper (Local)
 * Thin wrapper around /api/v2/tickets to avoid cross-feature imports
 * from features/customer/support into features/support
 */

import { apiClientV2 } from '@src/api/client';

const BASE_URL = '/tickets';

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export interface TicketPreview {
  _id: string;
  ticketNumber: string;
  subject: string;
  status: string;
  priority: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  messageCount?: number;
}

export interface GetTicketsPreviewResponse {
  tickets: TicketPreview[];
  total: number;
}

export const getMyTicketsPreview = async (limit = 3): Promise<TicketPreview[]> => {
  const response = await apiClientV2.get(BASE_URL, { params: { limit, page: 1 } });
  const data = unwrap<GetTicketsPreviewResponse>(response);
  return data.tickets.slice(0, limit);
};

export interface CreateTicketRequest {
  type: 'ORDER_ISSUE' | 'PAYMENT_ISSUE' | 'DELIVERY_ISSUE' | 'GENERAL';
  subject: string;
  description: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface CreateTicketResponse {
  ticket: TicketPreview;
}

export const createTicket = async (payload: CreateTicketRequest): Promise<CreateTicketResponse> => {
  const response = await apiClientV2.post(BASE_URL, payload);
  return unwrap(response);
};
