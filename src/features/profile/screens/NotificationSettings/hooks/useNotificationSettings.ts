import { useAppTheme } from '@src/providers/ThemeProvider';
import { useNotificationPermissions } from './useNotificationPermissions';
import { useNotificationPreferences } from './useNotificationPreferences';
import { useQuietHours } from './useQuietHours';

export type { QuietHours } from './useQuietHours';

export const useNotificationSettings = () => {
  const { colors } = useAppTheme();
  const permissions = useNotificationPermissions();
  const preferences = useNotificationPreferences(colors);
  const quietHours = useQuietHours();

  return {
    isLoading: permissions.isLoading,
    masterEnabled: permissions.masterEnabled,
    preferences: preferences.preferences,
    permissionStatus: permissions.permissionStatus,
    quietHours: quietHours.quietHours,
    showQuietHoursDialog: quietHours.showQuietHoursDialog,
    setShowQuietHoursDialog: quietHours.setShowQuietHoursDialog,
    handleMasterToggle: permissions.handleMasterToggle,
    handlePreferenceToggle: preferences.handlePreferenceToggle,
    handleQuietHoursToggle: quietHours.handleQuietHoursToggle,
    handleQuietHoursSave: quietHours.handleQuietHoursSave,
    openSettings: permissions.openSettings,
    getIconForType: preferences.getIconForType,
    getColorForType: preferences.getColorForType,
  };
};
