/**
 * Notification Service Types
 * Shared type definitions for notification system
 */

import * as Notifications from 'expo-notifications';

export type NotificationPermissionStatus =
  | 'granted'
  | 'denied'
  | 'undetermined'
  | null;

export type NotificationType =
  | 'ORDER_UPDATE'
  | 'PAYMENT'
  | 'CONTAINER_STATUS'
  | 'TICKET_REPLY'
  // | 'INVOICE' // Feature removed
  | 'CERTIFICATE_ISSUED'
  | 'GENERAL'
  | 'SYSTEM';

export interface NotificationData {
  type: NotificationType;
  orderId?: string;
  paymentId?: string;
  containerId?: string;
  ticketId?: string;
  // invoiceId?: string; // Feature removed
  certificateId?: string;
  goodsId?: string;
  message?: string;
  [key: string]: any;
}

export interface PushNotificationPayload {
  to: string;
  title: string;
  body: string;
  data?: NotificationData;
  sound?: 'default' | null;
  priority?: 'default' | 'normal' | 'high';
  badge?: number;
  channelId?: string;
}

export interface LocalNotificationTrigger {
  seconds?: number;
  repeats?: boolean;
  date?: Date;
}

export interface NotificationPreference {
  type: NotificationType;
  enabled: boolean;
  label: string;
  description: string;
}

export interface NotificationHandlers {
  handleNotification: (notification: Notifications.Notification) => {
    data: NotificationData | null;
    title: string;
    body: string;
  };
  handleNotificationResponse: (response: Notifications.NotificationResponse) => {
    data: NotificationData | null;
    actionIdentifier: string;
  };
}

// Constants
export const NOTIFICATION_CHANNELS = {
  DEFAULT: 'default',
  ORDERS: 'orders',
  PAYMENTS: 'payments',
  CONTAINERS: 'containers',
  TICKETS: 'tickets',
  // INVOICES: 'invoices', // Feature removed
  CERTIFICATES: 'certificates',
  SYSTEM: 'system',
} as const;

export const API_URL = {
  registerDevice: '/users/me/device-token',
  unregisterDevice: '/users/me/device-token',
  updatePreferences: '/users/me/notification-preferences',
};

export const defaultNotificationPreferences: NotificationPreference[] = [
  {
    type: 'ORDER_UPDATE',
    enabled: true,
    label: 'Order Updates',
    description: 'Receive updates about your orders',
  },
  {
    type: 'PAYMENT',
    enabled: true,
    label: 'Payment Notifications',
    description: 'Get notified about payment confirmations',
  },
  {
    type: 'CONTAINER_STATUS',
    enabled: true,
    label: 'Container Updates',
    description: 'Track your container status changes',
  },
  {
    type: 'TICKET_REPLY',
    enabled: true,
    label: 'Support Replies',
    description: 'Receive replies from customer support',
  },
  // {
  //   type: 'INVOICE',
  //   enabled: true,
  //   label: 'Invoice Notifications',
  //   description: 'Get notified about new invoices',
  // }, // Feature removed
  {
    type: 'CERTIFICATE_ISSUED',
    enabled: true,
    label: 'Certificats',
    description: 'Notifications de certificat d\'expéditeur certifié',
  },
  {
    type: 'GENERAL',
    enabled: true,
    label: 'General Notifications',
    description: 'Other important announcements',
  },
];
