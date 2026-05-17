/**
 * useNotificationSettings Hook
 * Composes smaller hooks for notification settings
 */

import { useState } from "react";
import {
  NotificationType,
  NotificationPreference,
  defaultNotificationPreferences,
} from "@src/shared/services/notificationService";
import { useNotificationPermissions } from "./useNotificationPermissions";
import { useNotificationPreferencesMutation } from "./useNotificationPreferencesMutation";
import { useNotificationToggleHandlers } from "./useNotificationToggleHandlers";
import { QuietHours } from "./notificationSettingsHelpers";

export type { QuietHours };

export interface UseNotificationSettingsReturn {
  isLoading: boolean;
  masterEnabled: boolean;
  preferences: NotificationPreference[];
  permissionStatus: string | null;
  quietHours: QuietHours;
  handleMasterToggle: (value: boolean) => Promise<void>;
  handlePreferenceToggle: (type: NotificationType, value: boolean) => Promise<void>;
  handleQuietHoursToggle: (value: boolean) => void;
  updateQuietHours: (startTime: string, endTime: string) => void;
  openDeviceSettings: () => void;
}

export const useNotificationSettings = (): UseNotificationSettingsReturn => {
  const [preferences, setPreferences] = useState<NotificationPreference[]>(defaultNotificationPreferences);
  const [quietHours, setQuietHours] = useState<QuietHours>({
    enabled: false,
    startTime: "22:00",
    endTime: "08:00",
  });

  const permissions = useNotificationPermissions();
  const mutation = useNotificationPreferencesMutation();
  const toggles = useNotificationToggleHandlers(
    permissions.setMasterEnabled,
    permissions.setPermissionStatus,
    setPreferences,
    setQuietHours,
    mutation.updatePreference,
    () => {}
  );

  return {
    isLoading: permissions.isLoading,
    masterEnabled: permissions.masterEnabled,
    preferences,
    permissionStatus: permissions.permissionStatus,
    quietHours,
    handleMasterToggle: toggles.handleMasterToggle,
    handlePreferenceToggle: toggles.handlePreferenceToggle,
    handleQuietHoursToggle: toggles.handleQuietHoursToggle,
    updateQuietHours: toggles.updateQuietHours,
    openDeviceSettings: () => {},
  };
};
