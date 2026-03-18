/**
 * Push Notification Service
 * Handles push notification registration, API communication, and token management
 * Integrates with backend Expo Push API
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

export type NotificationPlatform = "ios" | "android" | "web";

export type NotificationType =
  | "CONTAINER_STATUS"
  | "CONTAINER_DEPARTED"
  | "CONTAINER_ARRIVED"
  | "CONTAINER_READY_FOR_PICKUP"
  | "GOODS_RECEIVED"
  | "GOODS_ASSIGNED"
  | "GOODS_ARRIVED"
  | "GOODS_AT_BORDER"
  | "GOODS_AT_WAREHOUSE"
  | "GOODS_READY_FOR_PICKUP"
  | "PAYMENT_DUE"
  | "PAYMENT_RECEIVED"
  | "PAYMENT_REMINDER"
  | "INVOICE_CREATED"
  | "INVOICE_OVERDUE"
  | "TICKET_REPLY"
  | "SYSTEM"
  | "GENERAL";

export interface NotificationData {
  type: NotificationType;
  orderId?: string;
  paymentId?: string;
  containerId?: string;
  containerNumber?: string;
  ticketId?: string;
  invoiceId?: string;
  goodsId?: string;
  screen?: string;
  deepLink?: string;
  [key: string]: any;
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

export interface DeviceInfo {
  brand: string | null;
  manufacturer: string | null;
  modelName: string | null;
  osName: string | null;
  osVersion: string | null;
  deviceName: string | null;
  platformApiLevel?: number | null;
}

export interface NotificationLog {
  _id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data: NotificationData;
  status: "PENDING" | "SENT" | "DELIVERED" | "READ" | "FAILED";
  priority: "LOW" | "NORMAL" | "HIGH";
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  createdAt: string;
}

// ============================================================================
// Configuration
// ============================================================================

const API_URL = {
  // Push token management
  registerDevice: "/push/register",
  unregisterDevice: "/push/unregister",
  getTokens: "/notifications/tokens",
  deleteToken: (id: string) => `/notifications/tokens/${id}`,
  
  // Notification history
  getNotifications: "/notifications",
  markAsRead: (id: string) => `/notifications/${id}/read`,
  markAllAsRead: "/notifications/read-all",
  getUnreadCount: "/notifications/unread",
  
  // Test
  sendTest: "/notifications/test",
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
      console.warn("[PushNotificationService] Push notifications require a physical device");
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
    console.error("[PushNotificationService] Error requesting permissions:", error);
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
    console.error("[PushNotificationService] Error getting permission status:", error);
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
 * Get the push notification token (Expo push token)
 * @returns The push token or null if not available
 */
export const getPushToken = async (): Promise<string | null> => {
  try {
    if (!Device.isDevice) {
      console.warn("[PushNotificationService] Push token requires a physical device");
      return null;
    }

    const status = await getPermissionsStatus();
    if (status !== "granted") {
      console.warn("[PushNotificationService] Notification permissions not granted");
      return null;
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants?.expoConfig?.extra?.eas?.projectId,
      })
    ).data;

    return token;
  } catch (error) {
    console.error("[PushNotificationService] Error getting push token:", error);
    return null;
  }
};

/**
 * Get device information for registration
 * @returns Device info object
 */
const getDeviceInfo = (): DeviceInfo => ({
  brand: Device.brand,
  manufacturer: Device.manufacturer,
  modelName: Device.modelName,
  osName: Device.osName,
  osVersion: Device.osVersion,
  deviceName: Device.deviceName,
  platformApiLevel: Device.platformApiLevel,
});

/**
 * Get platform type
 * @returns Platform type
 */
const getPlatform = (): NotificationPlatform => {
  if (Platform.OS === "ios") return "ios";
  if (Platform.OS === "android") return "android";
  return "web";
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
      platform: getPlatform(),
      deviceInfo: getDeviceInfo(),
    });
    console.log("[PushNotificationService] Device registered successfully");
    return true;
  } catch (error) {
    console.error("[PushNotificationService] Error registering device:", error);
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
    await axiosInstance.post(API_URL.unregisterDevice, { token });
    console.log("[PushNotificationService] Device unregistered successfully");
    return true;
  } catch (error) {
    console.error("[PushNotificationService] Error unregistering device:", error);
    return false;
  }
};

/**
 * Get all registered tokens for current user
 * @returns List of tokens
 */
export const getRegisteredTokens = async (): Promise<Array<{
  id: string;
  platform: string;
  deviceInfo: DeviceInfo;
  isActive: boolean;
  lastUsed: string;
}>> => {
  try {
    const response = await axiosInstance.get(API_URL.getTokens);
    return response.data.data.tokens || [];
  } catch (error) {
    console.error("[PushNotificationService] Error getting tokens:", error);
    return [];
  }
};

/**
 * Delete a specific token
 * @param tokenId Token ID to delete
 */
export const deleteToken = async (tokenId: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(API_URL.deleteToken(tokenId));
    console.log("[PushNotificationService] Token deleted successfully");
    return true;
  } catch (error) {
    console.error("[PushNotificationService] Error deleting token:", error);
    return false;
  }
};

// ============================================================================
// Notification History API
// ============================================================================

/**
 * Get user's notification history
 * @param page Page number
 * @param limit Items per page
 * @param type Filter by type
 * @returns Notifications with pagination
 */
export const getNotificationHistory = async (
  page = 1,
  limit = 20,
  type?: NotificationType
): Promise<{
  notifications: NotificationLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}> => {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (type) params.append("type", type);

    const response = await axiosInstance.get(`${API_URL.getNotifications}?${params}`);
    return response.data.data;
  } catch (error) {
    console.error("[PushNotificationService] Error getting notification history:", error);
    throw error;
  }
};

