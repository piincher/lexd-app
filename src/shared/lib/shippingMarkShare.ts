import { File, Paths } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import RNShare from 'react-native-share';
import { Platform } from 'react-native';

const isUserCancellation = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes('User did not share') || message.includes('cancelled');
};

export async function downloadShippingMarkToCache(url: string, filename: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();

  const base64: string = await new Promise((resolve, reject) => {
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  const destFile = new File(Paths.cache, filename);
  await destFile.write(base64, { encoding: 'base64' });
  return destFile.uri;
}

export async function shareShippingMark(url: string, clientId: string): Promise<void> {
  const filename = `shipping-mark-${clientId}.png`;
  const fileUri = await downloadShippingMarkToCache(url, filename);

  try {
    await RNShare.open({
      url: fileUri,
      type: 'image/png',
      title: "Marque d'expédition",
      filename,
      message: `Marque d'expédition ${clientId}`,
    });
  } catch (error: unknown) {
    if (isUserCancellation(error)) return;
    const message = error instanceof Error ? error.message : String(error);
    throw new Error('Impossible de partager la marque: ' + message);
  }
}

function downloadBase64DataUrl(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function saveShippingMarkToGallery(url: string, clientId: string): Promise<void> {
  const filename = `shipping-mark-${clientId}.png`;

  if (Platform.OS === 'web') {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    downloadBase64DataUrl(objectUrl, filename);
    URL.revokeObjectURL(objectUrl);
    return;
  }

  const fileUri = await downloadShippingMarkToCache(url, filename);

  const { status: existingStatus } = await MediaLibrary.getPermissionsAsync();
  let status = existingStatus;
  if (existingStatus !== MediaLibrary.PermissionStatus.GRANTED) {
    const permission = await MediaLibrary.requestPermissionsAsync();
    status = permission.status;
  }

  if (status !== MediaLibrary.PermissionStatus.GRANTED) {
    throw new Error('Permission refusée. Veuillez autoriser l\'accès à la galerie pour enregistrer la marque.');
  }

  await MediaLibrary.createAssetAsync(fileUri);
}
