// Shared Services - Public API

export {
  // Permission Management
  requestPermissions,
  getPermissionsStatus,
  areNotificationsEnabled,

  // Token Management
  getPushToken,
  registerDevice,
  unregisterDevice,

  // Notification Handling
  handleNotification,
  handleNotificationResponse,

  // Local Notifications
  scheduleLocalNotification,
  cancelNotification,
  cancelAllNotifications,
  getScheduledNotifications,

  // Badge Management
  getBadgeCount,
  setBadgeCount,
  incrementBadgeCount,
  clearBadgeCount,

  // Channel Management
  setupNotificationChannels,
  getChannelIdForType,

  // Preferences
  defaultNotificationPreferences,
  updateNotificationPreferences,

  // Expo Push API
  sendPushNotification,

  // Initialization
  initializeNotifications,

  // Types
  type NotificationPermissionStatus,
  type NotificationType,
  type NotificationData,
  type PushNotificationPayload,
  type LocalNotificationTrigger,
  type NotificationPreference,
} from "./notificationService";

// Migrated legacy services
export * from "./sentry";
export * from "./token";
export * from "./translate";
export * as PushNotificationService from "./pushNotificationService";
