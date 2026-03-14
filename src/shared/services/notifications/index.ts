/**
 * Notification Services
 * Modular notification service exports
 */

// Types
export * from './types';

// Permissions
export {
  requestPermissions,
  getPermissionsStatus,
  areNotificationsEnabled,
} from './notificationPermissions';

// Tokens
export {
  getPushToken,
  registerDevice,
  unregisterDevice,
  getDeviceInfo,
} from './notificationTokens';

// Handlers
export {
  handleNotification,
  handleNotificationResponse,
} from './notificationHandlers';

// Channels (Android)
export {
  setupNotificationChannels,
  getChannelIdForType,
} from './notificationChannels';

// Badges
export {
  getBadgeCount,
  setBadgeCount,
  incrementBadgeCount,
  clearBadgeCount,
} from './notificationBadges';

// Local Notifications
export {
  scheduleLocalNotification,
  cancelNotification,
  cancelAllNotifications,
  getScheduledNotifications,
} from './notificationLocal';

// Preferences
export {
  updateNotificationPreferences,
  getDefaultPreferences,
  defaultNotificationPreferences,
} from './notificationPreferences';
