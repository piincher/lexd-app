import { useAuth } from "@src/store/Auth";
import type { NotificationContextValue } from "../types";
import { useNotificationState } from "./useNotificationState";
import { useNotificationActions } from "./useNotificationActions";
import { useNotificationEffects } from "./useNotificationEffects";

export const useNotificationProvider = (
  autoRegister: boolean,
  autoRequestPermission: boolean,
): Omit<NotificationContextValue, "isEnabled"> & { isEnabled: boolean } => {
  const authToken = useAuth((state) => state.token);
  const state = useNotificationState();
  const actions = useNotificationActions(state);
  useNotificationEffects(state, actions, autoRegister, autoRequestPermission, authToken);

  return {
    pushToken: state.pushToken,
    permissionStatus: state.permissionStatus,
    isEnabled: state.isEnabled,
    isRegistered: state.isRegistered,
    isLoading: state.isLoading,
    error: state.error,
    badgeCount: state.badgeCount,
    preferences: state.preferences,
    requestPermission: actions.requestPermission,
    registerDevice: actions.registerDevice,
    unregisterDevice: actions.unregisterDevice,
    updatePreferences: actions.updatePreferences,
    clearBadge: actions.clearBadge,
    scheduleLocal: actions.scheduleLocal,
    lastNotification: state.lastNotification,
    lastNotificationResponse: state.lastNotificationResponse,
    wasOpenedFromNotification: state.wasOpenedFromNotification,
  };
};
