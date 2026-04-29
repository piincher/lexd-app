import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import {
  incrementBadgeCount,
  getBadgeCount,
  setBadgeCount as setNativeBadgeCount,
  NotificationData,
} from "@src/services/pushNotificationService";
import type { NavigationContainerRef } from "@react-navigation/native";
import type { RootStackParamList } from "@src/navigations/type";
import { getNotificationUnreadCount, handleDeepLink } from "../utils/notificationDeepLink";

export interface UseNotificationListenersOptions {
  navigationRef?: NavigationContainerRef<RootStackParamList> | null;
  onNotificationReceived?: (notification: Notifications.Notification) => void;
  onNotificationTapped?: (response: Notifications.NotificationResponse) => void;
  autoIncrementBadge?: boolean;
  autoProcessDeepLink?: boolean;
  onDeepLink?: (data: NotificationData) => void;
  refreshUnreadCount?: () => Promise<void>;
  setBadgeCount?: (count: number) => void;
  setUnreadCount?: (count: number) => void;
}

export interface UseNotificationListenersReturn {
  lastNotification: Notifications.Notification | null;
  lastNotificationResponse: Notifications.NotificationResponse | null;
}

export const useNotificationListeners = (
  options: UseNotificationListenersOptions = {}
): UseNotificationListenersReturn => {
  const {
    navigationRef, onNotificationReceived, onNotificationTapped,
    autoIncrementBadge = true, autoProcessDeepLink = true,
    onDeepLink, refreshUnreadCount, setBadgeCount, setUnreadCount,
  } = options;

  const [lastNotification, setLastNotification] = useState<Notifications.Notification | null>(null);
  const [lastNotificationResponse, setLastNotificationResponse] = useState<Notifications.NotificationResponse | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setLastNotification(notification);
      const payloadUnreadCount = getNotificationUnreadCount(notification);
      if (payloadUnreadCount !== null) {
        setUnreadCount?.(payloadUnreadCount);
        if (autoIncrementBadge) {
          setNativeBadgeCount(payloadUnreadCount).then(() => setBadgeCount?.(payloadUnreadCount));
        }
      } else if (autoIncrementBadge) {
        incrementBadgeCount().then(() => getBadgeCount().then((c) => setBadgeCount?.(c)));
      }
      void refreshUnreadCount?.();
      onNotificationReceived?.(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      setLastNotificationResponse(response);
      const notificationData = (response.notification.request.content.data as NotificationData) || null;
      if (autoProcessDeepLink && notificationData) {
        if (onDeepLink) onDeepLink(notificationData);
        else if (navigationRef) handleDeepLink(notificationData, navigationRef);
      }
      onNotificationTapped?.(response);
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [
    autoIncrementBadge, autoProcessDeepLink, onNotificationReceived,
    onNotificationTapped, onDeepLink, navigationRef,
    refreshUnreadCount, setBadgeCount, setUnreadCount,
  ]);

  return { lastNotification, lastNotificationResponse };
};
