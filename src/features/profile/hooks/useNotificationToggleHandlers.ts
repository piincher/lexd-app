import { useCallback } from "react";
import { Alert } from "react-native";
import { NotificationType, NotificationPreference, requestPermissions } from "@src/shared/services/notificationService";
import { QuietHours, updatePreferencesOptimistically, rollbackPreference } from "./notificationSettingsHelpers";

export const useNotificationToggleHandlers = (
  setMasterEnabled: (value: boolean) => void,
  setPermissionStatus: (status: string | null) => void,
  setPreferences: React.Dispatch<React.SetStateAction<NotificationPreference[]>>,
  setQuietHours: React.Dispatch<React.SetStateAction<QuietHours>>,
  updatePreference: (type: NotificationType, value: boolean) => Promise<boolean>,
  openDeviceSettings: () => void
) => {
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
  }, [setMasterEnabled, setPermissionStatus, openDeviceSettings]);

  const handlePreferenceToggle = useCallback(async (type: NotificationType, value: boolean) => {
    setPreferences((prev) => updatePreferencesOptimistically(prev, type, value));
    const success = await updatePreference(type, value);
    if (!success) {
      setPreferences((prev) => rollbackPreference(prev, type, value));
    }
  }, [updatePreference, setPreferences]);

  const handleQuietHoursToggle = useCallback((value: boolean) => {
    setQuietHours((prev) => ({ ...prev, enabled: value }));
  }, [setQuietHours]);

  const updateQuietHours = useCallback((startTime: string, endTime: string) => {
    setQuietHours((prev) => ({ ...prev, startTime, endTime }));
  }, [setQuietHours]);

  return { handleMasterToggle, handlePreferenceToggle, handleQuietHoursToggle, updateQuietHours };
};
