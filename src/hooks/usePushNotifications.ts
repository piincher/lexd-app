/**
 * usePushNotifications Hook
 * Comprehensive hook for push notification management
 * Integrates with backend Expo Push API
 */

import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import {
  getBadgeCount,
  getPermissionsStatus,
  getPushToken,
  getUnreadCount,
  NotificationData,
  NotificationPermissionStatus,
  NotificationType,
  registerDevice,
  requestPermissions,
  unregisterDevice,
  handleNotification,
  handleNotificationResponse,
  incrementBadgeCount,
  markAsRead,
  markAllAsRead,
  getNotificationHistory,
  NotificationLog,
  clearBadgeCount,
} from "@src/services/pushNotificationService";
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
  /** Unread notifications count */
  unreadCount: number;
  /** Last received notification */
  lastNotification: Notifications.Notification | null;
  /** Last notification response (tap) */
  lastNotificationResponse: Notifications.NotificationResponse | null;
  /** Notification history */
  notificationHistory: NotificationLog[];
  /** Load notification history */
  loadHistory: (page?: number) => Promise<void>;
  /** Mark notification as read */
  markNotificationAsRead: (id: string) => Promise<boolean>;
  /** Mark all notifications as read */
  markAllNotificationsAsRead: () => Promise<boolean>;
  /** Refresh unread count */
  refreshUnreadCount: () => Promise<void>;
  /** Clear badge count */
  clearBadge: () => Promise<void>;
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
  /** Deep link handler */
  onDeepLink?: (data: NotificationData) => void;
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
    onDeepLink,
  } = options;

  // State
  const [token, setToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermissionStatus>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [badgeCount, setBadgeCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastNotification, setLastNotification] =
    useState<Notifications.Notification | null>(null);
  const [lastNotificationResponse, setLastNotificationResponse] =
    useState<Notifications.NotificationResponse | null>(null);
  const [notificationHistory, setNotificationHistory] = useState<NotificationLog[]>([]);

  // Refs for listeners
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  // ============================================================================
  // Initialization
  // ============================================================================

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

        // Get unread count
        await refreshUnreadCount();

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

        // Load initial history
        await loadHistory(1);
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

        // Refresh unread count
        refreshUnreadCount();

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
        const { data } = handleNotificationResponse(response);

        // Process deep link automatically
        if (autoProcessDeepLink && data) {
          if (onDeepLink) {
            onDeepLink(data);
          } else if (navigationRef) {
            handleDeepLink(data, navigationRef);
          }
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
    onDeepLink,
    navigationRef,
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

  /**
   * Load notification history
   */
  const loadHistory = async (page = 1): Promise<void> => {
    try {
      const response = await getNotificationHistory(page, 20);
      if (page === 1) {
        setNotificationHistory(response.notifications);
      } else {
        setNotificationHistory((prev) => [...prev, ...response.notifications]);
      }
    } catch (err) {
      console.error("[usePushNotifications] Error loading history:", err);
    }
  };

  /**
   * Mark notification as read
   */
  const markNotificationAsRead = async (id: string): Promise<boolean> => {
    try {
      const success = await markAsRead(id);
      if (success) {
        setNotificationHistory((prev) =>
          prev.map((n) => (n._id === id ? { ...n, status: "READ" as const, readAt: new Date().toISOString() } : n))
        );
        await refreshUnreadCount();
      }
      return success;
    } catch (err) {
      console.error("[usePushNotifications] Error marking as read:", err);
      return false;
    }
  };

  /**
   * Mark all notifications as read
   */
  const markAllNotificationsAsRead = async (): Promise<boolean> => {
    try {
      const success = await markAllAsRead();
      if (success) {
        setNotificationHistory((prev) =>
          prev.map((n) => ({ ...n, status: "READ" as const, readAt: new Date().toISOString() }))
        );
        setUnreadCount(0);
      }
      return success;
    } catch (err) {
      console.error("[usePushNotifications] Error marking all as read:", err);
      return false;
    }
  };

  /**
   * Refresh unread count
   */
  const refreshUnreadCount = async (): Promise<void> => {
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (err) {
      console.error("[usePushNotifications] Error refreshing unread count:", err);
    }
  };

  /**
   * Clear badge count
   */
  const clearBadge = async (): Promise<void> => {
    try {
      await clearBadgeCount();
      setBadgeCount(0);
    } catch (err) {
      console.error("[usePushNotifications] Error clearing badge:", err);
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
    unreadCount,
    lastNotification,
    lastNotificationResponse,
    notificationHistory,
    loadHistory,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    refreshUnreadCount,
    clearBadge,
  };
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Handle deep link navigation based on notification data
 */
const handleDeepLink = (
  data: NotificationData,
  navigationRef: NavigationContainerRef<any>
): void => {
  if (!data?.screen) return;

  const { screen, containerId, goodsId, invoiceId, ticketId, orderId } = data;

  // Navigate based on screen type
  switch (screen) {
    case "ContainerDetail":
    case "ContainerTracking":
      if (containerId) {
        navigationRef.navigate("ContainerDetail", { containerId });
      }
      break;
    case "GoodsDetail":
      if (goodsId) {
        navigationRef.navigate("GoodsDetail", { goodsId });
      }
      break;
    // InvoiceDetail case removed - finance feature deleted
    case "TicketDetail":
      if (ticketId) {
        navigationRef.navigate("TicketDetail", { ticketId });
      }
      break;
    case "OrderDetail":
      if (orderId) {
        navigationRef.navigate("OrderDetail", { orderId });
      }
      break;
    case "Payments":
      navigationRef.navigate("Payments");
      break;
    case "Home":
    default:
      navigationRef.navigate("Home");
      break;
  }
};

export default usePushNotifications;
