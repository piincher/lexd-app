import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { AppState } from "react-native";
import { navigationRef } from "@src/navigations/navigationRef";
import { registerCertificateNotificationHandler } from "@src/features/profile/notifications/certificateHandler";
import { getBadgeCount, incrementBadgeCount, initializeNotifications, setupNotificationChannels } from "../../../shared/services/notificationService";
import { setNotificationNavigationRef } from "../../../shared/notifications/notificationHandlers";
import { setupNotificationCategories } from "../../../shared/notifications/notificationCategories";
import apiClient from "../../../api/client";
import { Platform } from "react-native";
import { getNotificationUnreadCount } from "../notificationHelpers";
import type { useNotificationState } from "./useNotificationState";
import type { useNotificationActions } from "./useNotificationActions";
import { useNotificationBadgeQueries } from "./useNotificationBadgeQueries";

type State = ReturnType<typeof useNotificationState>;
type Actions = ReturnType<typeof useNotificationActions>;

export const useNotificationEffects = (
  state: State, actions: Actions, autoRegister: boolean, autoRequestPermission: boolean, authToken: string | null,
) => {
  const badge = useNotificationBadgeQueries(state);

  useEffect(() => { setNotificationNavigationRef(navigationRef); }, []);
  useEffect(() => { registerCertificateNotificationHandler(); }, []);

  useEffect(() => {
    const initialize = async () => {
      state.setIsLoading(true);
      try {
        initializeNotifications(); await setupNotificationChannels(); await setupNotificationCategories();
        const { status } = await Notifications.getPermissionsAsync();
        state.setPermissionStatus(status as any);
        state.setBadgeCountState(await getBadgeCount());
        const lastResponse = await Notifications.getLastNotificationResponse();
        if (lastResponse) { state.setWasOpenedFromNotification(true); actions.handleNotificationResponse(lastResponse); }
        if (autoRequestPermission && status !== "granted") await actions.requestPermission();
      } catch (err) { state.setError(err instanceof Error ? err.message : "Failed to initialize notifications"); }
      finally { state.setIsLoading(false); }
    };
    initialize();
    // Note: listener cleanup is handled by the dedicated listener useEffect below
  }, [autoRequestPermission, actions.handleNotificationResponse, actions.requestPermission]);

  useEffect(() => {
    if (authToken && authToken.trim() !== "" && state.permissionStatus === "granted" && autoRegister && !state.isRegistered) {
      state.hasAttemptedRegistration.current = false;
    }
  }, [authToken, state.permissionStatus, autoRegister, state.isRegistered]);

  useEffect(() => {
    const getTokenAndRegister = async () => {
      if (state.permissionStatus === "granted" && autoRegister && !state.isRegistered && !state.hasAttemptedRegistration.current) {
        state.hasAttemptedRegistration.current = true;
        if (!authToken || authToken.trim() === "") return;
        try {
          const token = (await Notifications.getExpoPushTokenAsync({ projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID || "e4e59c47-9dfe-4dff-8b6d-7cf9a102486d" })).data;
          state.setPushToken(token);
          try { await apiClient.post("/user/me/device-token", { token, platform: Platform.OS }); state.setIsRegistered(true); }
          catch { state.hasAttemptedRegistration.current = false; }
        } catch { state.hasAttemptedRegistration.current = false; }
      }
    };
    getTokenAndRegister();
  }, [state.permissionStatus, autoRegister, state.isRegistered, authToken]);

  useEffect(() => {
    state.notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      state.setLastNotification(notification);
      const unreadCount = getNotificationUnreadCount(notification);
      if (unreadCount !== null) { void badge.applyUnreadCount(unreadCount); }
      else { incrementBadgeCount().then(() => getBadgeCount().then(state.setBadgeCountState)); badge.incrementUnreadQueryCount(); }
      badge.refreshNotificationQueries();
    });
    state.responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      actions.handleNotificationResponse(response);
    });
    return () => { state.notificationListener.current?.remove(); state.responseListener.current?.remove(); };
  }, [actions, badge]);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: any) => {
      if (state.appState.current.match(/inactive|background/) && nextAppState === "active") {
        await badge.refreshUnreadCountFromServer();
        // Ping backend to track app open for win-back automation
        try {
          await apiClient.post("/user/me/activity", {
            type: "APP_OPEN",
            timestamp: new Date().toISOString(),
          });
        } catch (err) {
          // Silent fail - activity tracking is non-critical
        }
      }
      state.appState.current = nextAppState;
    };
    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => subscription.remove();
  }, [badge.refreshUnreadCountFromServer]);
};
