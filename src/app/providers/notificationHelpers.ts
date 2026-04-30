import * as Notifications from "expo-notifications";
import { NotificationData } from "../../shared/services/notificationService";

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

export const normalizeNotificationCount = (value: unknown): number | null => {
  const count = Number(value);
  if (!Number.isFinite(count) || count < 0) {
    return null;
  }
  return Math.floor(count);
};
