import * as Notifications from "expo-notifications";
import type { NavigationContainerRef } from "@react-navigation/native";
import type { RootStackParamList } from "@src/navigations/type";
import {
  NotificationPermissionStatus,
  NotificationData,
  NotificationLog,
} from "@src/services/pushNotificationService";
import { usePushToken } from "./usePushToken";
import { useNotificationPermissions } from "./useNotificationPermissions";
import { useNotificationBadge } from "./useNotificationBadge";
import { useNotificationHistory } from "./useNotificationHistory";
import { useNotificationListeners } from "./useNotificationListeners";

export interface UsePushNotificationsReturn {
  token: string | null;
  permissionStatus: NotificationPermissionStatus;
  isRegistered: boolean;
  isEnabled: boolean;
  isLoading: boolean;
  error: string | null;
  requestPermission: () => Promise<boolean>;
  register: () => Promise<boolean>;
  unregister: () => Promise<boolean>;
  refreshToken: () => Promise<string | null>;
  badgeCount: number;
  unreadCount: number;
  lastNotification: Notifications.Notification | null;
  lastNotificationResponse: Notifications.NotificationResponse | null;
  notificationHistory: NotificationLog[];
  loadHistory: (page?: number) => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<boolean>;
  markAllNotificationsAsRead: () => Promise<boolean>;
  refreshUnreadCount: () => Promise<void>;
  clearBadge: () => Promise<void>;
}

export interface UsePushNotificationsOptions {
  autoRegister?: boolean;
  navigationRef?: NavigationContainerRef<RootStackParamList> | null;
  onNotificationReceived?: (notification: Notifications.Notification) => void;
  onNotificationTapped?: (response: Notifications.NotificationResponse) => void;
  autoIncrementBadge?: boolean;
  autoProcessDeepLink?: boolean;
  onDeepLink?: (data: NotificationData) => void;
}

export const usePushNotifications = (
  options: UsePushNotificationsOptions = {}
): UsePushNotificationsReturn => {
  const {
    autoRegister = true, navigationRef, onNotificationReceived, onNotificationTapped,
    autoIncrementBadge = true, autoProcessDeepLink = true, onDeepLink,
  } = options;

  const tokenState = usePushToken(autoRegister);
  const permState = useNotificationPermissions();
  const badgeState = useNotificationBadge();
  const historyState = useNotificationHistory(badgeState.refreshUnreadCount);
  const listenerState = useNotificationListeners({
    navigationRef, onNotificationReceived, onNotificationTapped,
    autoIncrementBadge, autoProcessDeepLink, onDeepLink,
    refreshUnreadCount: badgeState.refreshUnreadCount,
    setBadgeCount: badgeState.setBadgeCount, setUnreadCount: badgeState.setUnreadCount,
  });

  const isLoading = tokenState.isLoading || permState.isLoading;
  const error = tokenState.error || permState.error;

  const requestPermission = async (): Promise<boolean> => {
    const granted = await permState.requestPermission();
    if (granted) await tokenState.refreshToken();
    return granted;
  };

  return {
    token: tokenState.token, permissionStatus: permState.permissionStatus,
    isRegistered: tokenState.isRegistered, isEnabled: permState.isEnabled,
    isLoading, error, requestPermission,
    register: tokenState.register, unregister: tokenState.unregister, refreshToken: tokenState.refreshToken,
    badgeCount: badgeState.badgeCount, unreadCount: badgeState.unreadCount,
    lastNotification: listenerState.lastNotification, lastNotificationResponse: listenerState.lastNotificationResponse,
    notificationHistory: historyState.notificationHistory, loadHistory: historyState.loadHistory,
    markNotificationAsRead: historyState.markNotificationAsRead, markAllNotificationsAsRead: historyState.markAllNotificationsAsRead,
    refreshUnreadCount: badgeState.refreshUnreadCount, clearBadge: badgeState.clearBadge,
  };
};

export default usePushNotifications;
