import { useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { AppState } from "react-native";
import {
  NotificationPermissionStatus,
  NotificationPreference,
} from "../../../shared/services/notificationService";

export const useNotificationState = () => {
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermissionStatus>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [badgeCount, setBadgeCountState] = useState(0);
  const [preferences, setPreferences] = useState<NotificationPreference[]>([]);
  const [lastNotification, setLastNotification] = useState<Notifications.Notification | null>(null);
  const [lastNotificationResponse, setLastNotificationResponse] = useState<Notifications.NotificationResponse | null>(null);
  const [wasOpenedFromNotification, setWasOpenedFromNotification] = useState(false);

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const appState = useRef(AppState.currentState);
  const hasAttemptedRegistration = useRef(false);

  return {
    pushToken, setPushToken,
    permissionStatus, setPermissionStatus,
    isRegistered, setIsRegistered,
    isLoading, setIsLoading,
    error, setError,
    badgeCount, setBadgeCountState,
    preferences, setPreferences,
    lastNotification, setLastNotification,
    lastNotificationResponse, setLastNotificationResponse,
    wasOpenedFromNotification, setWasOpenedFromNotification,
    notificationListener, responseListener, appState, hasAttemptedRegistration,
    isEnabled: permissionStatus === "granted",
  };
};
