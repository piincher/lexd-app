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
import { navigationRef } from "@src/navigations/navigationRef";

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
import apiClient from "../../api/client";
import { useAuth } from "@src/store/Auth";

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
  const hasAttemptedRegistration = useRef(false);

  // ============================================================================
  // Initialization
  // ============================================================================

  useEffect(() => {
    // Set navigation ref for deep linking (uses shared ref from navigationRef.ts)
    setNotificationNavigationRef(navigationRef);
  }, []);

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
          await Notifications.getLastNotificationResponse();
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

  // Listen for auth state changes and retry registration when user logs in
  useEffect(() => {
    const unsubscribe = useAuth.subscribe((state) => {
      const authToken = state.token;
      
      // If we have an auth token and haven't registered yet, trigger registration
      if (authToken && authToken.trim() !== '' && permissionStatus === "granted" && autoRegister && !isRegistered) {
        console.log("[NotificationProvider] Auth token detected, triggering registration...");
        hasAttemptedRegistration.current = false; // Reset to allow retry
      }
    });

    return () => unsubscribe();
  }, [permissionStatus, autoRegister, isRegistered]);

  useEffect(() => {
    const getTokenAndRegister = async () => {
      if (permissionStatus === "granted" && autoRegister && !isRegistered && !hasAttemptedRegistration.current) {
        const authToken = useAuth.getState().token;
        
        // Mark that we've attempted registration (even if no auth token)
        hasAttemptedRegistration.current = true;
        
        if (!authToken || authToken.trim() === '') {
          console.log("[NotificationProvider] No auth token yet, will retry after login...");
          return;
        }

        console.log("[NotificationProvider] Starting push token registration...");

        try {
          const token = (
            await Notifications.getExpoPushTokenAsync({
              projectId:
                process.env.EXPO_PUBLIC_EAS_PROJECT_ID ||
                "e4e59c47-9dfe-4dff-8b6d-7cf9a102486d",
            })
          ).data;

          console.log("[NotificationProvider] Got Expo push token:", token?.slice(0, 20) + "...");
          setPushToken(token);

          // Register with backend
          try {
            await apiClient.post("/user/me/device-token", {
              token,
              platform: Platform.OS,
            });
            console.log("[NotificationProvider] Successfully registered with backend!");
            setIsRegistered(true);
          } catch (apiErr) {
            console.error("[NotificationProvider] API registration failed:", apiErr);
            // Reset flag to allow retry on next auth change
            hasAttemptedRegistration.current = false;
          }
        } catch (err) {
          console.error("[NotificationProvider] Token registration error:", err);
          // Reset flag to allow retry
          hasAttemptedRegistration.current = false;
        }
      }
    };

    getTokenAndRegister();
  }, [permissionStatus, autoRegister, isRegistered, useAuth.getState().token]);

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
    const authToken = useAuth.getState().token;
    if (!authToken || authToken.trim() === '') {
      setError("User not authenticated");
      console.log("[NotificationProvider] Cannot register: no auth token");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get token if not already available
      let token = pushToken;
      if (!token) {
        if (permissionStatus !== "granted") {
          setError("Notification permission not granted");
          return false;
        }
        
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId:
              process.env.EXPO_PUBLIC_EAS_PROJECT_ID ||
              "e4e59c47-9dfe-4dff-8b6d-7cf9a102486d",
          })
        ).data;
        setPushToken(token);
      }

      console.log("[NotificationProvider] Manually registering device...");
      await apiClient.post("/user/me/device-token", {
        token,
        platform: Platform.OS,
      });
      setIsRegistered(true);
      hasAttemptedRegistration.current = true;
      console.log("[NotificationProvider] Manual registration successful!");
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("[NotificationProvider] Manual registration failed:", err);
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
      await apiClient.delete(`/user/me/device-token/${pushToken}`);
      setIsRegistered(false);
      return true;
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
