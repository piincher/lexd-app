import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import {
  NotificationPreference,
  NotificationType,
  defaultNotificationPreferences,
  updateNotificationPreferences,
} from '@src/shared/services';
import { getNotificationIcon } from './getNotificationIcon';
import { getNotificationColor } from './getNotificationColor';

export const useNotificationPreferences = (colors: any) => {
  const [preferences, setPreferences] = useState<NotificationPreference[]>(defaultNotificationPreferences);

  const handlePreferenceToggle = useCallback(async (type: NotificationType, value: boolean) => {
    setPreferences((prev) => prev.map((pref) => (pref.type === type ? { ...pref, enabled: value } : pref)));

    try {
      const success = await updateNotificationPreferences({ [type]: value });
      if (!success) {
        setPreferences((prev) => prev.map((pref) => (pref.type === type ? { ...pref, enabled: !value } : pref)));
        Alert.alert('Erreur', 'Echec de la mise a jour de la preference. Veuillez reessayer.');
      }
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  }, []);

  const getIconForType = useCallback((type: NotificationType) => getNotificationIcon(type), []);
  const getColorForType = useCallback((type: NotificationType) => getNotificationColor(type, colors), [colors]);

  return { preferences, handlePreferenceToggle, getIconForType, getColorForType };
};
