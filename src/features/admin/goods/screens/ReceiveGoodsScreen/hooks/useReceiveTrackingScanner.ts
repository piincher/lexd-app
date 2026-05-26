import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Camera, type BarcodeScanningResult } from 'expo-camera';
import { hapticError, hapticLight, hapticSuccess } from '@src/shared/lib/haptics';
import { getGallerySupportedCodeLabel, pickGalleryTrackingCode } from './trackingScannerGallery';

type TrackingChangeHandler = (value: string) => void;

export const useReceiveTrackingScanner = () => {
  const [visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isPickingFromGallery, setIsPickingFromGallery] = useState(false);
  const lockRef = useRef(false);

  useEffect(() => {
    if (!visible || hasPermission !== null) return;
    Camera.requestCameraPermissionsAsync()
      .then(({ status }) => setHasPermission(status === 'granted'))
      .catch(() => setHasPermission(false));
  }, [hasPermission, visible]);

  const openScanner = useCallback(() => {
    hapticLight();
    setVisible(true);
    lockRef.current = false;
    setIsLocked(false);
  }, []);

  const closeScanner = useCallback(() => {
    setVisible(false);
    lockRef.current = false;
    setIsLocked(false);
  }, []);

  const applyScannedValue = useCallback((rawValue: string, onChange: TrackingChangeHandler) => {
    const trackingNumber = rawValue.trim();
    if (!trackingNumber) return;
    onChange(trackingNumber);
    hapticSuccess();
    closeScanner();
  }, [closeScanner]);

  const handleBarcodeScanned = useCallback((
    result: BarcodeScanningResult,
    onChange: TrackingChangeHandler
  ) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setIsLocked(true);
    applyScannedValue(result.data, onChange);
  }, [applyScannedValue]);

  const pickFromGallery = useCallback(async (onChange: TrackingChangeHandler) => {
    if (isPickingFromGallery) return;
    setIsPickingFromGallery(true);
    hapticLight();

    try {
      const result = await pickGalleryTrackingCode();
      if (result.status === 'success') applyScannedValue(result.data, onChange);
      if (result.status === 'permission-denied') {
        hapticError();
        Alert.alert('Permission requise', 'Autorisez la galerie pour lire un QR code ou code-barres.');
      }
      if (result.status === 'not-found') {
        hapticError();
        Alert.alert(
          'Code introuvable',
          `Aucun ${getGallerySupportedCodeLabel()} lisible détecté dans cette image.`
        );
      }
      if (result.status === 'error') throw new Error('gallery-scan-failed');
    } catch {
      hapticError();
      Alert.alert(
        'Lecture impossible',
        "Impossible de lire le code dans cette image. Essayez une image plus nette et bien cadrée."
      );
    } finally {
      setIsPickingFromGallery(false);
    }
  }, [applyScannedValue, isPickingFromGallery]);

  return {
    visible,
    hasPermission,
    isLocked,
    isPickingFromGallery,
    openScanner,
    closeScanner,
    handleBarcodeScanned,
    pickFromGallery,
  };
};
