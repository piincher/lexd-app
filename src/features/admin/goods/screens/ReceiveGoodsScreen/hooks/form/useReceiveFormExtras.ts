import { useCallback, useState } from 'react';
import { userData } from '@src/shared/types/user';

export const useReceiveFormExtras = () => {
  const [selectedClient, setSelectedClient] = useState<userData | null>(null);
  const [photoUris, setPhotoUris] = useState<string[]>([]);
  const [useDimensions, setUseDimensions] = useState(true);

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
  };
};