/**
 * Get unread notifications count
 * @returns Unread count
 */
export const getUnreadCount = async (): Promise<number> => {
  try {
    const response = await axiosInstance.get(API_URL.getUnreadCount);
    return response.data.data.count || 0;
  } catch (error) {
    console.error("[PushNotificationService] Error getting unread count:", error);
    return 0;
  }
};

/**
 * Mark a notification as read
 * @param notificationId Notification ID
 */
export const markAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    await axiosInstance.patch(API_URL.markAsRead(notificationId));
    return true;
  } catch (error) {
    console.error("[PushNotificationService] Error marking notification as read:", error);
    return false;
  }
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async (): Promise<boolean> => {
  try {
    await axiosInstance.patch(API_URL.markAllAsRead);
    return true;
  } catch (error) {
    console.error("[PushNotificationService] Error marking all as read:", error);
    return false;
  }
};

// ============================================================================
// Test & Debug
// ============================================================================

/**
 * Send a test notification to the current device
 * @param title Notification title
 * @param body Notification body
 */
export const sendTestNotification = async (
  title?: string,
  body?: string
): Promise<boolean> => {
  try {
    await axiosInstance.post(API_URL.sendTest, { title, body });
    console.log("[PushNotificationService] Test notification sent");
    return true;
  } catch (error) {
    console.error("[PushNotificationService] Error sending test notification:", error);
    return false;
  }
};

// ============================================================================
// Local Notification Handling
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

  console.log("[PushNotificationService] Notification received:", {
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

  console.log("[PushNotificationService] Notification response:", {
    actionIdentifier,
    data,
  });

  return {
    data: (data as NotificationData) || null,
    actionIdentifier,
  };
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
    console.error("[PushNotificationService] Error getting badge count:", error);
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
  } catch (error) {
    console.error("[PushNotificationService] Error setting badge count:", error);
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

const NOTIFICATION_CHANNELS = {
  DEFAULT: "default",
  ORDERS: "orders",
  PAYMENTS: "payments",
  CONTAINERS: "containers",
  TICKETS: "tickets",
  INVOICES: "invoices",
  SYSTEM: "system",
  HIGH_PRIORITY: "high_priority",
};

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
      lightColor: "#1976D2",
    });

    // High priority channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.HIGH_PRIORITY, {
      name: "High Priority",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF5722",
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

    // System channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.SYSTEM, {
      name: "System",
      importance: Notifications.AndroidImportance.LOW,
      vibrationPattern: [0, 250],
      lightColor: "#6B7280",
    });

    console.log("[PushNotificationService] Notification channels setup complete");
  } catch (error) {
    console.error("[PushNotificationService] Error setting up notification channels:", error);
  }
};

/**
 * Get channel ID for notification type
 * @param type Notification type
 * @returns Channel ID
 */
export const getChannelIdForType = (type: NotificationType): string => {
  const channelMap: Record<string, string> = {
    CONTAINER_STATUS: NOTIFICATION_CHANNELS.CONTAINERS,
    CONTAINER_DEPARTED: NOTIFICATION_CHANNELS.CONTAINERS,
    CONTAINER_ARRIVED: NOTIFICATION_CHANNELS.HIGH_PRIORITY,
    CONTAINER_READY_FOR_PICKUP: NOTIFICATION_CHANNELS.HIGH_PRIORITY,
    GOODS_RECEIVED: NOTIFICATION_CHANNELS.ORDERS,
    GOODS_ASSIGNED: NOTIFICATION_CHANNELS.ORDERS,
    GOODS_ARRIVED: NOTIFICATION_CHANNELS.ORDERS,
    GOODS_AT_BORDER: NOTIFICATION_CHANNELS.ORDERS,
    GOODS_AT_WAREHOUSE: NOTIFICATION_CHANNELS.ORDERS,
    GOODS_READY_FOR_PICKUP: NOTIFICATION_CHANNELS.HIGH_PRIORITY,
    PAYMENT_DUE: NOTIFICATION_CHANNELS.INVOICES,
    PAYMENT_RECEIVED: NOTIFICATION_CHANNELS.PAYMENTS,
    PAYMENT_REMINDER: NOTIFICATION_CHANNELS.INVOICES,
    INVOICE_CREATED: NOTIFICATION_CHANNELS.INVOICES,
    INVOICE_OVERDUE: NOTIFICATION_CHANNELS.HIGH_PRIORITY,
    TICKET_REPLY: NOTIFICATION_CHANNELS.TICKETS,
    SYSTEM: NOTIFICATION_CHANNELS.SYSTEM,
    GENERAL: NOTIFICATION_CHANNELS.DEFAULT,
  };

  return channelMap[type] || NOTIFICATION_CHANNELS.DEFAULT;
};

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initialize push notification service
 * Sets up handlers and channels
 */
export const initializePushNotifications = (): void => {
  // Set notification handler for foreground notifications
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  // Setup Android notification channels
  setupNotificationChannels();

  console.log("[PushNotificationService] Initialized");
};

export default {
  requestPermissions,
  getPermissionsStatus,
  areNotificationsEnabled,
  getPushToken,
  registerDevice,
  unregisterDevice,
  getRegisteredTokens,
  deleteToken,
  getNotificationHistory,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  sendTestNotification,
  handleNotification,
  handleNotificationResponse,
  getBadgeCount,
  setBadgeCount,
  incrementBadgeCount,
  clearBadgeCount,
  setupNotificationChannels,
  getChannelIdForType,
  initializePushNotifications,
};
