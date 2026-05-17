import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useNotificationSettings } from '../NotificationSettings/hooks/useNotificationSettings';

export const useNotificationSettingsScreen = () => {
  const navigation = useNavigation();
  const {
    isLoading,
    masterEnabled,
    preferences,
    permissionStatus,
    quietHours,
    showQuietHoursDialog,
    setShowQuietHoursDialog,
    handleMasterToggle,
    handlePreferenceToggle,
    handleQuietHoursToggle,
    handleQuietHoursSave,
    getIconForType,
    getColorForType,
  } = useNotificationSettings();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleEditQuietHours = useCallback(() => {
    setShowQuietHoursDialog(true);
  }, [setShowQuietHoursDialog]);

  const handleDismissQuietHours = useCallback(() => {
    setShowQuietHoursDialog(false);
  }, [setShowQuietHoursDialog]);

  return {
    isLoading,
    masterEnabled,
    preferences,
    permissionStatus,
    quietHours,
    showQuietHoursDialog,
    handleMasterToggle,
    handlePreferenceToggle,
    handleQuietHoursToggle,
    handleQuietHoursSave,
    getIconForType,
    getColorForType,
    handlers: {
      handleBack,
      handleEditQuietHours,
      handleDismissQuietHours,
    },
  };
};
