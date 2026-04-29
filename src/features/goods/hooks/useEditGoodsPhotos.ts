import { useState, useCallback, useEffect } from 'react';
import { normalizePhotos } from '@src/shared/lib';
import type { Goods } from '../api/types';

export const useEditGoodsPhotos = (goods?: Goods) => {
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);
  const [newPhotoUris, setNewPhotoUris] = useState<string[]>([]);

  useEffect(() => {
    if (goods) setExistingPhotos(normalizePhotos(goods));
  }, [goods]);

  const onPhotoSelected = useCallback((uri: string) => {
    setNewPhotoUris((prev) => [...prev, uri]);
  }, []);

  const onPhotoRemoved = useCallback((uri: string) => {
    setExistingPhotos((prev) => prev.filter((p) => p !== uri));
    setNewPhotoUris((prev) => prev.filter((p) => p !== uri));
  }, []);

  const photoUris = [...existingPhotos, ...newPhotoUris];

  return { photoUris, existingPhotos, newPhotoUris, onPhotoSelected, onPhotoRemoved };
};
