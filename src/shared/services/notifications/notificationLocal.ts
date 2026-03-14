/**
 * Local Notification Management
 * Handles scheduling and canceling local notifications
 */

import * as Notifications from 'expo-notifications';
import { NotificationData, LocalNotificationTrigger } from './types';

/**
 * Schedule a local notification
 * @param title Notification title
 * @param body Notification body
 * @param data Additional data payload
 * @param trigger Trigger configuration (seconds from now or specific date)
 * @returns The notification identifier
 */
export const scheduleLocalNotification = async (
  title: string,
  body: string,
  data: NotificationData,
  trigger: LocalNotificationTrigger
): Promise<string | null> => {
  try {
    let notificationTrigger: Notifications.NotificationTriggerInput;

    if (trigger.date) {
      // Schedule for a specific date/time
      notificationTrigger = { date: trigger.date };
    } else if (trigger.seconds) {
      // Schedule after a delay
      notificationTrigger = {
        seconds: trigger.seconds,
        repeats: trigger.repeats || false,
      };
    } else {
      // Immediate notification
      notificationTrigger = null;
    }

    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: 'default',
        badge: 1,
      },
      trigger: notificationTrigger,
    });

    console.log('[NotificationService] Local notification scheduled:', identifier);
    return identifier;
  } catch (error) {
    console.error('[NotificationService] Error scheduling notification:', error);
    return null;
  }
};

/**
 * Cancel a scheduled notification
 * @param identifier The notification identifier
 */
export const cancelNotification = async (identifier: string): Promise<void> => {
  try {
    await Notifications.cancelScheduledNotificationAsync(identifier);
    console.log('[NotificationService] Notification cancelled:', identifier);
  } catch (error) {
    console.error('[NotificationService] Error cancelling notification:', error);
  }
};

/**
 * Cancel all scheduled notifications
 */
export const cancelAllNotifications = async (): Promise<void> => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('[NotificationService] All notifications cancelled');
  } catch (error) {
    console.error('[NotificationService] Error cancelling all notifications:', error);
  }
};

/**
 * Get all scheduled notifications
 * @returns Array of scheduled notifications
 */
export const getScheduledNotifications = async (): Promise<
  Notifications.NotificationRequest[]
> => {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('[NotificationService] Error getting scheduled notifications:', error);
    return [];
  }
};
