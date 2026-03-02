/**
 * Support Ticket Types
 * Type definitions for customer support ticket system
 */

export type TicketType = 'ORDER_ISSUE' | 'PAYMENT_ISSUE' | 'DELIVERY_ISSUE' | 'GENERAL';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING_CUSTOMER' | 'RESOLVED' | 'CLOSED';
export type MessageSender = 'CUSTOMER' | 'ADMIN';

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

// Ticket type labels in French
export const TICKET_TYPE_LABELS: Record<TicketType, string> = {
  ORDER_ISSUE: 'Problème de commande',
  PAYMENT_ISSUE: 'Problème de paiement',
  DELIVERY_ISSUE: 'Problème de livraison',
  GENERAL: 'Question générale',
};

// Ticket priority labels in French
export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
  LOW: 'Basse',
  MEDIUM: 'Moyenne',
  HIGH: 'Haute',
  URGENT: 'Urgente',
};

// Ticket status labels in French
export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: 'Ouvert',
  IN_PROGRESS: 'En cours',
  WAITING_CUSTOMER: 'En attente',
  RESOLVED: 'Résolu',
  CLOSED: 'Fermé',
};

// Ticket status colors for badges
export const TICKET_STATUS_COLORS: Record<TicketStatus, string> = {
  OPEN: '#e08700',
  IN_PROGRESS: '#1C8EF4',
  WAITING_CUSTOMER: '#B73FF2',
  RESOLVED: '#27ae60',
  CLOSED: '#415F8B',
};

// Ticket status background colors
export const TICKET_STATUS_BG_COLORS: Record<TicketStatus, string> = {
  OPEN: '#FEF3C7',
  IN_PROGRESS: '#E0F2FE',
  WAITING_CUSTOMER: '#F3E8FF',
  RESOLVED: '#D1FAE5',
  CLOSED: '#F3F4F6',
};

// Ticket type icons
export const TICKET_TYPE_ICONS: Record<TicketType, string> = {
  ORDER_ISSUE: 'clipboard-text',
  PAYMENT_ISSUE: 'credit-card',
  DELIVERY_ISSUE: 'truck-delivery',
  GENERAL: 'help-circle',
};

// Ticket priority colors
export const TICKET_PRIORITY_COLORS: Record<TicketPriority, string> = {
  LOW: '#27ae60',
  MEDIUM: '#e08700',
  HIGH: '#E32929',
  URGENT: '#E40678',
};
