/**
 * PDF Sharing utility with SDK 55 compatibility
 * Uses react-native-share for reliable Android sharing
 */
import { File, Paths } from 'expo-file-system';

import RNShare, { ShareSingleOptions } from 'react-native-share';

export interface PDFShareOptions {
  uri: string;
  filename: string;
  dialogTitle: string;
  mimeType?: string;
}

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(',')[1];
      if (base64) {
        resolve(base64);
        return;
      }
      reject(new Error('Failed to convert PDF blob to base64'));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

/**
 * Save a PDF blob to the cache directory and return the local file URI
 */
export async function savePDFToCache(blob: Blob, filename: string): Promise<string> {
  const destFile = new File(Paths.cache, filename);
  const base64Data = await blobToBase64(blob);
  await destFile.write(base64Data, { encoding: 'base64' });
  return destFile.uri;
}

/**
 * Trigger a browser download for a PDF blob on web
 */
export function downloadPDFOnWeb(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Download a remote PDF URL to cache and return the local file URI
 */
export async function downloadPDFToCache(url: string, filename: string): Promise<string> {
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

/**
 * Copy PDF to cache directory and share it using react-native-share
 * Bypasses expo-sharing which has getFilePermission issues on SDK 55
 */
export async function sharePDFFromUri(options: PDFShareOptions): Promise<void> {
  const { uri, filename, dialogTitle } = options;

  try {
    // Create File instance for source (Print output)
    const sourceFile = new File(uri);

    // Create File instance for destination (cache directory)
    const destFile = new File(Paths.cache, filename);

    // Copy file using new API
    await sourceFile.copy(destFile);

    // Use react-native-share (more reliable than expo-sharing on SDK 55)
    try {
      await RNShare.open({
        url: destFile.uri,
        type: 'application/pdf',
        title: dialogTitle,
        filename: filename,
        message: dialogTitle,
      });
    } catch (error) {
      // User cancelled is not an error
      if (error instanceof Error && (error.message.includes('User did not share') || error.message.includes('cancelled'))) {
        return;
      }
      throw error;
    }
  } catch (error) {
    console.error('PDF share error:', error);
    throw new Error('Impossible de partager le PDF: ' + (error instanceof Error ? error.message : String(error)));
  }
}

/**
 * Share a remote PDF URL on WhatsApp (downloads first, then shares file)
 */
export async function sharePDFOnWhatsApp(options: {
  url: string;
  filename: string;
  message: string;
  phone?: string;
}): Promise<void> {
  const { url, filename, message, phone } = options;

  const fileUri = await downloadPDFToCache(url, filename);

  try {
    await RNShare.shareSingle({
      social: RNShare.Social.WHATSAPP,
      url: fileUri,
      type: 'application/pdf',
      title: 'Reçu de Paiement',
      message,
      filename,
      whatsAppNumber: phone,
    } as ShareSingleOptions);
  } catch (err) {
    // If WhatsApp-specific fails, fallback to generic share
    if (err instanceof Error && (err.message.includes('not installed') || err.message.includes('not supported'))) {
      await sharePDFGeneric({ fileUri, filename, message });
    } else if (!isUserCancellation(err)) {
      throw err;
    }
  }
}

/**
 * Share a remote PDF URL via native share sheet (any app)
 */
export async function sharePDFGeneric(options: {
  fileUri?: string;
  url?: string;
  filename: string;
  message?: string;
}): Promise<void> {
  const { filename, message } = options;
  let fileUri = options.fileUri;

  if (!fileUri && options.url) {
    fileUri = await downloadPDFToCache(options.url, filename);
  }
  if (!fileUri) throw new Error('No file URI');

  try {
    await RNShare.open({
      url: fileUri,
      type: 'application/pdf',
      title: 'Reçu de Paiement - ChinaLink Express',
      filename,
      message,
    });
  } catch (err) {
    if (!isUserCancellation(err)) {
      throw err;
    }
  }
}

function isUserCancellation(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : '';
  return msg.includes('User did not share') || msg.includes('cancelled');
}
