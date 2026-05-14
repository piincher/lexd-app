/**
 * Notification Deep Link Utilities
 * Handles navigation from push notification taps
 */

import { CommonActions } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import type { NavigationContainerRef } from "@react-navigation/native";
import type { RootStackParamList } from "@src/navigations/type";
import { NotificationData, handleNotificationResponse } from "@src/services/pushNotificationService";
import { parseDeepLink } from "@src/shared/lib/parseDeepLink";

export const getNotificationUnreadCount = (
  notification: Notifications.Notification
): number | null => {
  const content = notification.request.content;
  const data = content.data as NotificationData | undefined;
  const contentBadge = (content as { badge?: unknown }).badge;

  return normalizeNotificationCount(
    data?.unreadCount ?? data?.badge ?? contentBadge
  );
};

const normalizeNotificationCount = (value: unknown): number | null => {
  const count = Number(value);
  if (!Number.isFinite(count) || count < 0) {
    return null;
  }
  return Math.floor(count);
};

export const handleDeepLink = (
  data: NotificationData,
  navigationRef: NavigationContainerRef<RootStackParamList>
): boolean => {
  // If deepLink URL is present, parse and navigate directly
  if (data?.deepLink && typeof data.deepLink === "string") {
    const parsed = parseDeepLink(data.deepLink);
    if (parsed) {
      console.log("[NotificationDeepLink] Navigating via deepLink:", data.deepLink);
      navigationRef.dispatch(CommonActions.navigate({
        name: parsed.screen,
        params: parsed.params,
      }));
      return true;
    }
  }

  if (!data?.screen) return false;

  const { screen, containerId, goodsId, ticketId, orderId } = data;

  switch (screen) {
    case "ContainerDetail":
    case "ContainerTracking":
      if (containerId) {
        navigationRef.dispatch(CommonActions.navigate({
          name: "ContainerTracking",
          params: { containerId },
        }));
        return true;
      }
      return false;
    case "GoodsDetail":
      if (goodsId) {
        navigationRef.dispatch(CommonActions.navigate({ name: "GoodsDetail", params: { goodsId } }));
        return true;
      }
      return false;
    case "TicketDetail":
      if (ticketId) {
        navigationRef.dispatch(CommonActions.navigate({ name: "TicketDetail", params: { ticketId } }));
        return true;
      }
      return false;
    case "AdminTicketDetail":
      if (ticketId) {
        navigationRef.dispatch(CommonActions.navigate({
          name: "AdminTicketDetail",
          params: { ticketId },
        }));
        return true;
      }
      return false;
    case "AdminTicketList":
      navigationRef.dispatch(CommonActions.navigate({ name: "AdminTicketList" }));
      return true;
    case "OrderDetail":
      if (orderId) {
        navigationRef.dispatch(CommonActions.navigate({ name: "OrderDetail", params: { id: orderId } }));
        return true;
      }
      return false;
    case "Payments":
      navigationRef.dispatch(CommonActions.navigate({ name: "MyPaymentHistory" }));
      return true;
    case "AirwayBillTracking":
      navigationRef.dispatch(CommonActions.navigate({
        name: "AirwayBillTracking",
        params: data.airwayBillId ? { airwayBillId: String(data.airwayBillId) } : undefined,
      }));
      return true;
    case "CargoBagDetail":
      navigationRef.dispatch(CommonActions.navigate({
        name: "CargoBagDetail",
        params: data.cargoBagId && data.airwayBillId
          ? { cargoBagId: String(data.cargoBagId), airwayBillId: String(data.airwayBillId) }
          : undefined,
      }));
      return true;
    case "MyReviews":
      navigationRef.dispatch(CommonActions.navigate({ name: "MyReviews" }));
      return true;
    case "Home":
    default:
      navigationRef.dispatch(CommonActions.navigate({
        name: "HomeTab",
        params: { screen: "Home" },
      }));
      return true;
  }
};

export { handleNotificationResponse };
