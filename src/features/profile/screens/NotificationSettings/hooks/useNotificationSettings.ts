import { useState, useEffect, useCallback } from 'react';
import { Alert, Platform, Linking } from 'react-native';
import {
  NotificationPreference,
  defaultNotificationPreferences,
  updateNotificationPreferences,
  requestPermissions,
  getPermissionsStatus,
  NotificationType,
} from '@src/shared/services';

export interface QuietHours {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export const useNotificationSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [masterEnabled, setMasterEnabled] = useState(true);
  const [preferences, setPreferences] = useState<NotificationPreference[]>(
    defaultNotificationPreferences
  );
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);
  const [quietHours, setQuietHours] = useState<QuietHours>({
    enabled: false,
    startTime: '22:00',
    endTime: '08:00',
  });
  const [showQuietHoursDialog, setShowQuietHoursDialog] = useState(false);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const status = await getPermissionsStatus();
      setPermissionStatus(status);
      setMasterEnabled(status === 'granted');
    } catch (error) {
      console.error('Error loading notification settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const openSettings = useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  }, []);

  const handleMasterToggle = useCallback(async (value: boolean) => {
    if (value) {
      const status = await requestPermissions();
      if (status === 'granted') {
        setMasterEnabled(true);
        setPermissionStatus('granted');
      } else {
        Alert.alert(
          'Permission Required',
          'Please enable notifications in your device settings to receive updates.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: openSettings },
          ]
        );
      }
    } else {
      setMasterEnabled(false);
    }
  }, [openSettings]);

  const handlePreferenceToggle = useCallback(async (type: NotificationType, value: boolean) => {
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
        Alert.alert('Error', 'Failed to update preference. Please try again.');
      }
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  }, []);

  const handleQuietHoursToggle = useCallback((value: boolean) => {
    setQuietHours((prev) => ({ ...prev, enabled: value }));
  }, []);

  const getIconForType = useCallback((type: NotificationType): string => {
    const iconMap: Record<NotificationType, string> = {
      ORDER_UPDATE: 'package',
      PAYMENT: 'credit-card',
      CONTAINER_STATUS: 'cube',
      TICKET_REPLY: 'message-circle',
      INVOICE: 'file-text',
      GENERAL: 'bell',
      SYSTEM: 'settings',
    };
    return iconMap[type] || 'bell';
  }, []);

  const getColorForType = useCallback((type: NotificationType): string => {
    const colorMap: Record<NotificationType, string> = {
      ORDER_UPDATE: '#3B82F6',
      PAYMENT: '#10B981',
      CONTAINER_STATUS: '#3B82F6',
      TICKET_REPLY: '#F59E0B',
      INVOICE: '#EF4444',
      GENERAL: '#6B7280',
      SYSTEM: '#8B5CF6',
    };
    return colorMap[type] || '#3B82F6';
  }, []);

  return {
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
    openSettings,
    getIconForType,
    getColorForType,
  };
};
