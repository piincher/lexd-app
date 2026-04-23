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
  | 'TICKET_CREATED'
  // | 'INVOICE' // Feature removed
  | 'CERTIFICATE_ISSUED'
  | 'GENERAL'
  | 'SYSTEM';

export interface NotificationData {
  type: NotificationType;
  screen?: string;
  orderId?: string;
  paymentId?: string;
  containerId?: string;
  ticketId?: string;
  // invoiceId?: string; // Feature removed
  certificateId?: string;
  verificationCode?: string;
  issuedAt?: string;
  certificateUrl?: string | null;
  certificateMongoId?: string;
  goodsId?: string;
  message?: string;
  [key: string]: unknown;
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
  registerDevice: '/user/me/device-token',
  unregisterDevice: '/user/me/device-token',
  updatePreferences: '/user/me/notification-preferences',
};

export const defaultNotificationPreferences: NotificationPreference[] = [
  {
    type: 'ORDER_UPDATE',
    enabled: true,
    label: 'Mises a jour des commandes',
    description: 'Recevez des mises a jour sur vos commandes',
  },
  {
    type: 'PAYMENT',
    enabled: true,
    label: 'Notifications de paiement',
    description: 'Soyez informe des confirmations de paiement',
  },
  {
    type: 'CONTAINER_STATUS',
    enabled: true,
    label: 'Suivi des conteneurs',
    description: 'Suivez les changements de statut de vos conteneurs',
  },
  {
    type: 'TICKET_REPLY',
    enabled: true,
    label: 'Reponses du support',
    description: 'Recevez les reponses du service client',
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
    label: 'Notifications generales',
    description: 'Autres annonces importantes',
  },
];
