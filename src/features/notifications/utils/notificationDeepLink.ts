/**
 * Notification Deep Link Utilities
 * Handles navigation from push notification taps
 */

import { CommonActions } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import type { NavigationContainerRef } from "@react-navigation/native";
import type { RootStackParamList } from "@src/navigations/type";
import { NotificationData, handleNotificationResponse } from "@src/services/pushNotificationService";

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
): void => {
  if (!data?.screen) return;

  const { screen, containerId, goodsId, ticketId, orderId } = data;

  switch (screen) {
    case "ContainerDetail":
    case "ContainerTracking":
      if (containerId) {
        navigationRef.dispatch(CommonActions.navigate({
          name: "ContainerTracking",
          params: { containerId },
        }));
      }
      break;
    case "GoodsDetail":
      if (goodsId) {
        navigationRef.dispatch(CommonActions.navigate({ name: "GoodsDetail", params: { goodsId } }));
      }
      break;
    case "TicketDetail":
      if (ticketId) {
        navigationRef.dispatch(CommonActions.navigate({ name: "TicketDetail", params: { ticketId } }));
      }
      break;
    case "AdminTicketDetail":
      if (ticketId) {
        navigationRef.dispatch(CommonActions.navigate({
          name: "AdminTicketDetail",
          params: { ticketId },
        }));
      }
      break;
    case "AdminTicketList":
      navigationRef.dispatch(CommonActions.navigate({ name: "AdminTicketList" }));
      break;
    case "OrderDetail":
      if (orderId) {
        navigationRef.dispatch(CommonActions.navigate({ name: "OrderDetail", params: { id: orderId } }));
      }
      break;
    case "Payments":
      navigationRef.dispatch(CommonActions.navigate({ name: "MyPaymentHistory" }));
      break;
    case "Home":
    default:
      navigationRef.dispatch(CommonActions.navigate({
        name: "HomeTab",
        params: { screen: "Home" },
      }));
      break;
  }
};

export { handleNotificationResponse };
