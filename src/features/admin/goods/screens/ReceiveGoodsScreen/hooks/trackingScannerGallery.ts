import { Platform } from 'react-native';
import { Camera, type BarcodeType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export const TRACKING_BARCODE_TYPES: BarcodeType[] = ['qr', 'pdf417', 'code128', 'ean13'];

export type GalleryTrackingDecodeResult =
  | { status: 'success'; data: string }
  | { status: 'cancelled' | 'permission-denied' | 'not-found' | 'error' };

export const getGallerySupportedCodeLabel = () =>
  Platform.OS === 'ios' ? 'QR code' : 'QR code ou code-barres';

export const pickGalleryTrackingCode = async (): Promise<GalleryTrackingDecodeResult> => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: false,
    allowsMultipleSelection: false,
    quality: 1,
  });

  const imageUri = result.canceled ? undefined : result.assets?.[0]?.uri;
  if (!imageUri) return { status: 'cancelled' };

  try {
    const codes = await Camera.scanFromURLAsync(imageUri, TRACKING_BARCODE_TYPES);
    const readableCode = codes.find((code) => code.data?.trim());
    return readableCode
      ? { status: 'success', data: readableCode.data }
      : { status: 'not-found' };
  } catch {
    return { status: 'error' };
  }
};
