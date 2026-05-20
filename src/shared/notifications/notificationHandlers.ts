/**
 * Notification Handlers
 * Handles navigation and actions for different notification types
 */

import { CommonActions } from "@react-navigation/native";
import type { NavigationContainerRef } from "@react-navigation/native";
import { NotificationData, NotificationType } from "../services/notificationService";
import { parseDeepLink } from "../lib/parseDeepLink";
import { isAdminRequiredScreen } from "../lib/deepLinking";
import { isAdminRole } from "../lib/roles";
import { getAuthStoreRef } from "../api/authStoreRef";
import type { RootStackParamList } from "@src/navigations/type";

// ============================================================================
// Types
// ============================================================================

export type NotificationHandler = (data: NotificationData) => void;

export interface NotificationHandlersMap {
  [key: string]: NotificationHandler;
}

// Navigation ref to be set from the root navigator
let navigationRef: NavigationContainerRef<RootStackParamList> | null = null;

/**
 * Set the navigation reference for deep linking
 * @param ref Navigation container reference
 */
export const setNotificationNavigationRef = (
  ref: NavigationContainerRef<RootStackParamList> | null
): void => {
  navigationRef = ref;
};

/**
 * Get the current navigation reference
 * @returns Navigation container reference
 */
export const getNavigationRef = (): NavigationContainerRef<RootStackParamList> | null => {
  return navigationRef;
};

/**
 * Navigate to a screen with params
 * @param screenName Screen name
 * @param params Screen params
 */
const navigate = (screenName: string, params?: Record<string, unknown>): void => {
  const role = getAuthStoreRef()?.getState().user?.role;
  if (isAdminRequiredScreen(screenName) && !isAdminRole(role)) {
    console.warn("[NotificationHandlers] Blocked non-admin navigation to:", screenName);
    screenName = "CustomerDashboard";
    params = undefined;
  }

  if (navigationRef?.isReady()) {
    navigationRef.dispatch(CommonActions.navigate({ name: screenName, params }));
  } else {
    console.warn(
      "[NotificationHandlers] Navigation not ready, queuing navigation to:",
      screenName
    );
    // Queue the navigation for when the navigator is ready
    setTimeout(() => {
      if (navigationRef?.isReady()) {
        navigationRef.dispatch(CommonActions.navigate({ name: screenName, params }));
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
    navigate("OrderDetail", { id: data.orderId });
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
    navigate("MyPaymentHistory");
  } else if (data.orderId) {
    navigate("OrderDetail", { id: data.orderId });
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
    navigate("ContainerTracking", { containerId: data.containerId });
  } else if (data.orderId) {
    navigate("OrderDetail", { id: data.orderId });
  } else {
    navigate("CustomerDashboard");
  }
};

/**
 * Handle TICKET_REPLY notifications
 * Navigate to ticket detail
 */
const handleTicketReply: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling TICKET_REPLY:", data);
  const role = getAuthStoreRef()?.getState().user?.role;
  const adminRole = isAdminRole(role);

  if (data.ticketId) {
    const screen = adminRole ? "AdminTicketDetail" : "TicketDetail";
    navigate(screen, { ticketId: data.ticketId });
  } else {
    // Fallback to ticket list
    navigate(adminRole ? "AdminTicketList" : "TicketList");
  }
};

const handleTicketCreated: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling TICKET_CREATED:", data);

  if (data.ticketId) {
    const role = getAuthStoreRef()?.getState().user?.role;
    navigate(isAdminRole(role) ? "AdminTicketDetail" : "TicketDetail", { ticketId: data.ticketId });
  } else {
    const role = getAuthStoreRef()?.getState().user?.role;
    navigate(isAdminRole(role) ? "AdminTicketList" : "TicketList");
  }
};

/**
 * Handle INVOICE notifications
 * Invoice feature removed - just log
 */
const handleInvoice: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] INVOICE feature removed:", data);
};

/**
 * Handle WIN_BACK_NO_SHIPMENT_30D notifications
 * Navigate to create order screen
 */
const handleWinBackShipment: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling WIN_BACK_NO_SHIPMENT_30D:", data);
  const role = getAuthStoreRef()?.getState().user?.role;
  navigate(isAdminRole(role) ? "AdminTicketList" : "TicketList");
};

/**
 * Handle WIN_BACK_NO_APP_OPEN_14D notifications
 * Navigate to orders screen
 */
const handleWinBackInactive: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling WIN_BACK_NO_APP_OPEN_14D:", data);
  navigate("Orders");
};

/**
 * Handle WIN_BACK_GOODS_UNPAID notifications
 * Navigate to payment screen
 */
const handleWinBackPayment: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling WIN_BACK_GOODS_UNPAID:", data);
  if (data.goodsId) {
    navigate("MyPaymentHistory");
  } else {
    navigate("Orders");
  }
};

/**
 * Handle WIN_BACK_INVOICE_ABANDONED notifications
 * Navigate to invoices screen
 */
const handleWinBackInvoice: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling WIN_BACK_INVOICE_ABANDONED:", data);
  navigate("MyPaymentHistory");
};

const handleCertificateIssued: NotificationHandler = (data) => {
  console.log("[NotificationHandlers] Handling CERTIFICATE_ISSUED:", data);
  navigate("Profile");
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
  TICKET_CREATED: handleTicketCreated,
  INVOICE: handleInvoice,
  CERTIFICATE_ISSUED: handleCertificateIssued,
  GENERAL: handleGeneral,
  SYSTEM: handleSystem,
  WIN_BACK_NO_SHIPMENT_30D: handleWinBackShipment,
  WIN_BACK_NO_APP_OPEN_14D: handleWinBackInactive,
  WIN_BACK_GOODS_UNPAID: handleWinBackPayment,
  WIN_BACK_INVOICE_ABANDONED: handleWinBackInvoice,
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
        `[NotificationHandlers] Error processing notification type ${type}:`,
        error
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
 * @param data Notification data containing type and/or screen
 * @returns true if handled, false otherwise
 */
export const processNotificationData = (data: NotificationData): boolean => {
  // If deepLink is present, parse and navigate directly
  if (data.deepLink && typeof data.deepLink === "string") {
    const parsed = parseDeepLink(data.deepLink);
    if (parsed) {
      console.log("[NotificationHandlers] Navigating via deepLink:", data.deepLink);
      if (parsed.requiresAdmin && !isAdminRole(getAuthStoreRef()?.getState().user?.role)) {
        navigate("CustomerDashboard");
      } else {
        navigate(parsed.screen, parsed.params);
      }
      return true;
    }
  }

  // If type is present AND recognized, use the registered type-based handler
  if (data.type && data.type in notificationHandlers) {
    return processNotification(data.type, data);
  }

  // Fallback: if screen is specified, navigate directly
  if (data.screen && typeof data.screen === "string") {
    console.log("[NotificationHandlers] Navigating via screen field:", data.screen);
    navigate(data.screen, isRecord(data.params) ? data.params : {});
    return true;
  }

  if (data.type) {
    console.warn(`[NotificationHandlers] No handler for notification type: ${data.type}, falling back to general`);
  } else {
    console.warn("[NotificationHandlers] Notification data missing type and screen");
  }
  handleGeneral(data);
  return false;
};

// ============================================================================
// Custom Handlers Registration
// ============================================================================

const customHandlers: Map<string, NotificationHandler> = new Map();

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

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
