/**
 * Push Notification Service
 * Handles push notification registration, API communication, and token management
 */

import { apiClientV2 as axiosInstance } from "@src/api/client";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import type { NotificationPermissionStatus, PushNotificationPayload as _PushNotificationPayload } from "./notificationTypes";
export type { NotificationPermissionStatus } from "./notificationTypes";
import {
  requestPermissionsBase,
  getPermissionsStatusBase,
  getPushTokenBase,
  handleNotificationBase,
  handleNotificationResponseBase,
  getBadgeCountBase,
  setBadgeCountBase,
  incrementBadgeCountBase,
  clearBadgeCountBase,
  setupNotificationChannelsBase,
} from "./notificationHelpers";

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
  badge?: number;
  unreadCount?: number;
  [key: string]: any;
}

export type PushNotificationPayload = _PushNotificationPayload<NotificationData>;

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
  _id: string; userId: string; type: NotificationType; title: string; body: string; data: NotificationData;
  status: "PENDING" | "SENT" | "DELIVERED" | "READ" | "FAILED"; priority: "LOW" | "NORMAL" | "HIGH";
  sentAt?: string; deliveredAt?: string; readAt?: string; createdAt: string;
}

const API_URL = {
  registerDevice: "/push/register", unregisterDevice: "/push/unregister", getTokens: "/push/tokens",
  deleteToken: (id: string) => `/push/tokens/${id}`, getNotifications: "/push",
  markAsRead: (id: string) => `/push/${id}/read`, markAllAsRead: "/push/read-all",
  getUnreadCount: "/push/unread", sendTest: "/push/test",
};

export const requestPermissions = async (): Promise<NotificationPermissionStatus> =>
  requestPermissionsBase("PushNotificationService");

export const getPermissionsStatus = async (): Promise<NotificationPermissionStatus> =>
  getPermissionsStatusBase("PushNotificationService");

export const areNotificationsEnabled = async (): Promise<boolean> => {
  const status = await getPermissionsStatus();
  return status === "granted";
};

export const getPushToken = async (): Promise<string | null> =>
  getPushTokenBase("PushNotificationService");

export const handleNotification = (notification: Notifications.Notification) =>
  handleNotificationBase<NotificationData>("PushNotificationService", notification);

export const handleNotificationResponse = (response: Notifications.NotificationResponse) =>
  handleNotificationResponseBase<NotificationData>("PushNotificationService", response);

export const getBadgeCount = async (): Promise<number> => getBadgeCountBase("PushNotificationService");

export const setBadgeCount = async (count: number): Promise<void> =>
  setBadgeCountBase("PushNotificationService", count);

export const incrementBadgeCount = async (): Promise<void> =>
  incrementBadgeCountBase("PushNotificationService");

export const clearBadgeCount = async (): Promise<void> => clearBadgeCountBase("PushNotificationService");

const getDeviceInfo = (): DeviceInfo => ({ brand: Device.brand, manufacturer: Device.manufacturer, modelName: Device.modelName, osName: Device.osName, osVersion: Device.osVersion, deviceName: Device.deviceName, platformApiLevel: Device.platformApiLevel });
const getPlatform = (): NotificationPlatform => Platform.OS === "ios" ? "ios" : Platform.OS === "android" ? "android" : "web";

export const registerDevice = async (token: string): Promise<boolean> => {
  try { await axiosInstance.post(API_URL.registerDevice, { token, platform: getPlatform(), deviceInfo: getDeviceInfo() }); console.log("[PushNotificationService] Device registered successfully"); return true; }
  catch (error) { console.error("[PushNotificationService] Error registering device:", error); return false; }
};

export const unregisterDevice = async (token: string): Promise<boolean> => {
  try { await axiosInstance.post(API_URL.unregisterDevice, { token }); console.log("[PushNotificationService] Device unregistered successfully"); return true; }
  catch (error) { console.error("[PushNotificationService] Error unregistering device:", error); return false; }
};

export const getRegisteredTokens = async (): Promise<Array<{ id: string; platform: string; deviceInfo: DeviceInfo; isActive: boolean; lastUsed: string }>> => {
  try { const response = await axiosInstance.get(API_URL.getTokens); return response.data.data.tokens || []; }
  catch (error) { console.error("[PushNotificationService] Error getting tokens:", error); return []; }
};

export const deleteToken = async (tokenId: string): Promise<boolean> => {
  try { await axiosInstance.delete(API_URL.deleteToken(tokenId)); console.log("[PushNotificationService] Token deleted successfully"); return true; }
  catch (error) { console.error("[PushNotificationService] Error deleting token:", error); return false; }
};

export const getNotificationHistory = async (page = 1, limit = 20, type?: NotificationType): Promise<{ notifications: NotificationLog[]; pagination: { page: number; limit: number; total: number; pages: number } }> => {
  try { const params = new URLSearchParams(); params.append("page", page.toString()); params.append("limit", limit.toString()); if (type) params.append("type", type); const response = await axiosInstance.get(`${API_URL.getNotifications}?${params}`); return response.data.data; }
  catch (error) { console.error("[PushNotificationService] Error getting notification history:", error); throw error; }
};

export const getUnreadCount = async (): Promise<number> => {
  try { const response = await axiosInstance.get(API_URL.getUnreadCount); return response.data.data.count || 0; }
  catch (error) { console.error("[PushNotificationService] Error getting unread count:", error); return 0; }
};

