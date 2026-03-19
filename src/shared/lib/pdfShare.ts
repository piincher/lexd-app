/**
 * PDF Sharing utility with SDK 55 compatibility
 * Uses react-native-share for reliable Android sharing
 */
import { File, Paths } from 'expo-file-system';
import { Alert } from 'react-native';
import RNShare from 'react-native-share';

export interface PDFShareOptions {
  uri: string;
  filename: string;
  dialogTitle: string;
  mimeType?: string;
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
    } catch (error: any) {
      // User cancelled is not an error
      if (error?.message?.includes('User did not share') || error?.message?.includes('cancelled')) {
        return;
      }
      throw error;
    }
  } catch (error) {
    console.error('PDF share error:', error);
    Alert.alert('Erreur', 'Impossible de partager le PDF');
    throw error;
  }
}
