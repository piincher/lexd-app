/**
 * useReceiveFormPhotos - Manages photo URI state
 */

import { useState } from 'react';

export const useReceiveFormPhotos = () => {
  const [photoUris, setPhotoUris] = useState<string[]>([]);

  const addPhotoUri = (uri: string) => {
    setPhotoUris((prev) => (prev.includes(uri) ? prev : [...prev, uri]));
  };

  const removePhotoUri = (uri: string) => {
    setPhotoUris((prev) => prev.filter((u) => u !== uri));
  };

  return { photoUris, addPhotoUri, removePhotoUri, setPhotoUris };
};