export const markAsRead = async (notificationId: string): Promise<boolean> => {
  try { await axiosInstance.patch(API_URL.markAsRead(notificationId)); return true; }
  catch (error) { console.error("[PushNotificationService] Error marking notification as read:", error); return false; }
};

export const markAllAsRead = async (): Promise<boolean> => {
  try { await axiosInstance.patch(API_URL.markAllAsRead); return true; }
  catch (error) { console.error("[PushNotificationService] Error marking all as read:", error); return false; }
};

export const sendTestNotification = async (title?: string, body?: string): Promise<boolean> => {
  try { await axiosInstance.post(API_URL.sendTest, { title, body }); console.log("[PushNotificationService] Test notification sent"); return true; }
  catch (error) { console.error("[PushNotificationService] Error sending test notification:", error); return false; }
};

const NOTIFICATION_CHANNELS = { DEFAULT: "default", ORDERS: "orders", PAYMENTS: "payments", CONTAINERS: "containers", TICKETS: "tickets", INVOICES: "invoices", SYSTEM: "system", HIGH_PRIORITY: "high_priority" };

export const setupNotificationChannels = async (): Promise<void> => {
  await setupNotificationChannelsBase("PushNotificationService", [
    { id: NOTIFICATION_CHANNELS.DEFAULT, name: "General", importance: Notifications.AndroidImportance.DEFAULT, vibrationPattern: [0, 250, 250, 250], lightColor: "#1976D2" },
    { id: NOTIFICATION_CHANNELS.HIGH_PRIORITY, name: "High Priority", importance: Notifications.AndroidImportance.HIGH, vibrationPattern: [0, 250, 250, 250], lightColor: "#FF5722" },
    { id: NOTIFICATION_CHANNELS.ORDERS, name: "Orders", importance: Notifications.AndroidImportance.HIGH, vibrationPattern: [0, 250, 250, 250], lightColor: "#8B5CF6" },
    { id: NOTIFICATION_CHANNELS.PAYMENTS, name: "Payments", importance: Notifications.AndroidImportance.HIGH, vibrationPattern: [0, 250, 250, 250], lightColor: "#10B981" },
    { id: NOTIFICATION_CHANNELS.CONTAINERS, name: "Container Updates", importance: Notifications.AndroidImportance.DEFAULT, vibrationPattern: [0, 250, 250, 250], lightColor: "#3B82F6" },
    { id: NOTIFICATION_CHANNELS.TICKETS, name: "Support Tickets", importance: Notifications.AndroidImportance.HIGH, vibrationPattern: [0, 250, 250, 250], lightColor: "#F59E0B" },
    { id: NOTIFICATION_CHANNELS.INVOICES, name: "Invoices", importance: Notifications.AndroidImportance.HIGH, vibrationPattern: [0, 250, 250, 250], lightColor: "#EF4444" },
    { id: NOTIFICATION_CHANNELS.SYSTEM, name: "System", importance: Notifications.AndroidImportance.LOW, vibrationPattern: [0, 250], lightColor: "#6B7280" },
  ]);
};

export const getChannelIdForType = (type: NotificationType): string => {
  const channelMap: Record<string, string> = { CONTAINER_STATUS: NOTIFICATION_CHANNELS.CONTAINERS, CONTAINER_DEPARTED: NOTIFICATION_CHANNELS.CONTAINERS, CONTAINER_ARRIVED: NOTIFICATION_CHANNELS.HIGH_PRIORITY, CONTAINER_READY_FOR_PICKUP: NOTIFICATION_CHANNELS.HIGH_PRIORITY, GOODS_RECEIVED: NOTIFICATION_CHANNELS.ORDERS, GOODS_ASSIGNED: NOTIFICATION_CHANNELS.ORDERS, GOODS_ARRIVED: NOTIFICATION_CHANNELS.ORDERS, GOODS_AT_BORDER: NOTIFICATION_CHANNELS.ORDERS, GOODS_AT_WAREHOUSE: NOTIFICATION_CHANNELS.ORDERS, GOODS_READY_FOR_PICKUP: NOTIFICATION_CHANNELS.HIGH_PRIORITY, PAYMENT_DUE: NOTIFICATION_CHANNELS.INVOICES, PAYMENT_RECEIVED: NOTIFICATION_CHANNELS.PAYMENTS, PAYMENT_REMINDER: NOTIFICATION_CHANNELS.INVOICES, INVOICE_CREATED: NOTIFICATION_CHANNELS.INVOICES, INVOICE_OVERDUE: NOTIFICATION_CHANNELS.HIGH_PRIORITY, TICKET_REPLY: NOTIFICATION_CHANNELS.TICKETS, SYSTEM: NOTIFICATION_CHANNELS.SYSTEM, GENERAL: NOTIFICATION_CHANNELS.DEFAULT };
  return channelMap[type] || NOTIFICATION_CHANNELS.DEFAULT;
};

export const initializePushNotifications = (): void => {
  Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowAlert: true, shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: true }) });
  setupNotificationChannels();
  console.log("[PushNotificationService] Initialized");
};

export default { requestPermissions, getPermissionsStatus, areNotificationsEnabled, getPushToken, registerDevice, unregisterDevice, getRegisteredTokens, deleteToken, getNotificationHistory, getUnreadCount, markAsRead, markAllAsRead, sendTestNotification, handleNotification, handleNotificationResponse, getBadgeCount, setBadgeCount, incrementBadgeCount, clearBadgeCount, setupNotificationChannels, getChannelIdForType, initializePushNotifications };
