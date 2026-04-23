import { useState, useEffect, useCallback } from 'react';
import { Alert, Platform, Linking } from 'react-native';
import { apiClientV2 } from '@src/api/client';
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
  const [isLoading, setIsLoading] = useState(true);
  const [masterEnabled, setMasterEnabled] = useState(false);
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
      setPermissionStatus('denied');
      setMasterEnabled(false);
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
          'Autorisation requise',
          'Veuillez activer les notifications dans les parametres de votre appareil pour recevoir les mises a jour.',
          [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Ouvrir les parametres', onPress: openSettings },
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
        Alert.alert('Erreur', 'Echec de la mise a jour de la preference. Veuillez reessayer.');
      }
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  }, []);

  const handleQuietHoursToggle = useCallback(async (value: boolean) => {
    const updated = { ...quietHours, enabled: value };
    setQuietHours(updated);
    try {
      await apiClientV2.put('/users/preferences', { quietHours: updated });
    } catch (error) {
      console.warn('Quiet hours toggle save not implemented on backend:', error);
    }
  }, [quietHours]);

  const handleQuietHoursSave = useCallback(async (startTime: string, endTime: string) => {
    const updated = { ...quietHours, startTime, endTime };
    setQuietHours(updated);
    try {
      await apiClientV2.put('/users/preferences', { quietHours: updated });
    } catch (error) {
      console.warn('Quiet hours save not implemented on backend:', error);
    }
  }, [quietHours]);

  const getIconForType = useCallback((type: NotificationType): string => {
    const iconMap: Record<NotificationType, string> = {
      ORDER_UPDATE: 'cube',
      PAYMENT: 'card',
      CONTAINER_STATUS: 'archive',
      TICKET_REPLY: 'chatbubble-ellipses',
      TICKET_CREATED: 'ticket',
      INVOICE: 'document-text',
      CERTIFICATE_ISSUED: 'trophy',
      GENERAL: 'notifications',
      SYSTEM: 'settings',
    };
    return iconMap[type] || 'notifications';
  }, []);

  const getColorForType = useCallback((type: NotificationType): string => {
    const colorMap: Record<NotificationType, string> = {
      ORDER_UPDATE: '#3B82F6',
      PAYMENT: '#10B981',
      CONTAINER_STATUS: '#3B82F6',
      TICKET_REPLY: '#F59E0B',
      TICKET_CREATED: '#F59E0B',
      INVOICE: '#EF4444',
      CERTIFICATE_ISSUED: '#F4D03F',
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
    handleQuietHoursSave,
    openSettings,
    getIconForType,
    getColorForType,
  };
};
