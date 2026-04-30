import { useState, useCallback } from 'react';
import { Linking } from 'react-native';
import { WAVE_STORE_URL } from './waveConstants';

interface UseWavePaymentFormProps {
  deepLink?: string;
  onOpenWaveApp?: () => void;
}

interface UseWavePaymentFormReturn {
  showQrCode: boolean;
  setShowQrCode: (value: boolean) => void;
  imageError: boolean;
  setImageError: (value: boolean) => void;
  handleOpenWaveApp: () => Promise<void>;
}

export const useWavePaymentForm = ({
  deepLink,
  onOpenWaveApp,
}: UseWavePaymentFormProps): UseWavePaymentFormReturn => {
  const [showQrCode, setShowQrCode] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleOpenWaveApp = useCallback(async () => {
    if (onOpenWaveApp) {
      onOpenWaveApp();
      return;
    }

    if (deepLink) {
      try {
        const supported = await Linking.canOpenURL(deepLink);
        if (supported) {
          await Linking.openURL(deepLink);
        } else {
          await Linking.openURL(WAVE_STORE_URL);
        }
      } catch (error) {
        console.error('Failed to open Wave app:', error);
      }
    }
  }, [deepLink, onOpenWaveApp]);

  return {
    showQrCode,
    setShowQrCode,
    imageError,
    setImageError,
    handleOpenWaveApp,
  };
};
