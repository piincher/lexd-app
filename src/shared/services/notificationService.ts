/**
 * Notification Service
 * Handles push notification registration, permissions, and local notifications
 */

import axiosInstance from "@src/api/client";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// ============================================================================
// Types
// ============================================================================

export type NotificationPermissionStatus =
  | "granted"
  | "denied"
  | "undetermined"
  | null;

export type NotificationType =
  | "ORDER_UPDATE"
  | "PAYMENT"
  | "CONTAINER_STATUS"
  | "TICKET_REPLY"
  | "TICKET_CREATED"
  | "INVOICE"
  | "CERTIFICATE_ISSUED"
  | "GENERAL"
  | "SYSTEM";

export interface NotificationData {
  type: NotificationType;
  screen?: string;
  orderId?: string;
  paymentId?: string;
  containerId?: string;
  ticketId?: string;
  invoiceId?: string;
  certificateId?: string;
  verificationCode?: string;
  issuedAt?: string;
  certificateUrl?: string | null;
  certificateMongoId?: string;
  goodsId?: string;
  message?: string;
  badge?: number;
  unreadCount?: number;
  [key: string]: unknown;
}

export interface PushNotificationPayload {
  to: string;
  title: string;
  body: string;
  data?: NotificationData;
  sound?: "default" | null;
  priority?: "default" | "normal" | "high";
  badge?: number;
  channelId?: string;
}

export interface LocalNotificationTrigger {
  seconds?: number;
  repeats?: boolean;
  date?: Date;
}

export interface NotificationPreference {
  type: NotificationType;
  enabled: boolean;
  label: string;
  description: string;
}

// ============================================================================
// Configuration
// ============================================================================

const NOTIFICATION_CHANNELS = {
  DEFAULT: "default",
  ORDERS: "orders",
  PAYMENTS: "payments",
  CONTAINERS: "containers",
  TICKETS: "tickets",
  INVOICES: "invoices",
  CERTIFICATES: "certificates",
  SYSTEM: "system",
} as const;

const API_URL = {
  registerDevice: "/user/me/device-token",
  unregisterDevice: "/user/me/device-token",
  updatePreferences: "/user/me/notification-preferences",
};

// ============================================================================
// Permission Management
// ============================================================================

/**
 * Request notification permissions from the user
 * @returns The permission status
 */
export const requestPermissions = async (): Promise<NotificationPermissionStatus> => {
  try {
    if (!Device.isDevice) {
      console.warn("[NotificationService] Push notifications require a physical device");
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus as NotificationPermissionStatus;
  } catch (error) {
    console.error("[NotificationService] Error requesting permissions:", error);
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
    console.error("[NotificationService] Error getting permission status:", error);
    return null;
  }
};

/**
 * Check if notifications are enabled
 * @returns true if notifications are granted
 */
export const areNotificationsEnabled = async (): Promise<boolean> => {
  const status = await getPermissionsStatus();
  return status === "granted";
};

// ============================================================================
// Token Management
// ============================================================================

/**
 * Get the push notification token (FCM for Android, APNS for iOS)
 * @returns The push token or null if not available
 */
export const getPushToken = async (): Promise<string | null> => {
  try {
    if (!Device.isDevice) {
      console.warn("[NotificationService] Push token requires a physical device");
      return null;
    }

    const status = await getPermissionsStatus();
    if (status !== "granted") {
      console.warn("[NotificationService] Notification permissions not granted");
      return null;
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants?.expoConfig?.extra?.eas?.projectId,
      })
    ).data;

    return token;
  } catch (error) {
    console.error("[NotificationService] Error getting push token:", error);
    return null;
  }
};

/**
 * Get device information for registration
 * @returns Device info object
 */
const getDeviceInfo = () => ({
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
    console.log("[NotificationService] Device registered successfully");
    return true;
  } catch (error) {
    console.error("[NotificationService] Error registering device:", error);
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
    console.log("[NotificationService] Device unregistered successfully");
    return true;
  } catch (error) {
    console.error("[NotificationService] Error unregistering device:", error);
    return false;
  }
};

// ============================================================================
// Notification Handling
// ============================================================================

/**
 * Handle a received notification
 * @param notification The received notification
 * @returns Parsed notification data
 */
export const handleNotification = (
  notification: Notifications.Notification
): { data: NotificationData | null; title: string; body: string } => {
  const { data, title, body } = notification.request.content;

  console.log("[NotificationService] Notification received:", {
    title,
    body,
    data,
  });

  return {
    data: (data as NotificationData) || null,
    title: title || "",
    body: body || "",
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

  console.log("[NotificationService] Notification response:", {
    actionIdentifier,
    data,
  });

  return {
    data: (data as NotificationData) || null,
    actionIdentifier,
  };
};

// ============================================================================
// Local Notifications
// ============================================================================

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
      notificationTrigger = {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: trigger.date,
      };
    } else if (trigger.seconds) {
      // Schedule after a delay
      notificationTrigger = {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
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
        badge: 1,
      },
      trigger: notificationTrigger,
    });

    console.log("[NotificationService] Local notification scheduled:", identifier);
    return identifier;
  } catch (error) {
    console.error("[NotificationService] Error scheduling notification:", error);
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
    console.log("[NotificationService] Notification cancelled:", identifier);
  } catch (error) {
    console.error("[NotificationService] Error cancelling notification:", error);
  }
};

/**
 * Cancel all scheduled notifications
 */
export const cancelAllNotifications = async (): Promise<void> => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("[NotificationService] All notifications cancelled");
  } catch (error) {
    console.error("[NotificationService] Error cancelling all notifications:", error);
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
    console.error("[NotificationService] Error getting scheduled notifications:", error);
    return [];
  }
};

