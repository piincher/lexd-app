export type AdminTicketType = 'ORDER_ISSUE' | 'PAYMENT_ISSUE' | 'DELIVERY_ISSUE' | 'GENERAL';
export type AdminTicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type AdminTicketStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING_CUSTOMER' | 'RESOLVED' | 'CLOSED';
export type AdminTicketMessageSender = 'CUSTOMER' | 'ADMIN';

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

export const ADMIN_TICKET_STATUS_LABELS: Record<AdminTicketStatus, string> = {
  OPEN: 'Ouvert',
  IN_PROGRESS: 'En cours',
  WAITING_CUSTOMER: 'Attente client',
  RESOLVED: 'Résolu',
  CLOSED: 'Fermé',
};

export const ADMIN_TICKET_STATUS_COLORS: Record<AdminTicketStatus, string> = {
  OPEN: '#D97706',
  IN_PROGRESS: '#2563EB',
  WAITING_CUSTOMER: '#7C3AED',
  RESOLVED: '#059669',
  CLOSED: '#475569',
};

export const ADMIN_TICKET_PRIORITY_LABELS: Record<AdminTicketPriority, string> = {
  LOW: 'Basse',
  MEDIUM: 'Moyenne',
  HIGH: 'Haute',
  URGENT: 'Urgente',
};

export const ADMIN_TICKET_TYPE_LABELS: Record<AdminTicketType, string> = {
  ORDER_ISSUE: 'Commande',
  PAYMENT_ISSUE: 'Paiement',
  DELIVERY_ISSUE: 'Livraison',
  GENERAL: 'Général',
};

export const ADMIN_TICKET_STATUSES: AdminTicketStatus[] = [
  'OPEN',
  'IN_PROGRESS',
  'WAITING_CUSTOMER',
  'RESOLVED',
  'CLOSED',
];
