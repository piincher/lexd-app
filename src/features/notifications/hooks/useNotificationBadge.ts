/**
 * useNotificationBadge Hook
 * Manages badge count and unread notifications count
 */

import { useState, useCallback, useEffect } from "react";
import {
  getBadgeCount,
  getUnreadCount,
  clearBadgeCount,
  setBadgeCount as setNativeBadgeCount,
} from "@src/services/pushNotificationService";

export interface UseNotificationBadgeReturn {
  badgeCount: number;
  unreadCount: number;
  setBadgeCount: (count: number) => void;
  setUnreadCount: (count: number) => void;
  refreshUnreadCount: () => Promise<void>;
  clearBadge: () => Promise<void>;
}

export const useNotificationBadge = (): UseNotificationBadgeReturn => {
  const [badgeCount, setBadgeCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = useCallback(async (): Promise<void> => {
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
      await setNativeBadgeCount(count);
      setBadgeCount(count);
    } catch (err) {
      console.error("[useNotificationBadge] Error refreshing unread count:", err);
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        const count = await getBadgeCount();
        setBadgeCount(count);
        await refreshUnreadCount();
      } catch (err) {
        console.error("[useNotificationBadge] Initialization error:", err);
      }
    };

    initialize();
  }, [refreshUnreadCount]);

  const clearBadge = useCallback(async (): Promise<void> => {
    try {
      await clearBadgeCount();
      setBadgeCount(0);
      setUnreadCount(0);
    } catch (err) {
      console.error("[useNotificationBadge] Error clearing badge:", err);
    }
  }, []);

  return { badgeCount, unreadCount, setBadgeCount, setUnreadCount, refreshUnreadCount, clearBadge };
};
