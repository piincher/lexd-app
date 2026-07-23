import { File, Paths } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import RNShare from 'react-native-share';
import { Platform } from 'react-native';

const isUserCancellation = (error: unknown): boolean => {
  const message = (error instanceof Error ? error.message : String(error)).toLowerCase();
  return message.includes('user did not share') || message.includes('cancelled') || message.includes('canceled');
};

interface ShippingMarkShareOptions {
  clientName?: string;
  supplierInstructions?: boolean;
}

export type ShippingMarkShareResult = 'shared' | 'cancelled';

export class MediaLibraryPermissionError extends Error {
  constructor(public readonly canAskAgain: boolean) {
    super("L'autorisation d'enregistrer des images est nécessaire.");
    this.name = 'MediaLibraryPermissionError';
  }
}

export async function downloadShippingMarkToCache(url: string, filename: string): Promise<string> {
  const destFile = new File(Paths.cache, filename);
  const downloaded = await File.downloadFileAsync(url, destFile, { idempotent: true });
  return downloaded.uri;
}

const buildShareMessage = (clientId: string, options?: ShippingMarkShareOptions): string => {
  if (!options?.supplierInstructions) return `Marque d'expédition ${clientId}`;

  const identity = options.clientName?.trim()
    ? `${options.clientName.trim()} — ${clientId}`
    : clientId;
  return [
    `Marque d'expédition : ${identity}`,
    `ID client : ${clientId}`,
    "Merci d'imprimer cette marque et de la coller lisiblement sur chaque colis avant l'expédition.",
  ].join('\n');
};

export async function shareShippingMark(
  url: string,
  clientId: string,
  options?: ShippingMarkShareOptions,
): Promise<ShippingMarkShareResult> {
  const filename = `shipping-mark-${clientId}.png`;
  const fileUri = await downloadShippingMarkToCache(url, filename);

  try {
    await RNShare.open({
      url: fileUri,
      type: 'image/png',
      title: "Marque d'expédition",
      filename,
      message: buildShareMessage(clientId, options),
    });
    return 'shared';
  } catch (error: unknown) {
    if (isUserCancellation(error)) return 'cancelled';
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

export async function saveImageToGallery(url: string, filename: string): Promise<void> {
  if (Platform.OS === 'web') {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Téléchargement impossible (${response.status}).`);
    const objectUrl = URL.createObjectURL(await response.blob());
    downloadBase64DataUrl(objectUrl, filename);
    URL.revokeObjectURL(objectUrl);
    return;
  }

  const fileUri = await downloadShippingMarkToCache(url, filename);
  await saveLocalImageToGallery(fileUri);
}

export async function saveLocalImageToGallery(fileUri: string): Promise<void> {
  if (!(await MediaLibrary.isAvailableAsync())) {
    throw new Error("La galerie n'est pas disponible sur cet appareil.");
  }

  // Passing [] is essential for write-only access on Android and in Expo Go;
  // omitting it asks for every read permission configured by the native module.
  const permission = await MediaLibrary.requestPermissionsAsync(true, []);
  if (!permission.granted) throw new MediaLibraryPermissionError(permission.canAskAgain);

  await MediaLibrary.saveToLibraryAsync(fileUri);
}

export async function saveShippingMarkToGallery(url: string, clientId: string): Promise<void> {
  const filename = `shipping-mark-${clientId}.png`;
  await saveImageToGallery(url, filename);
}
