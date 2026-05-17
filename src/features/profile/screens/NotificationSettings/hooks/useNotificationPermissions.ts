import { useState, useEffect, useCallback } from 'react';
import { Alert, Platform, Linking } from 'react-native';
import {
  requestPermissions,
  getPermissionsStatus,
} from '@src/shared/services';

export const useNotificationPermissions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [masterEnabled, setMasterEnabled] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const status = await getPermissionsStatus();
      setPermissionStatus(status);
      setMasterEnabled(status === 'granted');
    } catch {
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

  return { isLoading, masterEnabled, permissionStatus, handleMasterToggle, openSettings };
};
