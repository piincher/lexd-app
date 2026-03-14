/**
 * Notification Permissions Management
 * Handles notification permission requests and status checks
 */

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { NotificationPermissionStatus } from './types';

/**
 * Request notification permissions from the user
 * @returns The permission status
 */
export const requestPermissions = async (): Promise<NotificationPermissionStatus> => {
  try {
    if (!Device.isDevice) {
      console.warn('[NotificationService] Push notifications require a physical device');
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus as NotificationPermissionStatus;
  } catch (error) {
    console.error('[NotificationService] Error requesting permissions:', error);
    return null;
  }
};

/**
 * Get current notification permission status
 * @returns The current permission status
 */
export const getPermissionsStatus = async (): Promise<NotificationPermissionStatus> => {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    return status as NotificationPermissionStatus;
  } catch (error) {
    console.error('[NotificationService] Error getting permission status:', error);
    return null;
  }
};

/**
 * Check if notifications are enabled
 * @returns true if notifications are granted
 */
export const areNotificationsEnabled = async (): Promise<boolean> => {
  const status = await getPermissionsStatus();
  return status === 'granted';
};
