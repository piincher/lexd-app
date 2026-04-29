/**
 * Support Ticket Entity Model
 * Core domain types for the Support Ticket entity
 */

// ============================================
// CUSTOMER TICKET TYPES
// ============================================

export type TicketType =
  | "ORDER_ISSUE"
  | "PAYMENT_ISSUE"
  | "DELIVERY_ISSUE"
  | "GENERAL";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "WAITING_CUSTOMER"
  | "RESOLVED"
  | "CLOSED";

export type MessageSender = "CUSTOMER" | "ADMIN";

export interface TicketMessage {
  _id: string;
  sender: MessageSender;
  message: string;
  createdAt: string;
}

export interface Ticket {
  _id: string;
  ticketNumber: string;
  type: TicketType;
  priority: TicketPriority;
  status: TicketStatus;
  subject: string;
  description: string;
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
  rating?: number;
  relatedGoodsId?: string;
  relatedOrderId?: string;
  attachments?: string[];
}

export interface CreateTicketInput {
  type: TicketType;
  subject: string;
  description: string;
  relatedGoodsId?: string;
  relatedOrderId?: string;
  attachments?: string[];
}

export interface AddMessageInput {
  message: string;
}

export interface RateTicketInput {
  rating: number;
}

export interface TicketFilters {
  status?: TicketStatus[];
  type?: TicketType[];
  priority?: TicketPriority[];
  search?: string;
  page?: number;
  limit?: number;
}

// ============================================
// ADMIN TICKET TYPES
// ============================================

export type AdminTicketType =
  | "ORDER_ISSUE"
  | "PAYMENT_ISSUE"
  | "DELIVERY_ISSUE"
  | "GENERAL";

export type AdminTicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type AdminTicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "WAITING_CUSTOMER"
  | "RESOLVED"
  | "CLOSED";

export type AdminTicketMessageSender = "CUSTOMER" | "ADMIN";

export interface AdminTicketUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

export interface AdminTicketMessage {
  _id: string;
  sender: AdminTicketMessageSender;
  senderId?: AdminTicketUser | string;
  message: string;
  attachments?: string[];
  createdAt: string;
}

export interface AdminTicket {
  _id: string;
  ticketNumber: string;
  userId: AdminTicketUser | string;
  type: AdminTicketType;
  priority: AdminTicketPriority;
  status: AdminTicketStatus;
  subject: string;
  description: string;
  messages: AdminTicketMessage[];
  assignedTo?: AdminTicketUser | string | null;
  createdAt: string;
  updatedAt: string;
  rating?: number | null;
  feedback?: string | null;
  attachments?: string[];
}

export interface AdminTicketFilters {
  status?: AdminTicketStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AdminTicketPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface AdminTicketStatistics {
  byStatus: Partial<Record<AdminTicketStatus, number>>;
  byPriority: Partial<Record<AdminTicketPriority, number>>;
  total: number;
  open: number;
  resolved: number;
}

export interface AdminTicketsResponse {
  tickets: AdminTicket[];
  statistics: AdminTicketStatistics;
  pagination: AdminTicketPagination;
}
