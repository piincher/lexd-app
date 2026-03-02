/**
 * usePushNotifications Hook
 * Comprehensive hook for push notification management
 */

import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import {
  getBadgeCount,
  getPermissionsStatus,
  getPushToken,
  incrementBadgeCount,
  NotificationData,
  NotificationPermissionStatus,
  NotificationType,
  registerDevice,
  requestPermissions,
  unregisterDevice,
} from "../services/notificationService";
import {
  processNotificationData,
  setNotificationNavigationRef,
} from "../notifications/notificationHandlers";
import { NavigationContainerRef } from "@react-navigation/native";

// ============================================================================
// Types
// ============================================================================

export interface UsePushNotificationsReturn {
  /** Current push token */
  token: string | null;
  /** Current permission status */
  permissionStatus: NotificationPermissionStatus;
  /** Whether device is registered with backend */
  isRegistered: boolean;
  /** Whether notifications are enabled */
  isEnabled: boolean;
  /** Whether the hook is loading */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
  /** Request notification permissions */
  requestPermission: () => Promise<boolean>;
  /** Register device with backend */
  register: () => Promise<boolean>;
  /** Unregister device from backend */
  unregister: () => Promise<boolean>;
  /** Refresh the push token */
  refreshToken: () => Promise<string | null>;
  /** Current badge count */
  badgeCount: number;
  /** Last received notification */
  lastNotification: Notifications.Notification | null;
  /** Last notification response (tap) */
  lastNotificationResponse: Notifications.NotificationResponse | null;
}

export interface UsePushNotificationsOptions {
  /** Whether to auto-register on mount */
  autoRegister?: boolean;
  /** Navigation ref for deep linking */
  navigationRef?: NavigationContainerRef<any> | null;
  /** Callback when notification is received (foreground) */
  onNotificationReceived?: (notification: Notifications.Notification) => void;
  /** Callback when notification is tapped */
  onNotificationTapped?: (response: Notifications.NotificationResponse) => void;
  /** Whether to auto-increment badge on notification */
  autoIncrementBadge?: boolean;
  /** Whether to process deep links automatically */
  autoProcessDeepLink?: boolean;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export const usePushNotifications = (
  options: UsePushNotificationsOptions = {}
): UsePushNotificationsReturn => {
  const {
    autoRegister = true,
    navigationRef,
    onNotificationReceived,
    onNotificationTapped,
    autoIncrementBadge = true,
    autoProcessDeepLink = true,
  } = options;

  // State
  const [token, setToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermissionStatus>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [badgeCount, setBadgeCount] = useState(0);
  const [lastNotification, setLastNotification] =
    useState<Notifications.Notification | null>(null);
  const [lastNotificationResponse, setLastNotificationResponse] =
    useState<Notifications.NotificationResponse | null>(null);

  // Refs for listeners
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  // ============================================================================
  // Initialization
  // ============================================================================

  // Set navigation ref for deep linking
  useEffect(() => {
    if (navigationRef) {
      setNotificationNavigationRef(navigationRef);
    }
  }, [navigationRef]);

  // Initial load
  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get current permission status
        const status = await getPermissionsStatus();
        setPermissionStatus(status);

        // Get badge count
        const count = await getBadgeCount();
        setBadgeCount(count);

        // If permissions granted, get token
        if (status === "granted") {
          const pushToken = await getPushToken();
          setToken(pushToken);

          // Auto-register if enabled
          if (autoRegister && pushToken) {
            const registered = await registerDevice(pushToken);
            setIsRegistered(registered);
          }
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("[usePushNotifications] Initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [autoRegister]);

  // ============================================================================
  // Listeners
  // ============================================================================

  useEffect(() => {
    // Listen for incoming notifications (foreground)
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("[usePushNotifications] Notification received:", notification);

        setLastNotification(notification);

        // Increment badge count
        if (autoIncrementBadge) {
          incrementBadgeCount().then(() => {
            getBadgeCount().then(setBadgeCount);
          });
        }

        // Call custom handler if provided
        onNotificationReceived?.(notification);
      }
    );

    // Listen for notification taps (background/foreground)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("[usePushNotifications] Notification tapped:", response);

        setLastNotificationResponse(response);

        // Get notification data
        const data = response.notification.request.content
          .data as NotificationData;

        // Process deep link automatically
        if (autoProcessDeepLink && data?.type) {
          processNotificationData(data);
        }

        // Call custom handler if provided
        onNotificationTapped?.(response);
      }
    );

    // Cleanup
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [
    autoIncrementBadge,
    autoProcessDeepLink,
    onNotificationReceived,
    onNotificationTapped,
  ]);

  // ============================================================================
  // Actions
  // ============================================================================

  /**
   * Request notification permissions
   */
  const requestPermission = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const status = await requestPermissions();
      setPermissionStatus(status);

      if (status === "granted") {
        // Get token after permission granted
        const pushToken = await getPushToken();
        setToken(pushToken);
        return true;
      }

      return false;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("[usePushNotifications] Permission request error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register device with backend
   */
  const register = async (): Promise<boolean> => {
    if (!token) {
      setError("No push token available");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const success = await registerDevice(token);
      setIsRegistered(success);
      return success;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("[usePushNotifications] Registration error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Unregister device from backend
   */
  const unregister = async (): Promise<boolean> => {
    if (!token) {
      setError("No push token available");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const success = await unregisterDevice(token);
      if (success) {
        setIsRegistered(false);
      }
      return success;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("[usePushNotifications] Unregistration error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refresh the push token
   */
  const refreshToken = async (): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const newToken = await getPushToken();
      setToken(newToken);

      // Re-register with new token if previously registered
      if (isRegistered && newToken) {
        await registerDevice(newToken);
      }

      return newToken;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("[usePushNotifications] Token refresh error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================================
  // Derived State
  // ============================================================================

  const isEnabled = permissionStatus === "granted";

  // ============================================================================
  // Return
  // ============================================================================

  return {
    token,
    permissionStatus,
    isRegistered,
    isEnabled,
    isLoading,
    error,
    requestPermission,
    register,
    unregister,
    refreshToken,
    badgeCount,
    lastNotification,
    lastNotificationResponse,
  };
};

export default usePushNotifications;
