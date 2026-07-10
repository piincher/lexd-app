import { useCallback, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useAuth } from '@src/app/store/Auth';
import { saveShippingMarkToGallery, shareShippingMark } from '@src/shared/lib/shippingMarkShare';
import { useShippingMarkPromptStore } from '@src/app/store/shippingMarkPromptStore';
import type { ShippingMarkData } from '../api/shippingMarkApi';

const isUserCancellation = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes('User did not share') || message.includes('cancelled');
};

export const useShippingMarkActions = (data?: ShippingMarkData | null) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const userId = useAuth((state) => state.user?._id);
  const markDownloaded = useShippingMarkPromptStore((state) => state.markDownloaded);

  const showError = useCallback((message: string) => {
    showMessage({ message: "Erreur", description: message, type: 'danger' });
  }, []);

  const showSuccess = useCallback((message: string) => {
    showMessage({ message: "Succès", description: message, type: 'success' });
  }, []);

  const handleDownload = useCallback(async () => {
    if (!data?.shippingMarkImageUrl || !data.clientId) return;
    setIsDownloading(true);
    try {
      await saveShippingMarkToGallery(data.shippingMarkImageUrl, data.clientId);
      if (userId) markDownloaded(userId);
      showSuccess("Marque d'expédition enregistrée dans votre galerie.");
    } catch (error: unknown) {
      if (!isUserCancellation(error)) {
        const message = error instanceof Error ? error.message : String(error);
        showError(message);
      }
    } finally {
      setIsDownloading(false);
    }
  }, [data, userId, markDownloaded, showError, showSuccess]);

  const handleShare = useCallback(async () => {
    if (!data?.shippingMarkImageUrl || !data.clientId) return;
    try {
      await shareShippingMark(data.shippingMarkImageUrl, data.clientId);
    } catch (error: unknown) {
      if (!isUserCancellation(error)) {
        const message = error instanceof Error ? error.message : String(error);
        showError(message);
      }
    }
  }, [data, showError]);

  return { handleDownload, handleShare, isDownloading };
};
