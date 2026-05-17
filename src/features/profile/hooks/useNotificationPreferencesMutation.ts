import { useCallback } from "react";
import { Alert } from "react-native";
import { NotificationType, updateNotificationPreferences } from "@src/shared/services/notificationService";

export const useNotificationPreferencesMutation = () => {
  const updatePreference = useCallback(async (type: NotificationType, value: boolean) => {
    try {
      const success = await updateNotificationPreferences({ [type]: value });
      if (!success) {
        Alert.alert("Error", "Failed to update preference. Please try again.");
      }
      return success;
    } catch (error) {
      console.error("Error updating preference:", error);
      return false;
    }
  }, []);

  return { updatePreference };
};
