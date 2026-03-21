/**
 * Notification Channel Management (Android)
 * Sets up and manages Android notification channels
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { NOTIFICATION_CHANNELS, NotificationType } from './types';

/**
 * Setup notification channels for Android
 */
export const setupNotificationChannels = async (): Promise<void> => {
  if (Platform.OS !== 'android') return;

  try {
    // Default channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.DEFAULT, {
      name: 'General',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#8B5CF6',
    });

    // Orders channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.ORDERS, {
      name: 'Orders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#8B5CF6',
    });

    // Payments channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.PAYMENTS, {
      name: 'Payments',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#10B981',
    });

    // Containers channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.CONTAINERS, {
      name: 'Container Updates',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#3B82F6',
    });

    // Tickets channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.TICKETS, {
      name: 'Support Tickets',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#F59E0B',
    });

    // Invoices channel (Feature removed)
    // await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.INVOICES, {
    //   name: 'Invoices',
    //   importance: Notifications.AndroidImportance.HIGH,
    //   vibrationPattern: [0, 250, 250, 250],
    //   lightColor: '#EF4444',
    //   sound: 'default',
    // });

    // Certificates channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.CERTIFICATES, {
      name: 'Certificates',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#F4D03F',
    });

    // System channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.SYSTEM, {
      name: 'System',
      importance: Notifications.AndroidImportance.LOW,
      vibrationPattern: [0, 250],
      lightColor: '#6B7280',
    });

    console.log('[NotificationService] Notification channels setup complete');
  } catch (error) {
    console.error('[NotificationService] Error setting up notification channels:', error);
  }
};

/**
 * Get channel ID for notification type
 * @param type Notification type
 * @returns Channel ID
 */
export const getChannelIdForType = (type: NotificationType): string => {
  const channelMap: Record<NotificationType, string> = {
    ORDER_UPDATE: NOTIFICATION_CHANNELS.ORDERS,
    PAYMENT: NOTIFICATION_CHANNELS.PAYMENTS,
    CONTAINER_STATUS: NOTIFICATION_CHANNELS.CONTAINERS,
    TICKET_REPLY: NOTIFICATION_CHANNELS.TICKETS,
    // INVOICE: NOTIFICATION_CHANNELS.INVOICES, // Feature removed
    CERTIFICATE_ISSUED: NOTIFICATION_CHANNELS.CERTIFICATES,
    GENERAL: NOTIFICATION_CHANNELS.DEFAULT,
    SYSTEM: NOTIFICATION_CHANNELS.SYSTEM,
  };

  return channelMap[type] || NOTIFICATION_CHANNELS.DEFAULT;
};
