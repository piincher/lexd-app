import { useCallback, useState } from 'react';
import { userData } from '@src/shared/types/user';

export const useReceiveFormExtras = () => {
  const [selectedClient, setSelectedClient] = useState<userData | null>(null);
  const [photoUris, setPhotoUris] = useState<string[]>([]);
  // Default OFF — operators enter CBM directly more often than dimensions; they toggle
  // dimensions on only when they need the L×W×H → CBM calculation.
  const [useDimensions, setUseDimensions] = useState(false);
  // Per-receipt WhatsApp opt-out. Default ON so existing behavior is unchanged.
  // The operator flips this off for the rare client who has asked not to be
  // contacted on intake. Push + in-app notifications are NOT affected — only
  // the outbound WhatsApp message is skipped.
  const [notifyWhatsapp, setNotifyWhatsapp] = useState<boolean>(true);

  const addPhotoUri = useCallback((uri: string) => {
    setPhotoUris((prev) => (prev.includes(uri) ? prev : [...prev, uri]));
  }, []);

  const removePhotoUri = useCallback((uri: string) => {
    setPhotoUris((prev) => prev.filter((u) => u !== uri));
  }, []);

  return {
    selectedClient,
    setSelectedClient,
    photoUris,
    setPhotoUris,
    addPhotoUri,
    removePhotoUri,
    useDimensions,
    setUseDimensions,
    notifyWhatsapp,
    setNotifyWhatsapp,
  };
};
