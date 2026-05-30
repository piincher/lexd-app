import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "@src/features/notifications/api";
import { notificationQueryKeys } from "@src/features/notifications/hooks";
import { useAuth } from "@src/store/Auth";
import { clearBadgeCount, setBadgeCount } from "../../../shared/services/notificationService";
import { runForegroundTask } from "../../../shared/lib/foregroundTasks";
import type { useNotificationState } from "./useNotificationState";

type State = ReturnType<typeof useNotificationState>;

export const useNotificationBadgeQueries = (state: State) => {
  const queryClient = useQueryClient();

  const updateUnreadQueryCount = useCallback((count: number) => {
    queryClient.setQueryData(notificationQueryKeys.unread(), (current: any) => ({ ...(current || {}), count, hasNew: count > 0 }));
  }, [queryClient]);

  const incrementUnreadQueryCount = useCallback(() => {
    queryClient.setQueryData(notificationQueryKeys.unread(), (current: any) => {
      const count = Math.max(0, Number(current?.count || 0) + 1);
      return { ...(current || {}), count, hasNew: count > 0 };
    });
  }, [queryClient]);

  const applyUnreadCount = useCallback(async (count: number) => {
    updateUnreadQueryCount(count); await setBadgeCount(count); state.setBadgeCountState(count);
  }, [updateUnreadQueryCount, state.setBadgeCountState]);

  const refreshUnreadCountFromServer = useCallback(async () => {
    const token = useAuth.getState().token;
    if (!token || token.trim() === "") { await clearBadgeCount(); state.setBadgeCountState(0); return; }
    try { const unreadData = await notificationApi.getUnreadCount(); await applyUnreadCount(unreadData.count); }
    catch (err) { console.error("[NotificationProvider] Error refreshing unread count:", err); }
  }, [state.setBadgeCountState, applyUnreadCount]);

  const refreshNotificationQueries = useCallback(() => {
    void runForegroundTask("notifications:query-refresh", 1000, async () => {
      await queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all });
      await refreshUnreadCountFromServer();
    });
  }, [queryClient, refreshUnreadCountFromServer]);

  return { updateUnreadQueryCount, incrementUnreadQueryCount, applyUnreadCount, refreshUnreadCountFromServer, refreshNotificationQueries };
};
