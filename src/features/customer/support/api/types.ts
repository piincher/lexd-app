/**
 * Ticket API Types
 * Request/response types for ticket API
 */

import { Ticket, TicketMessage } from '../types';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface GetTicketsResponse {
  tickets: Ticket[];
  total: number;
}

export interface GetTicketResponse {
  ticket: Ticket;
}

export interface CreateTicketRequest {
  type: string;
  subject: string;
  description: string;
  relatedGoodsId?: string;
  relatedOrderId?: string;
}

export interface CreateTicketResponse {
  ticket: Ticket;
}

export interface AddMessageRequest {
  message: string;
}

export interface AddMessageResponse {
  message: TicketMessage;
}

export interface RateTicketRequest {
  rating: number;
}

export interface RateTicketResponse {
  ticket: Ticket;
}

export interface UploadAttachmentResponse {
  url: string;
}
