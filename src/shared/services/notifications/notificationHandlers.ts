/**
 * Notification Handlers
 * Processes received notifications and responses
 */

import * as Notifications from 'expo-notifications';
import { NotificationData } from './types';

/**
 * Handle a received notification
 * @param notification The received notification
 * @returns Parsed notification data
 */
export const handleNotification = (
  notification: Notifications.Notification
): { data: NotificationData | null; title: string; body: string } => {
  const { data, title, body } = notification.request.content;

  console.log('[NotificationService] Notification received:', {
    title,
    body,
    data,
  });

  return {
    data: (data as NotificationData) || null,
    title: title || '',
    body: body || '',
  };
};

/**
 * Handle a notification response (when user taps on notification)
 * @param response The notification response
 * @returns Parsed notification data
 */
export const handleNotificationResponse = (
  response: Notifications.NotificationResponse
): { data: NotificationData | null; actionIdentifier: string } => {
  const { data } = response.notification.request.content;
  const { actionIdentifier } = response;

  console.log('[NotificationService] Notification response:', {
    actionIdentifier,
    data,
  });

  return {
    data: (data as NotificationData) || null,
    actionIdentifier,
  };
};
