// Shared Notifications - Public API

export {
  // Navigation
  setNotificationNavigationRef,
  getNavigationRef,

  // Handlers
  notificationHandlers,
  processNotification,
  processNotificationData,

  // Custom Handlers
  registerCustomHandler,
  unregisterCustomHandler,
  processNotificationWithCustomHandlers,

  // Types
  type NotificationHandler,
  type NotificationHandlersMap,
} from "./notificationHandlers";

export {
  // Categories
  notificationCategories,
  notificationActions,

  // Setup
  setupNotificationCategories,
  getNotificationCategories,
  deleteNotificationCategory,

  // Helpers
  getCategoryForType,
  categoryExists,

  // Types
  type NotificationCategory,
  type NotificationActionIdentifier,
} from "./notificationCategories";
