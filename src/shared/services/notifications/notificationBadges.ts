/**
 * Notification Badge Management
 * Handles app badge count operations
 */

import * as Notifications from 'expo-notifications';

/**
 * Get current badge count
 * @returns The badge count
 */
export const getBadgeCount = async (): Promise<number> => {
  try {
    return await Notifications.getBadgeCountAsync();
  } catch (error) {
    console.error('[NotificationService] Error getting badge count:', error);
    return 0;
  }
};

/**
 * Set badge count
 * @param count The badge count
 */
export const setBadgeCount = async (count: number): Promise<void> => {
  try {
    await Notifications.setBadgeCountAsync(count);
    console.log('[NotificationService] Badge count set to:', count);
  } catch (error) {
    console.error('[NotificationService] Error setting badge count:', error);
  }
};

/**
 * Increment badge count
 */
export const incrementBadgeCount = async (): Promise<void> => {
  const current = await getBadgeCount();
  await setBadgeCount(current + 1);
};

/**
 * Clear badge count (set to 0)
 */
export const clearBadgeCount = async (): Promise<void> => {
  await setBadgeCount(0);
};
