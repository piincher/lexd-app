import { useCallback } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { useAuth } from "@src/store/Auth";
import {
  requestPermissions, clearBadgeCount, updateNotificationPreferences,
  scheduleLocalNotification, NotificationData, NotificationType,
} from "../../../shared/services/notificationService";
import { processNotificationData } from "../../../shared/notifications/notificationHandlers";
import { handleDeepLink } from "../../../features/notifications/utils/notificationDeepLink";
import { navigationRef } from "@src/navigations/navigationRef";
import apiClient from "../../../api/client";
import type { useNotificationState } from "./useNotificationState";

type State = ReturnType<typeof useNotificationState>;

export const useNotificationActions = (state: State) => {
  const handleNotificationResponse = useCallback((response: Notifications.NotificationResponse) => {
    state.setLastNotificationResponse(response);
    const data = response.notification.request.content.data as NotificationData;
    if (!data) return;
    // Prefer handleDeepLink (respects data.screen / data.deepLink) for rich navigation
    if (navigationRef?.isReady()) {
      // Types differ between notificationService and pushNotificationService;
      // structurally compatible at runtime (both have [key: string]: unknown)
      const handled = handleDeepLink(data as unknown as Parameters<typeof handleDeepLink>[0], navigationRef);
      if (!handled) {
        // Fallback to legacy type-based handlers when deepLink/screen are absent
        processNotificationData(data);
      }
    } else {
      // Fallback to legacy type-based handlers when nav not ready
      processNotificationData(data);
    }
  }, [state.setLastNotificationResponse]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    state.setIsLoading(true); state.setError(null);
    try { const status = await requestPermissions(); state.setPermissionStatus(status); return status === "granted"; }
    catch (err) { const msg = err instanceof Error ? err.message : "Unknown error"; state.setError(msg); return false; }
    finally { state.setIsLoading(false); }
  }, [state.setIsLoading, state.setError, state.setPermissionStatus]);

  const registerDevice = useCallback(async (): Promise<boolean> => {
    const token = useAuth.getState().token;
    if (!token || token.trim() === "") { state.setError("User not authenticated"); return false; }
    state.setIsLoading(true); state.setError(null);
    try {
      let t = state.pushToken;
      if (!t) {
        if (state.permissionStatus !== "granted") { state.setError("Notification permission not granted"); return false; }
        t = (await Notifications.getExpoPushTokenAsync({ projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID || "e4e59c47-9dfe-4dff-8b6d-7cf9a102486d" })).data;
        state.setPushToken(t);
      }
      await apiClient.post("/user/me/device-token", { token: t, platform: Platform.OS });
      state.setIsRegistered(true); state.hasAttemptedRegistration.current = true; return true;
    } catch (err) { const msg = err instanceof Error ? err.message : "Unknown error"; state.setError(msg); return false; }
    finally { state.setIsLoading(false); }
  }, [state]);

  const unregisterDevice = useCallback(async (): Promise<boolean> => {
    if (!state.pushToken) { state.setError("No push token available"); return false; }
    state.setIsLoading(true); state.setError(null);
    try { await apiClient.delete(`/user/me/device-token/${state.pushToken}`); state.setIsRegistered(false); return true; }
    catch (err) { const msg = err instanceof Error ? err.message : "Unknown error"; state.setError(msg); return false; }
    finally { state.setIsLoading(false); }
  }, [state.pushToken, state.setError, state.setIsLoading, state.setIsRegistered]);

  const updatePreferences = useCallback(async (newPreferences: Partial<Record<NotificationType, boolean>>): Promise<boolean> => {
    state.setIsLoading(true);
    try {
      const success = await updateNotificationPreferences(newPreferences);
      if (success) { state.setPreferences((prev) => prev.map((pref) => newPreferences[pref.type] !== undefined ? { ...pref, enabled: newPreferences[pref.type]! } : pref)); }
      return success;
    } catch (err) { const msg = err instanceof Error ? err.message : "Unknown error"; state.setError(msg); return false; }
    finally { state.setIsLoading(false); }
  }, [state.setIsLoading, state.setError, state.setPreferences]);

  const clearBadge = useCallback(async () => { await clearBadgeCount(); state.setBadgeCountState(0); }, [state.setBadgeCountState]);
  const scheduleLocal = useCallback(async (title: string, body: string, data: NotificationData, seconds: number): Promise<string | null> =>
    scheduleLocalNotification(title, body, data, { seconds }), []);

  return { handleNotificationResponse, requestPermission, registerDevice, unregisterDevice, updatePreferences, clearBadge, scheduleLocal };
};
