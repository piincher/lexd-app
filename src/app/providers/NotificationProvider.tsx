/**
 * NotificationProvider
 * Context provider for push notification handling
 */

import * as Notifications from "expo-notifications";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import { useNavigationContainerRef } from "@react-navigation/native";

import {
  clearBadgeCount,
  getBadgeCount,
  incrementBadgeCount,
  initializeNotifications,
  NotificationData,
  NotificationPermissionStatus,
  NotificationPreference,
  NotificationType,
  requestPermissions,
  scheduleLocalNotification,
  setBadgeCount,
  setupNotificationChannels,
  updateNotificationPreferences,
} from "../../shared/services/notificationService";
import {
  processNotificationData,
  setNotificationNavigationRef,
} from "../../shared/notifications/notificationHandlers";
import { setupNotificationCategories } from "../../shared/notifications/notificationCategories";

// ============================================================================
// Types
// ============================================================================

export interface NotificationContextValue {
  /** Current push token */
  pushToken: string | null;
  /** Current permission status */
  permissionStatus: NotificationPermissionStatus;
  /** Whether notifications are enabled */
  isEnabled: boolean;
  /** Whether device is registered */
  isRegistered: boolean;
  /** Whether provider is loading */
  isLoading: boolean;
  /** Error message */
  error: string | null;
  /** Current badge count */
  badgeCount: number;
  /** User notification preferences */
  preferences: NotificationPreference[];
  /** Request notification permissions */
  requestPermission: () => Promise<boolean>;
  /** Register device with backend */
  registerDevice: () => Promise<boolean>;
  /** Unregister device from backend */
  unregisterDevice: () => Promise<boolean>;
  /** Update notification preferences */
  updatePreferences: (
    preferences: Partial<Record<NotificationType, boolean>>
  ) => Promise<boolean>;
  /** Clear badge count */
  clearBadge: () => Promise<void>;
  /** Schedule a local notification */
  scheduleLocal: (
    title: string,
    body: string,
    data: NotificationData,
    seconds: number
  ) => Promise<string | null>;
  /** Last notification received */
  lastNotification: Notifications.Notification | null;
  /** Last notification response (tap) */
  lastNotificationResponse: Notifications.NotificationResponse | null;
  /** Whether app was opened from notification */
  wasOpenedFromNotification: boolean;
}

interface NotificationProviderProps {
  children: React.ReactNode;
  /** Whether to auto-register device on mount */
  autoRegister?: boolean;
  /** Whether to auto-request permissions on mount */
  autoRequestPermission?: boolean;
  /** Whether to show alert before requesting permission */
  showPermissionAlert?: boolean;
}

// ============================================================================
// Context
// ============================================================================

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

