/**
 * Notification Service
 * Handles push notification registration, permissions, and local notifications
 */

import axiosInstance from "@src/api/client";
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
  scheduleLocalNotification as scheduleLocalNotificationBase,
  cancelNotification as cancelNotificationBase,
  cancelAllNotifications as cancelAllNotificationsBase,
  getScheduledNotifications as getScheduledNotificationsBase,
  sendPushNotification as sendPushNotificationBase,
} from "./notificationHelpers";

export type NotificationType =
  | "ORDER_UPDATE"
  | "PAYMENT"
  | "CONTAINER_STATUS"
  | "TICKET_REPLY"
  | "TICKET_CREATED"
  | "INVOICE"
  | "CERTIFICATE_ISSUED"
  | "GENERAL"
  | "SYSTEM"
  | "WIN_BACK_NO_SHIPMENT_30D"
  | "WIN_BACK_NO_APP_OPEN_14D"
  | "WIN_BACK_GOODS_UNPAID"
  | "WIN_BACK_INVOICE_ABANDONED";

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
  promoCode?: string;
  triggerType?: string;
  deepLink?: string;
  [key: string]: any;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// ... rest of file


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
  deepLink?: string;
  message?: string;
  badge?: number;
  unreadCount?: number;
  [key: string]: unknown;
}

export type PushNotificationPayload = _PushNotificationPayload<NotificationData>;

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

