/**
 * Notification Types - In-App Notification System
 */

import { ink, semantic } from '@src/shared/constants/brand';

export type FilterTab = 'all' | 'important' | 'shipments' | 'payments' | 'unread' | 'system';

export type NotificationType =
  | 'ORDER_UPDATE'
  | 'PAYMENT'
  | 'CONTAINER_STATUS'
  | 'TICKET_REPLY'
  | 'TICKET_CREATED'
  | 'INVOICE'
  | 'CERTIFICATE_ISSUED'
  | 'SYSTEM'
  | 'GENERAL';

export type NotificationCategory = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

export interface NotificationTrackingData {
  currentStatus?: string;
  currentLocation?: string;
  currentWaypointLabel?: string;
  currentOperation?: string;
  destination?: string;
  progressPercentage?: number;
  completedWaypoints?: number;
  totalWaypoints?: number;
  isFinalWaypoint?: boolean;
  sameCityNext?: boolean;
  nextWaypoint?: {
    location: string;
    label?: string;
    operation?: string;
    status: string;
    estimatedArrival?: string;
    estimatedDeparture?: string;
    segmentType: string;
    transportInfo?: string;
    routeDetails?: string;
    borderCrossing?: string;
    description?: string;
    shortName?: string;
  };
  completedWaypoint?: {
    location: string;
    label?: string;
    operation?: string;
    status: string;
    actualArrival?: string;
    actualDeparture?: string;
    segmentType: string;
    vesselName?: string;
    transportInfo?: string;
    description?: string;
    shortName?: string;
  };
}

export interface InAppNotification {
  _id: string;
  notificationId: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  data?: {
    type?: NotificationType | string;
    screen?: string;
    orderId?: string;
    containerId?: string;
    ticketId?: string;
    invoiceId?: string;
    paymentId?: string;
    certificateId?: string;
    verificationCode?: string;
    issuedAt?: string;
    certificateUrl?: string | null;
    certificateMongoId?: string;
    // Tracking-specific fields for container waypoint notifications
    currentStatus?: string;
    currentLocation?: string;
    currentWaypointLabel?: string;
    currentOperation?: string;
    destination?: string;
    sameCityNext?: boolean;
    progressPercentage?: number;
    completedWaypoints?: number;
    totalWaypoints?: number;
    isFinalWaypoint?: boolean;
    nextWaypoint?: NotificationTrackingData['nextWaypoint'];
    completedWaypoint?: NotificationTrackingData['completedWaypoint'];
    [key: string]: unknown;
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
  filter?: FilterTab;
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
    label: 'Assistance', 
    icon: 'message-reply',
    description: 'Nouvelle réponse à votre demande'
  },
  TICKET_CREATED: {
    label: 'Nouvelle demande',
    icon: 'ticket-confirmation',
    description: 'Nouvelle demande d’assistance'
  },
  INVOICE: {
    label: 'Facture',
    icon: 'file-document',
    description: 'Nouvelle facture disponible'
  },
  CERTIFICATE_ISSUED: {
    label: 'Certificat',
    icon: 'certificate',
    description: 'Certificat d\'expéditeur certifié'
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
    color: semantic.success,
    backgroundColor: semantic.success + '1A',
    icon: 'check-circle',
    label: 'Succès'
  },
  WARNING: {
    color: semantic.warning,
    backgroundColor: semantic.warning + '1A',
    icon: 'alert',
    label: 'Attention'
  },
  ERROR: {
    color: semantic.error,
    backgroundColor: semantic.error + '1A',
    icon: 'close-circle',
    label: 'Erreur'
  },
  INFO: {
    color: semantic.info,
    backgroundColor: semantic.info + '1A',
    icon: 'information',
    label: 'Info'
  },
};

// Priority configuration
export const NOTIFICATION_PRIORITY_CONFIG: Record<string, { color: string; label: string }> = {
  HIGH: { color: semantic.error, label: 'Urgent' },
  NORMAL: { color: semantic.info, label: 'Normal' },
  LOW: { color: ink[400], label: 'Faible' },
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
    color: semantic.success,
  },
  GOODS_ASSIGNED: {
    label: 'Assignée à un envoi',
    icon: 'truck-delivery',
    description: 'Marchandise assignée à un envoi',
    color: semantic.info,
  },
};