// ============================================================================
// Badge Management
// ============================================================================

/**
 * Get current badge count
 * @returns The badge count
 */
export const getBadgeCount = async (): Promise<number> => {
  try {
    return await Notifications.getBadgeCountAsync();
  } catch (error) {
    console.error("[NotificationService] Error getting badge count:", error);
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
    console.log("[NotificationService] Badge count set to:", count);
  } catch (error) {
    console.error("[NotificationService] Error setting badge count:", error);
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

// ============================================================================
// Channel Management (Android)
// ============================================================================

/**
 * Setup notification channels for Android
 */
export const setupNotificationChannels = async (): Promise<void> => {
  if (Platform.OS !== "android") return;

  try {
    // Default channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.DEFAULT, {
      name: "General",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#8B5CF6",
    });

    // Orders channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.ORDERS, {
      name: "Orders",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#8B5CF6",
    });

    // Payments channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.PAYMENTS, {
      name: "Payments",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#10B981",
    });

    // Containers channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.CONTAINERS, {
      name: "Container Updates",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#3B82F6",
    });

    // Tickets channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.TICKETS, {
      name: "Support Tickets",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#F59E0B",
    });

    // Invoices channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.INVOICES, {
      name: "Invoices",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#EF4444",
    });

    // Certificates channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.CERTIFICATES, {
      name: "Certificates",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#F4D03F",
    });

    // System channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.SYSTEM, {
      name: "System",
      importance: Notifications.AndroidImportance.LOW,
      vibrationPattern: [0, 250],
      lightColor: "#6B7280",
    });

    console.log("[NotificationService] Notification channels setup complete");
  } catch (error) {
    console.error("[NotificationService] Error setting up notification channels:", error);
  }
};

/**
 * Get channel ID for notification type
 * @param type Notification type
 * @returns Channel ID
 */
export const getChannelIdForType = (type: NotificationType): string => {
  const channelMap: Record<NotificationType, string> = {
    ORDER_UPDATE: NOTIFICATION_CHANNELS.ORDERS,
    PAYMENT: NOTIFICATION_CHANNELS.PAYMENTS,
    CONTAINER_STATUS: NOTIFICATION_CHANNELS.CONTAINERS,
    TICKET_REPLY: NOTIFICATION_CHANNELS.TICKETS,
    TICKET_CREATED: NOTIFICATION_CHANNELS.TICKETS,
    INVOICE: NOTIFICATION_CHANNELS.INVOICES,
    CERTIFICATE_ISSUED: NOTIFICATION_CHANNELS.CERTIFICATES,
    GENERAL: NOTIFICATION_CHANNELS.DEFAULT,
    SYSTEM: NOTIFICATION_CHANNELS.SYSTEM,
  };

  return channelMap[type] || NOTIFICATION_CHANNELS.DEFAULT;
};

// ============================================================================
// Preferences Management
// ============================================================================

/**
 * Default notification preferences
 */
export const defaultNotificationPreferences: NotificationPreference[] = [
  {
    type: "ORDER_UPDATE",
    enabled: true,
    label: "Order Updates",
    description: "Receive updates about your orders",
  },
  {
    type: "PAYMENT",
    enabled: true,
    label: "Payment Notifications",
    description: "Get notified about payment confirmations",
  },
  {
    type: "CONTAINER_STATUS",
    enabled: true,
    label: "Container Updates",
    description: "Track your container status changes",
  },
  {
    type: "TICKET_REPLY",
    enabled: true,
    label: "Support Replies",
    description: "Receive replies from customer support",
  },
  {
    type: "INVOICE",
    enabled: true,
    label: "Invoice Notifications",
    description: "Get notified about new invoices",
  },
  {
    type: "CERTIFICATE_ISSUED",
    enabled: true,
    label: "Certificats",
    description: "Notifications de certificat d'expéditeur certifié",
  },
  {
    type: "GENERAL",
    enabled: true,
    label: "General Notifications",
    description: "Other important announcements",
  },
];

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
    console.log("[NotificationService] Preferences updated successfully");
    return true;
  } catch (error) {
    console.error("[NotificationService] Error updating preferences:", error);
    return false;
  }
};

// ============================================================================
// Expo Push API (for testing/development)
// ============================================================================

/**
 * Send push notification via Expo Push API
 * Note: This should typically be done from the backend
 * @param tokens Array of push tokens
 * @param title Notification title
 * @param body Notification body
 * @param data Notification data
 */
export const sendPushNotification = async (
  tokens: string[],
  title: string,
  body: string,
  data?: NotificationData
): Promise<void> => {
  const messages: PushNotificationPayload[] = tokens.map((token) => ({
    to: token,
    title,
    body,
    data,
    priority: "high",
  }));

  const chunks = [];
  const chunkSize = 100; // Expo allows up to 100 messages per request
  for (let i = 0; i < messages.length; i += chunkSize) {
    chunks.push(messages.slice(i, i + chunkSize));
  }

  for (const chunk of chunks) {
    try {
      const response = await fetch("https://api.expo.dev/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chunk),
      });

      const responseData = await response.json();
      console.log("[NotificationService] Push notification sent:", responseData);
    } catch (error) {
      console.error("[NotificationService] Error sending push notification:", error);
    }
  }
};

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initialize notification service
 * Sets up handlers and channels
 */
export const initializeNotifications = (): void => {
  // Set notification handler for foreground notifications
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  // Setup Android notification channels
  setupNotificationChannels();

  console.log("[NotificationService] Initialized");
};
