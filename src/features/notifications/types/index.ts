/**
 * Notification Types - In-App Notification System
 */

export type NotificationType = 
  | 'ORDER_UPDATE' 
  | 'PAYMENT' 
  | 'CONTAINER_STATUS' 
  | 'TICKET_REPLY' 
  | 'INVOICE' 
  | 'SYSTEM' 
  | 'GENERAL';

export type NotificationCategory = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

export interface InAppNotification {
  _id: string;
  notificationId: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  data?: {
    orderId?: string;
    containerId?: string;
    ticketId?: string;
    invoiceId?: string;
    paymentId?: string;
    [key: string]: any;
  };
  actionUrl?: string;
  actionLabel?: string;
  icon?: string;
  isRead: boolean;
  isDismissed: boolean;
  priority: 'HIGH' | 'NORMAL' | 'LOW';
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationFilters {
  type?: NotificationType;
  category?: NotificationCategory;
  isRead?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  filter?: 'all' | 'unread' | 'system';
}

export interface PaginatedNotifications {
  data: InAppNotification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UnreadCountResponse {
  count: number;
  hasNew: boolean;
}

// Notification type configuration for UI
export const NOTIFICATION_TYPE_CONFIG: Record<NotificationType, { 
  label: string; 
  icon: string; 
  description: string;
}> = {
  ORDER_UPDATE: { 
    label: 'Commande', 
    icon: 'package-variant-closed',
    description: 'Mise à jour de votre commande'
  },
  PAYMENT: { 
    label: 'Paiement', 
    icon: 'credit-card',
    description: 'Statut de paiement mis à jour'
  },
  CONTAINER_STATUS: { 
    label: 'Conteneur', 
    icon: 'truck-delivery',
    description: 'Mise à jour du conteneur'
  },
  TICKET_REPLY: { 
    label: 'Support', 
    icon: 'message-reply',
    description: 'Nouvelle réponse au ticket'
  },
  INVOICE: { 
    label: 'Facture', 
    icon: 'file-document',
    description: 'Nouvelle facture disponible'
  },
  SYSTEM: { 
    label: 'Système', 
    icon: 'cog',
    description: 'Notification système'
  },
  GENERAL: { 
    label: 'Général', 
    icon: 'bell',
    description: 'Notification générale'
  },
};

// Notification category configuration for UI colors
export const NOTIFICATION_CATEGORY_CONFIG: Record<NotificationCategory, { 
  color: string; 
  backgroundColor: string;
  icon: string;
  label: string;
}> = {
  SUCCESS: { 
    color: '#10B981', 
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    icon: 'check-circle',
    label: 'Succès'
  },
  WARNING: { 
    color: '#F59E0B', 
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    icon: 'alert',
    label: 'Attention'
  },
  ERROR: { 
    color: '#EF4444', 
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    icon: 'close-circle',
    label: 'Erreur'
  },
  INFO: { 
    color: '#3B82F6', 
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    icon: 'information',
    label: 'Info'
  },
};

// Priority configuration
export const NOTIFICATION_PRIORITY_CONFIG: Record<string, { color: string; label: string }> = {
  HIGH: { color: '#EF4444', label: 'Urgent' },
  NORMAL: { color: '#3B82F6', label: 'Normal' },
  LOW: { color: '#6B7280', label: 'Faible' },
};

// ============================================
// PUBLIC NOTIFICATION TYPES (Privacy-Conscious)
// ============================================

export type PublicNotificationType = 'GOODS_ARRIVED' | 'GOODS_ASSIGNED';

/**
 * Public Notification - Privacy-conscious notifications visible to all users
 */
export interface PublicNotification {
  _id: string;
  notificationId: string;
  type: PublicNotificationType;
  maskedUserName: string;
  maskedPhone: string;
  location: string;
  containerNumber?: string;
  destination?: string;
  goodsId?: string;
  goodsNumber?: string;
  containerId?: string;
  createdAt: string;
  updatedAt?: string;
  timeAgo?: string; // Virtual field from backend
}

export interface PaginatedPublicNotifications {
  data: PublicNotification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Public notification type configuration for UI
export const PUBLIC_NOTIFICATION_TYPE_CONFIG: Record<PublicNotificationType, {
  label: string;
  icon: string;
  description: string;
  color: string;
}> = {
  GOODS_ARRIVED: {
    label: 'Arrivée',
    icon: 'package-variant-closed',
    description: 'Marchandise arrivée à l\'entrepôt',
    color: '#10B981', // Success green
  },
  GOODS_ASSIGNED: {
    label: 'Assigné',
    icon: 'truck-delivery',
    description: 'Marchandise assignée à un conteneur',
    color: '#3B82F6', // Info blue
  },
};
