/**
 * Notification Token Management
 * Handles push token generation, registration, and device info
 */

import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import axiosInstance from '@src/api/client';
import { getPermissionsStatus } from './notificationPermissions';
import { API_URL } from './types';

/**
 * Get device information for registration
 * @returns Device info object
 */
export const getDeviceInfo = () => ({
  brand: Device.brand,
  manufacturer: Device.manufacturer,
  modelName: Device.modelName,
  deviceYearClass: Device.deviceYearClass,
  totalMemory: Device.totalMemory,
  supportedCpuArchitectures: Device.supportedCpuArchitectures,
  osName: Device.osName,
  osVersion: Device.osVersion,
  osBuildId: Device.osBuildId,
  platformApiLevel: Device.platformApiLevel,
  deviceName: Device.deviceName,
});

/**
 * Get the push notification token (FCM for Android, APNS for iOS)
 * @returns The push token or null if not available
 */
export const getPushToken = async (): Promise<string | null> => {
  try {
    if (!Device.isDevice) {
      console.warn('[NotificationService] Push token requires a physical device');
      return null;
    }

    const status = await getPermissionsStatus();
    if (status !== 'granted') {
      console.warn('[NotificationService] Notification permissions not granted');
      return null;
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants?.expoConfig?.extra?.eas?.projectId,
      })
    ).data;

    return token;
  } catch (error) {
    console.error('[NotificationService] Error getting push token:', error);
    return null;
  }
};

/**
 * Register device token with backend
 * @param token The push notification token
 * @returns Success status
 */
export const registerDevice = async (token: string): Promise<boolean> => {
  try {
    await axiosInstance.post(API_URL.registerDevice, {
      token,
      platform: Platform.OS,
      deviceInfo: getDeviceInfo(),
    });
    console.log('[NotificationService] Device registered successfully');
    return true;
  } catch (error) {
    console.error('[NotificationService] Error registering device:', error);
    return false;
  }
};

/**
 * Unregister device token (e.g., on logout)
 * @param token The push notification token to unregister
 * @returns Success status
 */
export const unregisterDevice = async (token: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`${API_URL.unregisterDevice}/${token}`);
    console.log('[NotificationService] Device unregistered successfully');
    return true;
  } catch (error) {
    console.error('[NotificationService] Error unregistering device:', error);
    return false;
  }
};
