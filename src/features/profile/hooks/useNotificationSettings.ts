/**
 * useNotificationSettings Hook
 * Manages notification settings fetching and updates
 */

import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import {
  NotificationType,
  NotificationPreference,
  defaultNotificationPreferences,
  updateNotificationPreferences,
  requestPermissions,
  getPermissionsStatus,
} from "@src/shared/services/notificationService";

export type QuietHours = {
  enabled: boolean;
  startTime: string;
  endTime: string;
};

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
  const [isLoading, setIsLoading] = useState(false);
  const [masterEnabled, setMasterEnabled] = useState(true);
  const [preferences, setPreferences] = useState<NotificationPreference[]>(
    defaultNotificationPreferences
  );
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);
  const [quietHours, setQuietHours] = useState<QuietHours>({
    enabled: false,
    startTime: "22:00",
    endTime: "08:00",
  });

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const status = await getPermissionsStatus();
      setPermissionStatus(status);
      setMasterEnabled(status === "granted");
    } catch (error) {
      console.error("Error loading notification settings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const openDeviceSettings = useCallback(() => {
    // Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings();
  }, []);

  const handleMasterToggle = useCallback(async (value: boolean) => {
    if (value) {
      const status = await requestPermissions();
      if (status === "granted") {
        setMasterEnabled(true);
        setPermissionStatus("granted");
      } else {
        Alert.alert(
          "Permission Required",
          "Please enable notifications in your device settings to receive updates.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: openDeviceSettings },
          ]
        );
      }
    } else {
      setMasterEnabled(false);
    }
  }, [openDeviceSettings]);

  const handlePreferenceToggle = useCallback(async (
    type: NotificationType,
    value: boolean
  ) => {
    setPreferences((prev) =>
      prev.map((pref) => (pref.type === type ? { ...pref, enabled: value } : pref))
    );

    try {
      const success = await updateNotificationPreferences({ [type]: value });
      if (!success) {
        setPreferences((prev) =>
          prev.map((pref) =>
            pref.type === type ? { ...pref, enabled: !value } : pref
          )
        );
        Alert.alert("Error", "Failed to update preference. Please try again.");
      }
    } catch (error) {
      console.error("Error updating preference:", error);
    }
  }, []);

  const handleQuietHoursToggle = useCallback((value: boolean) => {
    setQuietHours((prev) => ({ ...prev, enabled: value }));
  }, []);

  const updateQuietHours = useCallback((startTime: string, endTime: string) => {
    setQuietHours((prev) => ({ ...prev, startTime, endTime }));
  }, []);

  return {
    isLoading,
    masterEnabled,
    preferences,
    permissionStatus,
    quietHours,
    handleMasterToggle,
    handlePreferenceToggle,
    handleQuietHoursToggle,
    updateQuietHours,
    openDeviceSettings,
  };
};
