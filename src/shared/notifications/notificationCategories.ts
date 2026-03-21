/**
 * Notification Categories
 * iOS notification categories and actions
 */

import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// ============================================================================
// Types
// ============================================================================

export interface NotificationCategory {
  identifier: string;
  actions: Notifications.NotificationAction[];
  options?: Notifications.NotificationCategoryOptions;
}

export type NotificationActionIdentifier =
  | "VIEW"
  | "DISMISS"
  | "REPLY"
  | "MARK_READ"
  | "ARCHIVE"
  | "ACCEPT"
  | "DECLINE";

// ============================================================================
// Action Definitions
// ============================================================================

/**
 * Common notification actions
 */
export const notificationActions = {
  view: {
    identifier: "VIEW",
    buttonTitle: "View",
    options: {
      isDestructive: false,
      isAuthenticationRequired: false,
    },
  } as Notifications.NotificationAction,

  dismiss: {
    identifier: "DISMISS",
    buttonTitle: "Dismiss",
    options: {
      isDestructive: false,
      isAuthenticationRequired: false,
    },
  } as Notifications.NotificationAction,

  reply: {
    identifier: "REPLY",
    buttonTitle: "Reply",
    textInput: {
      submitButtonTitle: "Send",
      placeholder: "Type your reply...",
    },
    options: {
      isDestructive: false,
      isAuthenticationRequired: false,
    },
  } as Notifications.NotificationAction,

  markRead: {
    identifier: "MARK_READ",
    buttonTitle: "Mark as Read",
    options: {
      isDestructive: false,
      isAuthenticationRequired: false,
    },
  } as Notifications.NotificationAction,

  archive: {
    identifier: "ARCHIVE",
    buttonTitle: "Archive",
    options: {
      isDestructive: false,
      isAuthenticationRequired: false,
    },
  } as Notifications.NotificationAction,

  accept: {
    identifier: "ACCEPT",
    buttonTitle: "Accept",
    options: {
      isDestructive: false,
      isAuthenticationRequired: false,
      foreground: true,
    },
  } as Notifications.NotificationAction,

  decline: {
    identifier: "DECLINE",
    buttonTitle: "Decline",
    options: {
      isDestructive: true,
      isAuthenticationRequired: false,
    },
  } as Notifications.NotificationAction,
};

// ============================================================================
// Category Definitions
// ============================================================================

/**
 * Notification categories for different notification types
 */
export const notificationCategories: NotificationCategory[] = [
  {
    identifier: "ORDER_UPDATE",
    actions: [notificationActions.view, notificationActions.markRead],
    options: {
      customDismissAction: true,
    },
  },
  {
    identifier: "PAYMENT",
    actions: [notificationActions.view, notificationActions.dismiss],
    options: {
      customDismissAction: true,
    },
  },
  {
    identifier: "CONTAINER_STATUS",
    actions: [notificationActions.view, notificationActions.markRead],
    options: {
      customDismissAction: true,
    },
  },
  {
    identifier: "TICKET_REPLY",
    actions: [notificationActions.reply, notificationActions.view],
    options: {
      customDismissAction: true,
    },
  },
  {
    identifier: "INVOICE",
    actions: [notificationActions.view, notificationActions.archive],
    options: {
      customDismissAction: true,
    },
  },
  {
    identifier: "CERTIFICATE_ISSUED",
    actions: [notificationActions.view, notificationActions.markRead],
    options: {
      customDismissAction: true,
    },
  },
  {
    identifier: "GENERAL",
    actions: [notificationActions.markRead, notificationActions.dismiss],
    options: {
      customDismissAction: true,
    },
  },
  {
    identifier: "SYSTEM",
    actions: [notificationActions.view],
    options: {
      customDismissAction: true,
    },
  },
];

// ============================================================================
// Setup Functions
// ============================================================================

/**
 * Setup notification categories (iOS)
 * Android doesn't support notification categories in the same way
 */
export const setupNotificationCategories = async (): Promise<void> => {
  if (Platform.OS !== "ios") {
    return;
  }

  try {
    for (const category of notificationCategories) {
      await Notifications.setNotificationCategoryAsync(
        category.identifier,
        category.actions,
        category.options
      );
    }
    console.log("[NotificationCategories] Categories setup complete");
  } catch (error) {
    console.error("[NotificationCategories] Error setting up categories:", error);
  }
};

/**
 * Get all registered notification categories
 * @returns Array of registered categories
 */
export const getNotificationCategories = async (): Promise<
  Notifications.NotificationCategory[]
> => {
  try {
    return await Notifications.getNotificationCategoriesAsync();
  } catch (error) {
    console.error("[NotificationCategories] Error getting categories:", error);
    return [];
  }
};

/**
 * Delete a notification category
 * @param identifier Category identifier
 */
export const deleteNotificationCategory = async (
  identifier: string
): Promise<void> => {
  try {
    await Notifications.deleteNotificationCategoryAsync(identifier);
    console.log(`[NotificationCategories] Category deleted: ${identifier}`);
  } catch (error) {
    console.error(
      `[NotificationCategories] Error deleting category ${identifier}:",
      error`
    );
  }
};

// ============================================================================
// Category Helpers
// ============================================================================

/**
 * Get category identifier for notification type
 * @param type Notification type
 * @returns Category identifier
 */
export const getCategoryForType = (type: string): string => {
  const validTypes = [
    "ORDER_UPDATE",
    "PAYMENT",
    "CONTAINER_STATUS",
    "TICKET_REPLY",
    "INVOICE",
    "CERTIFICATE_ISSUED",
    "GENERAL",
    "SYSTEM",
  ];

  return validTypes.includes(type) ? type : "GENERAL";
};

/**
 * Check if a category exists
 * @param identifier Category identifier
 * @returns true if category exists
 */
export const categoryExists = async (identifier: string): Promise<boolean> => {
  const categories = await getNotificationCategories();
  return categories.some((cat) => cat.identifier === identifier);
};