const NOTIFICATION_CHANNELS = {
  // v2 id: the original "default" channel was created at DEFAULT importance, and
  // Android locks a channel's importance at creation — it can never be raised in
  // place. Bumping the id forces a fresh HIGH-importance channel so foreground
  // notifications show as heads-up banners. The backend must send this same id.
  DEFAULT: "default_v2",
  // The backend sends channelId "high_priority" for every priority:"HIGH"
  // notification (container arrived, ready-for-pickup, payments, air cargo…).
  // This channel MUST exist on the device or Android drops the heads-up banner
  // and shows it silently in the tray (the "need to leave the app" symptom).
  HIGH_PRIORITY: "high_priority",
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

export const requestPermissions = async (): Promise<NotificationPermissionStatus> =>
  requestPermissionsBase("NotificationService");

export const getPermissionsStatus = async (): Promise<NotificationPermissionStatus> =>
  getPermissionsStatusBase("NotificationService");

export const areNotificationsEnabled = async (): Promise<boolean> => {
  const status = await getPermissionsStatus();
  return status === "granted";
};

export const getPushToken = async (): Promise<string | null> =>
  getPushTokenBase("NotificationService");

export const handleNotification = (notification: Notifications.Notification) =>
  handleNotificationBase<NotificationData>("NotificationService", notification);

export const handleNotificationResponse = (response: Notifications.NotificationResponse) =>
  handleNotificationResponseBase<NotificationData>("NotificationService", response);

export const getBadgeCount = async (): Promise<number> => getBadgeCountBase("NotificationService");

export const setBadgeCount = async (count: number): Promise<void> =>
  setBadgeCountBase("NotificationService", count);

export const incrementBadgeCount = async (): Promise<void> =>
  incrementBadgeCountBase("NotificationService");

export const clearBadgeCount = async (): Promise<void> => clearBadgeCountBase("NotificationService");

const getDeviceInfo = () => ({ brand: Device.brand, manufacturer: Device.manufacturer, modelName: Device.modelName, deviceYearClass: Device.deviceYearClass, totalMemory: Device.totalMemory, supportedCpuArchitectures: Device.supportedCpuArchitectures, osName: Device.osName, osVersion: Device.osVersion, osBuildId: Device.osBuildId, platformApiLevel: Device.platformApiLevel, deviceName: Device.deviceName });

export const registerDevice = async (token: string): Promise<boolean> => {
  try { await axiosInstance.post(API_URL.registerDevice, { token, platform: Platform.OS, deviceInfo: getDeviceInfo() }); console.log("[NotificationService] Device registered successfully"); return true; }
  catch (error) { console.error("[NotificationService] Error registering device:", error); return false; }
};

export const unregisterDevice = async (token: string): Promise<boolean> => {
  try { await axiosInstance.delete(`${API_URL.unregisterDevice}/${token}`); console.log("[NotificationService] Device unregistered successfully"); return true; }
  catch (error) { console.error("[NotificationService] Error unregistering device:", error); return false; }
};

export const scheduleLocalNotification = async (
  title: string,
  body: string,
  data: NotificationData,
  trigger: LocalNotificationTrigger
): Promise<string | null> => scheduleLocalNotificationBase("NotificationService", title, body, data, trigger);

export const cancelNotification = async (identifier: string): Promise<void> =>
  cancelNotificationBase("NotificationService", identifier);

export const cancelAllNotifications = async (): Promise<void> =>
  cancelAllNotificationsBase("NotificationService");

export const getScheduledNotifications = async (): Promise<Notifications.NotificationRequest[]> =>
  getScheduledNotificationsBase("NotificationService");

export const setupNotificationChannels = async (): Promise<void> => {
  await setupNotificationChannelsBase("NotificationService", [
    { id: NOTIFICATION_CHANNELS.DEFAULT, name: "General", importance: Notifications.AndroidImportance.HIGH, vibrationPattern: [0, 250, 250, 250], lightColor: "#8B5CF6" },
    { id: NOTIFICATION_CHANNELS.HIGH_PRIORITY, name: "Priorité haute", importance: Notifications.AndroidImportance.MAX, vibrationPattern: [0, 250, 250, 250], lightColor: "#EF4444" },
    { id: NOTIFICATION_CHANNELS.ORDERS, name: "Orders", importance: Notifications.AndroidImportance.HIGH, vibrationPattern: [0, 250, 250, 250], lightColor: "#8B5CF6" },
    { id: NOTIFICATION_CHANNELS.PAYMENTS, name: "Payments", importance: Notifications.AndroidImportance.HIGH, vibrationPattern: [0, 250, 250, 250], lightColor: "#10B981" },
    { id: NOTIFICATION_CHANNELS.CONTAINERS, name: "Container Updates", importance: Notifications.AndroidImportance.DEFAULT, vibrationPattern: [0, 250, 250, 250], lightColor: "#3B82F6" },
    { id: NOTIFICATION_CHANNELS.TICKETS, name: "Support Tickets", importance: Notifications.AndroidImportance.HIGH, vibrationPattern: [0, 250, 250, 250], lightColor: "#F59E0B" },
    { id: NOTIFICATION_CHANNELS.INVOICES, name: "Invoices", importance: Notifications.AndroidImportance.HIGH, vibrationPattern: [0, 250, 250, 250], lightColor: "#EF4444" },
    { id: NOTIFICATION_CHANNELS.CERTIFICATES, name: "Certificates", importance: Notifications.AndroidImportance.HIGH, vibrationPattern: [0, 250, 250, 250], lightColor: "#EFC169" },
    { id: NOTIFICATION_CHANNELS.SYSTEM, name: "System", importance: Notifications.AndroidImportance.LOW, vibrationPattern: [0, 250], lightColor: "#6B7280" },
  ]);
};

export const getChannelIdForType = (type: NotificationType): string => {
  const channelMap: Record<NotificationType, string> = { ORDER_UPDATE: NOTIFICATION_CHANNELS.ORDERS, PAYMENT: NOTIFICATION_CHANNELS.PAYMENTS, CONTAINER_STATUS: NOTIFICATION_CHANNELS.CONTAINERS, TICKET_REPLY: NOTIFICATION_CHANNELS.TICKETS, TICKET_CREATED: NOTIFICATION_CHANNELS.TICKETS, INVOICE: NOTIFICATION_CHANNELS.INVOICES, CERTIFICATE_ISSUED: NOTIFICATION_CHANNELS.CERTIFICATES, GENERAL: NOTIFICATION_CHANNELS.DEFAULT, SYSTEM: NOTIFICATION_CHANNELS.SYSTEM, WIN_BACK_NO_SHIPMENT_30D: NOTIFICATION_CHANNELS.DEFAULT, WIN_BACK_NO_APP_OPEN_14D: NOTIFICATION_CHANNELS.DEFAULT, WIN_BACK_GOODS_UNPAID: NOTIFICATION_CHANNELS.PAYMENTS, WIN_BACK_INVOICE_ABANDONED: NOTIFICATION_CHANNELS.INVOICES };
  return channelMap[type] || NOTIFICATION_CHANNELS.DEFAULT;
};

export const defaultNotificationPreferences: NotificationPreference[] = [
  { type: "ORDER_UPDATE", enabled: true, label: "Order Updates", description: "Receive updates about your orders" },
  { type: "PAYMENT", enabled: true, label: "Payment Notifications", description: "Get notified about payment confirmations" },
  { type: "CONTAINER_STATUS", enabled: true, label: "Container Updates", description: "Track your container status changes" },
  { type: "TICKET_REPLY", enabled: true, label: "Support Replies", description: "Receive replies from customer support" },
  { type: "INVOICE", enabled: true, label: "Invoice Notifications", description: "Get notified about new invoices" },
  { type: "CERTIFICATE_ISSUED", enabled: true, label: "Certificats", description: "Notifications de certificat d'expéditeur certifié" },
  { type: "GENERAL", enabled: true, label: "General Notifications", description: "Other important announcements" },
];

export const updateNotificationPreferences = async (
  preferences: Partial<Record<NotificationType, boolean>>
): Promise<boolean> => {
  try { await axiosInstance.put(API_URL.updatePreferences, { preferences }); console.log("[NotificationService] Preferences updated successfully"); return true; }
  catch (error) { console.error("[NotificationService] Error updating preferences:", error); return false; }
};

export const sendPushNotification = async (
  tokens: string[],
  title: string,
  body: string,
  data?: NotificationData
): Promise<void> => sendPushNotificationBase("NotificationService", tokens, title, body, data);

export const initializeNotifications = (): void => {
  Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowAlert: true, shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: true }) });
  setupNotificationChannels();
  console.log("[NotificationService] Initialized");
};
