import * as ImageManipulator from 'expo-image-manipulator';
import { apiClientV2, uploadFile } from '@src/api/client';

const MAX_DIMENSION_PX = 1600;
const COMPRESS_QUALITY = 0.7;

const compressImage = async (uri: string): Promise<string> => {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: MAX_DIMENSION_PX } }],
      { compress: COMPRESS_QUALITY, format: ImageManipulator.SaveFormat.JPEG },
    );
    return result.uri;
  } catch {
    return uri;
  }
};

/**
 * Compress + upload an image for an announcement, returning its public URL.
 */
export const uploadAnnouncementImage = async (uri: string): Promise<string> => {
  const compressed = await compressImage(uri);
  const formData = new FormData();
  formData.append('images', {
    uri: compressed,
    name: `announcement_${Date.now()}.jpg`,
    type: 'image/jpeg',
  } as unknown as Blob);

  const response = await uploadFile<{ urls: string[] }>(
    apiClientV2,
    '/admin/upload-images?folder=announcements',
    formData,
  );
  const url = response.data?.urls?.[0];
  if (!url || typeof url !== 'string') throw new Error("Le serveur n'a pas retourné l'URL de l'image.");
  return url;
};
