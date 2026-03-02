/**
 * Notification Handlers
 * Handles navigation and actions for different notification types
 */

import {
  CommonActions,
  NavigationContainerRef,
} from "@react-navigation/native";
import { NotificationData, NotificationType } from "../services/notificationService";

// ============================================================================
// Types
// ============================================================================

export type NotificationHandler = (data: NotificationData) => void;

export interface NotificationHandlersMap {
  [key: string]: NotificationHandler;
}

// Navigation ref to be set from the root navigator
let navigationRef: NavigationContainerRef<any> | null = null;

/**
 * Set the navigation reference for deep linking
 * @param ref Navigation container reference
 */
export const setNotificationNavigationRef = (
  ref: NavigationContainerRef<any> | null
): void => {
  navigationRef = ref;
};

/**
 * Get the current navigation reference
 * @returns Navigation container reference
 */
export const getNavigationRef = (): NavigationContainerRef<any> | null => {
  return navigationRef;
};

/**
 * Navigate to a screen with params
 * @param screenName Screen name
 * @param params Screen params
 */
const navigate = (screenName: string, params?: Record<string, any>): void => {
  if (navigationRef?.isReady()) {
    navigationRef.navigate(screenName as never, params as never);
  } else {
    console.warn(
      "[NotificationHandlers] Navigation not ready, queuing navigation to:",
      screenName
    );
    // Queue the navigation for when the navigator is ready
    setTimeout(() => {
      if (navigationRef?.isReady()) {
        navigationRef.navigate(screenName as never, params as never);
      }
    }, 1000);
  }
};

/**
 * Reset navigation stack and navigate to a screen
 * Useful for authentication flows or deep linking
 * @param screenName Screen name
 * @param params Screen params
 */
const resetAndNavigate = (
  screenName: string,
  params?: Record<string, any>
): void => {
  if (navigationRef?.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screenName, params }],
      })
    );
  } else {
    console.warn(
      "[NotificationHandlers] Navigation not ready for reset navigation"
    );
    setTimeout(() => {
      if (navigationRef?.isReady()) {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: screenName, params }],
          })
        );
      }
    }, 1000);
  }
};

// ============================================================================
// Notification Handlers
// ============================================================================

/**
 * Handle ORDER_UPDATE notifications
 * Navigate to order detail screen
 */
const handleOrderUpdate: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling ORDER_UPDATE:", data);

  if (data.orderId) {
    navigate("OrderDetail", { orderId: data.orderId });
  } else {
    console.warn("[NotificationHandlers] No orderId in ORDER_UPDATE notification");
    // Fallback to orders list
    navigate("Orders");
  }
};

/**
 * Handle PAYMENT notifications
 * Navigate to payment confirmation or order detail
 */
const handlePayment: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling PAYMENT:", data);

  if (data.paymentId) {
    // Navigate to payment confirmation or order detail
    navigate("OrderDetail", { paymentId: data.paymentId });
  } else if (data.orderId) {
    navigate("OrderDetail", { orderId: data.orderId });
  } else {
    // Fallback to orders
    navigate("Orders");
  }
};

/**
 * Handle CONTAINER_STATUS notifications
 * Navigate to container tracking or order detail
 */
const handleContainerStatus: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling CONTAINER_STATUS:", data);

  if (data.containerId) {
    navigate("ContainerDetail", { containerId: data.containerId });
  } else if (data.orderId) {
    navigate("OrderDetail", { orderId: data.orderId });
  } else {
    // Fallback to stats/dashboard
    navigate("Stats");
  }
};

/**
 * Handle TICKET_REPLY notifications
 * Navigate to ticket detail
 */
const handleTicketReply: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling TICKET_REPLY:", data);

  if (data.ticketId) {
    navigate("TicketDetail", { ticketId: data.ticketId });
  } else {
    // Fallback to ticket list
    navigate("TicketList");
  }
};

/**
 * Handle INVOICE notifications
 * Navigate to invoice detail
 */
