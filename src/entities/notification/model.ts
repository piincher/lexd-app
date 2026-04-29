/**
 * Notification Entity Model
 * Core domain types for the Notification entity
 */

// ============================================
// IN-APP NOTIFICATION
// ============================================

export type NotificationType =
  | "ORDER_UPDATE"
  | "PAYMENT"
  | "CONTAINER_STATUS"
  | "TICKET_REPLY"
  | "TICKET_CREATED"
  | "INVOICE"
  | "CERTIFICATE_ISSUED"
  | "SYSTEM"
  | "GENERAL";

export type NotificationCategory = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

export type NotificationPriority = "HIGH" | "NORMAL" | "LOW";

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
    [key: string]: unknown;
  };
  actionUrl?: string;
  actionLabel?: string;
  icon?: string;
  isRead: boolean;
  isDismissed: boolean;
  priority: NotificationPriority;
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
  filter?: "all" | "unread" | "system";
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

// ============================================
// PUBLIC NOTIFICATION (Privacy-conscious)
// ============================================

export type PublicNotificationType = "GOODS_ARRIVED" | "GOODS_ASSIGNED";

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
  timeAgo?: string;
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
