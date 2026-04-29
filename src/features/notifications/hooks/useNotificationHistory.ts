import { useState, useCallback, useEffect } from "react";
import {
  getNotificationHistory,
  markAsRead,
  markAllAsRead,
  NotificationLog,
} from "@src/services/pushNotificationService";

export interface UseNotificationHistoryReturn {
  notificationHistory: NotificationLog[];
  loadHistory: (page?: number) => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<boolean>;
  markAllNotificationsAsRead: () => Promise<boolean>;
}

export const useNotificationHistory = (
  refreshUnreadCount?: () => Promise<void>
): UseNotificationHistoryReturn => {
  const [notificationHistory, setNotificationHistory] = useState<NotificationLog[]>([]);

  const loadHistory = useCallback(async (page = 1): Promise<void> => {
    try {
      const response = await getNotificationHistory(page, 20);
      if (page === 1) {
        setNotificationHistory(response.notifications);
      } else {
        setNotificationHistory((prev) => [...prev, ...response.notifications]);
      }
    } catch (err) {
      console.error("[useNotificationHistory] Error loading history:", err);
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        await loadHistory(1);
      } catch (err) {
        console.error("[useNotificationHistory] Initialization error:", err);
      }
    };
    initialize();
  }, [loadHistory]);

  const markNotificationAsRead = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const success = await markAsRead(id);
        if (success) {
          setNotificationHistory((prev) =>
            prev.map((n) =>
              n._id === id
                ? { ...n, status: "READ" as const, readAt: new Date().toISOString() }
                : n
            )
          );
          await refreshUnreadCount?.();
        }
        return success;
      } catch (err) {
        console.error("[useNotificationHistory] Error marking as read:", err);
        return false;
      }
    },
    [refreshUnreadCount]
  );

  const markAllNotificationsAsRead = useCallback(async (): Promise<boolean> => {
    try {
      const success = await markAllAsRead();
      if (success) {
        setNotificationHistory((prev) =>
          prev.map((n) => ({
            ...n,
            status: "READ" as const,
            readAt: new Date().toISOString(),
          }))
        );
        await refreshUnreadCount?.();
      }
      return success;
    } catch (err) {
      console.error("[useNotificationHistory] Error marking all as read:", err);
      return false;
    }
  }, [refreshUnreadCount]);

  return {
    notificationHistory,
    loadHistory,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  };
};