const handleInvoice: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling INVOICE:", data);

  if (data.invoiceId) {
    navigate("InvoiceDetail", { invoiceId: data.invoiceId });
  } else {
    // Fallback to invoice list
    navigate("Invoices");
  }
};

/**
 * Handle GENERAL notifications
 * Navigate to notifications screen or show in-app
 */
const handleGeneral: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling GENERAL:", data);

  // Navigate to notifications list
  navigate("Notifications");
};

/**
 * Handle SYSTEM notifications
 * System-level notifications (e.g., app updates, maintenance)
 */
const handleSystem: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling SYSTEM:", data);

  // System notifications may have different actions based on data
  if (data.action) {
    switch (data.action) {
      case "UPDATE_APP":
        // Could trigger an app update dialog
        console.log("[NotificationHandlers] App update available");
        break;
      case "MAINTENANCE":
        // Could show maintenance notice
        console.log("[NotificationHandlers] Maintenance scheduled");
        break;
      default:
        navigate("Notifications");
    }
  } else {
    navigate("Notifications");
  }
};

// ============================================================================
// Handler Registry
// ============================================================================

/**
 * Map of notification type to handler function
 */
export const notificationHandlers: Record<NotificationType, NotificationHandler> = {
  ORDER_UPDATE: handleOrderUpdate,
  PAYMENT: handlePayment,
  CONTAINER_STATUS: handleContainerStatus,
  TICKET_REPLY: handleTicketReply,
  INVOICE: handleInvoice,
  GENERAL: handleGeneral,
  SYSTEM: handleSystem,
};

/**
 * Process a notification by type
 * @param type Notification type
 * @param data Notification data
 * @returns true if handled, false otherwise
 */
export const processNotification = (
  type: NotificationType,
  data: NotificationData
): boolean => {
  const handler = notificationHandlers[type];

  if (handler) {
    try {
      handler(data);
      return true;
    } catch (error) {
      console.error(
        `[NotificationHandlers] Error processing notification type ${type}:",
        error`
      );
      // Fallback to general handler
      handleGeneral(data);
      return false;
    }
  } else {
    console.warn(`[NotificationHandlers] No handler for notification type: ${type}`);
    // Fallback to general handler
    handleGeneral(data);
    return false;
  }
};

/**
 * Process notification from notification data object
 * @param data Notification data containing type
 * @returns true if handled, false otherwise
 */
export const processNotificationData = (data: NotificationData): boolean => {
  if (!data.type) {
    console.warn("[NotificationHandlers] Notification data missing type");
    handleGeneral(data);
    return false;
  }

  return processNotification(data.type, data);
};

// ============================================================================
// Custom Handlers Registration
// ============================================================================

const customHandlers: Map<string, NotificationHandler> = new Map();

/**
 * Register a custom notification handler
 * @param type Notification type
 * @param handler Handler function
 */
export const registerCustomHandler = (
  type: string,
  handler: NotificationHandler
): void => {
  customHandlers.set(type, handler);
  console.log(`[NotificationHandlers] Custom handler registered for: ${type}`);
};

/**
 * Unregister a custom notification handler
 * @param type Notification type
 */
export const unregisterCustomHandler = (type: string): void => {
  customHandlers.delete(type);
  console.log(`[NotificationHandlers] Custom handler unregistered for: ${type}`);
};

/**
 * Process notification with custom handlers
 * Falls back to default handlers if no custom handler exists
 * @param type Notification type
 * @param data Notification data
 * @returns true if handled, false otherwise
 */
export const processNotificationWithCustomHandlers = (
  type: NotificationType | string,
  data: NotificationData
): boolean => {
  // Check for custom handler first
  const customHandler = customHandlers.get(type);
  if (customHandler) {
    try {
      customHandler(data);
      return true;
    } catch (error) {
      console.error(`[NotificationHandlers] Custom handler error for ${type}:`, error);
    }
  }

  // Fall back to default handlers
  if (type in notificationHandlers) {
    return processNotification(type as NotificationType, data);
  }

  // Final fallback
  handleGeneral(data);
  return false;
};