// ============================================================================
// Provider
// ============================================================================

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  autoRegister = true,
  autoRequestPermission = false,
  showPermissionAlert = true,
}) => {
  // State
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermissionStatus>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [badgeCount, setBadgeCountState] = useState(0);
  const [preferences, setPreferences] = useState<NotificationPreference[]>([]);
  const [lastNotification, setLastNotification] =
    useState<Notifications.Notification | null>(null);
  const [lastNotificationResponse, setLastNotificationResponse] =
    useState<Notifications.NotificationResponse | null>(null);
  const [wasOpenedFromNotification, setWasOpenedFromNotification] =
    useState(false);

  // Refs
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const appState = useRef(AppState.currentState);

  // Navigation ref (will be set when navigation is ready)
  const navigationRef = useNavigationContainerRef();

  // ============================================================================
  // Initialization
  // ============================================================================

  useEffect(() => {
    // Set navigation ref for deep linking
    setNotificationNavigationRef(navigationRef);
  }, [navigationRef]);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);

      try {
        // Initialize notification service
        initializeNotifications();

        // Setup Android notification channels
        await setupNotificationChannels();

        // Setup iOS notification categories
        await setupNotificationCategories();

        // Check initial permission status
        const { status } = await Notifications.getPermissionsAsync();
        setPermissionStatus(status as NotificationPermissionStatus);

        // Get initial badge count
        const count = await getBadgeCount();
        setBadgeCountState(count);

        // Check if app was opened from notification
        const lastNotificationResponse =
          await Notifications.getLastNotificationResponseAsync();
        if (lastNotificationResponse) {
          setWasOpenedFromNotification(true);
          handleNotificationResponse(lastNotificationResponse);
        }

        // Auto-request permission if enabled
        if (autoRequestPermission && status !== "granted") {
          await requestPermission();
        }
      } catch (err) {
        console.error("[NotificationProvider] Initialization error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to initialize notifications"
        );
      } finally {
        setIsLoading(false);
      }
    };

    initialize();

    // Cleanup
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [autoRequestPermission]);

  // ============================================================================
  // Token Registration
  // ============================================================================

  useEffect(() => {
    const getTokenAndRegister = async () => {
      if (permissionStatus === "granted" && autoRegister && !isRegistered) {
        try {
          const token = (
            await Notifications.getExpoPushTokenAsync({
              projectId:
                process.env.EXPO_PUBLIC_EAS_PROJECT_ID ||
                "e4e59c47-9dfe-4dff-8b6d-7cf9a102486d",
            })
          ).data;

          setPushToken(token);

          // Register with backend
          const response = await fetch("/api/v1/users/me/device-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              platform: Platform.OS,
            }),
          });

          if (response.ok) {
            setIsRegistered(true);
          }
        } catch (err) {
          console.error("[NotificationProvider] Token registration error:", err);
        }
      }
    };

    getTokenAndRegister();
  }, [permissionStatus, autoRegister, isRegistered]);

  // ============================================================================
  // Notification Listeners
  // ============================================================================

  useEffect(() => {
    // Listen for incoming notifications (foreground)
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("[NotificationProvider] Notification received:", notification);

        setLastNotification(notification);

        // Increment badge count
        incrementBadgeCount().then(() => {
          getBadgeCount().then(setBadgeCountState);
        });
      }
    );

    // Listen for notification taps
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        handleNotificationResponse(response);
      }
    );

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  // ============================================================================
  // App State Handling
  // ============================================================================

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      // App came to foreground
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // Clear badge when app is opened
        await clearBadgeCount();
        setBadgeCountState(0);
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
    console.log("[NotificationProvider] Notification response:", response);

    setLastNotificationResponse(response);

    // Get notification data
    const data = response.notification.request.content.data as NotificationData;

    if (data) {
      // Process deep link
      processNotificationData(data);
    }
  };

  // ============================================================================
  // Actions
  // ============================================================================

  const requestPermission = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const status = await requestPermissions();
      setPermissionStatus(status);
      return status === "granted";
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const registerDevice = async (): Promise<boolean> => {
    if (!pushToken) {
      setError("No push token available");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/users/me/device-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: pushToken,
          platform: Platform.OS,
        }),
      });

      const success = response.ok;
      setIsRegistered(success);
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const unregisterDevice = async (): Promise<boolean> => {
    if (!pushToken) {
      setError("No push token available");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/v1/users/me/device-token/${pushToken}`,
        {
          method: "DELETE",
        }
      );

      const success = response.ok;
      if (success) {
        setIsRegistered(false);
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (
    newPreferences: Partial<Record<NotificationType, boolean>>
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      const success = await updateNotificationPreferences(newPreferences);

      if (success) {
        // Update local state
        setPreferences((prev) =>
          prev.map((pref) =>
            newPreferences[pref.type] !== undefined
              ? { ...pref, enabled: newPreferences[pref.type]! }
              : pref
          )
        );
      }

      return success;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearBadge = async (): Promise<void> => {
    await clearBadgeCount();
    setBadgeCountState(0);
  };

  const scheduleLocal = async (
    title: string,
    body: string,
    data: NotificationData,
    seconds: number
  ): Promise<string | null> => {
    return scheduleLocalNotification(title, body, data, { seconds });
  };

  // ============================================================================
  // Context Value
  // ============================================================================

  const value: NotificationContextValue = {
    pushToken,
    permissionStatus,
    isEnabled: permissionStatus === "granted",
    isRegistered,
    isLoading,
    error,
    badgeCount,
    preferences,
    requestPermission,
    registerDevice,
    unregisterDevice,
    updatePreferences,
    clearBadge,
    scheduleLocal,
    lastNotification,
    lastNotificationResponse,
    wasOpenedFromNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// ============================================================================
// Hook
// ============================================================================

export const useNotificationContext = (): NotificationContextValue => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }

  return context;
};

export default NotificationProvider;
