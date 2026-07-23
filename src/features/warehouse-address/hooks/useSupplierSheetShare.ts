import { useCallback, useRef, useState } from 'react';
import { Alert, Linking } from 'react-native';
import * as Sharing from 'expo-sharing';
import { showMessage } from 'react-native-flash-message';
import {
  downloadShippingMarkToCache,
  MediaLibraryPermissionError,
  saveLocalImageToGallery,
} from '@src/shared/lib/shippingMarkShare';
import { fetchSupplierSheetUrl } from '../api/warehouseAddressApi';
import type { WarehouseMode } from '../types';

type CaptureLocalSheet = (mode: WarehouseMode) => Promise<string>;

export const useSupplierSheetShare = (captureLocalSheet: CaptureLocalSheet) => {
  const [sharingMode, setSharingMode] = useState<WarehouseMode | null>(null);
  const [savingMode, setSavingMode] = useState<WarehouseMode | null>(null);
  const sharingLock = useRef(false);
  const savingLock = useRef(false);

  const prepareFile = useCallback(async (mode: WarehouseMode) => {
    try {
      const url = await fetchSupplierSheetUrl(mode);
      return await downloadShippingMarkToCache(url, `fiche-fournisseur-${mode}.png`);
    } catch {
      return captureLocalSheet(mode);
    }
  }, [captureLocalSheet]);

  const share = useCallback(async (mode: WarehouseMode) => {
    if (sharingLock.current) return;
    sharingLock.current = true;
    setSharingMode(mode);
    try {
      const fileUri = await prepareFile(mode);
      if (!(await Sharing.isAvailableAsync())) throw new Error("Le partage n'est pas disponible sur cet appareil.");
      await Sharing.shareAsync(fileUri, {
        mimeType: 'image/png',
        UTI: 'public.png',
        dialogTitle: 'Partager la fiche fournisseur',
      });
    } catch (error) {
      Alert.alert('Partage impossible', error instanceof Error ? error.message : 'Veuillez réessayer.');
    } finally {
      sharingLock.current = false;
      setSharingMode(null);
    }
  }, [prepareFile]);

  const save = useCallback(async (mode: WarehouseMode) => {
    if (savingLock.current) return;
    savingLock.current = true;
    setSavingMode(mode);
    try {
      await saveLocalImageToGallery(await prepareFile(mode));
      showMessage({ message: 'Image enregistrée', description: 'La fiche est maintenant dans votre galerie.', type: 'success' });
    } catch (error) {
      if (error instanceof MediaLibraryPermissionError) {
        const actions = error.canAskAgain
          ? [{ text: 'OK' }]
          : [{ text: 'Annuler', style: 'cancel' as const }, { text: 'Ouvrir les réglages', onPress: () => void Linking.openSettings() }];
        Alert.alert('Autoriser l’enregistrement', 'Activez l’accès aux photos pour enregistrer cette fiche.', actions);
      } else {
        Alert.alert('Enregistrement impossible', error instanceof Error ? error.message : 'Veuillez réessayer.');
      }
    } finally {
      savingLock.current = false;
      setSavingMode(null);
    }
  }, [prepareFile]);

  return { share, save, sharingMode, savingMode };
};
