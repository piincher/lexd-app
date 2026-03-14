/**
 * Notification Preferences Management
 * Handles user notification preference updates
 */

import axiosInstance from '@src/api/client';
import { API_URL, NotificationType, NotificationPreference, defaultNotificationPreferences } from './types';

export { defaultNotificationPreferences };

/**
 * Update notification preferences on backend
 * @param preferences The preferences to update
 * @returns Success status
 */
export const updateNotificationPreferences = async (
  preferences: Partial<Record<NotificationType, boolean>>
): Promise<boolean> => {
  try {
    await axiosInstance.put(API_URL.updatePreferences, { preferences });
    console.log('[NotificationService] Preferences updated successfully');
    return true;
  } catch (error) {
    console.error('[NotificationService] Error updating preferences:', error);
    return false;
  }
};

/**
 * Get default notification preferences
 * @returns Array of default preferences
 */
export const getDefaultPreferences = (): NotificationPreference[] => {
  return [...defaultNotificationPreferences];
};
