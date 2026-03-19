/**
 * usePackingListExport Hook
 * Export functionality (PDF generation, sharing)
 * SRP: Handle PDF export and sharing logic
 */

import { useState, useCallback } from 'react';
import { Alert, Platform, Share } from 'react-native';
import * as Sharing from 'expo-sharing';
import { format } from 'date-fns';
import { useDownloadPackingListPDF } from './useCustomerContainers';
import { generateShareText, blobToBase64, downloadWeb, savePDF } from '../utils/packingListExportHelpers';

interface PackingListData {
  containerNumber: string;
  generatedAt?: string;
  items: Array<{ goodsId: string; description: string; actualCBM: number; weight: number }>;
}

export const usePackingListExport = (
  containerId: string,
  packingList: PackingListData | undefined,
  showSnackbar: (message: string) => void
) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const downloadMutation = useDownloadPackingListPDF();

  const handleDownloadPDF = useCallback(async () => {
    if (!packingList) return;
    try {
      setDownloadProgress(0.1);
      const pdfBlob = await downloadMutation.mutateAsync(containerId);
      setDownloadProgress(0.5);
      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      const filename = `PackingList_${packingList.containerNumber}_${timestamp}.pdf`;
      
      if (Platform.OS === 'web') {
        downloadWeb(pdfBlob, filename);
        showSnackbar('PDF téléchargé avec succès');
        return;
      }
      
      setDownloadProgress(0.7);
      const fileUri = await savePDF(pdfBlob, filename);
      setDownloadProgress(1);
      showSnackbar('PDF téléchargé avec succès');
      
      Alert.alert('Téléchargement terminé', 'Voulez-vous ouvrir le PDF ?', [
        { text: 'Plus tard', style: 'cancel' },
        { text: 'Ouvrir', onPress: async () => {
          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri, { mimeType: 'application/pdf', dialogTitle: 'Ouvrir le PDF' });
          }
        }},
      ]);
    } catch (err) {
      Alert.alert('Erreur de téléchargement', 'Impossible de télécharger le PDF. Veuillez réessayer.');
    } finally {
      setTimeout(() => setDownloadProgress(0), 1000);
    }
  }, [containerId, packingList, downloadMutation, showSnackbar]);

  const handleShare = useCallback(async () => {
    if (!packingList) return;
    try {
      if (packingList.generatedAt && Platform.OS !== 'web') {
        try {
          setDownloadProgress(0.3);
          const pdfBlob = await downloadMutation.mutateAsync(containerId);
          setDownloadProgress(0.7);
          const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
          const filename = `PackingList_${packingList.containerNumber}_${timestamp}.pdf`;
          const fileUri = await savePDF(pdfBlob, filename);
          setDownloadProgress(1);
          await Sharing.shareAsync(fileUri, { mimeType: 'application/pdf', dialogTitle: 'Partager ma liste de colisage', UTI: 'com.adobe.pdf' });
          setTimeout(() => setDownloadProgress(0), 500);
          return;
        } catch (e) { console.warn('PDF share failed, falling back to text:', e); }
      }
      await Share.share({ message: generateShareText(packingList), title: `Liste de Colisage - ${packingList.containerNumber}` });
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de partager la liste de colisage');
    }
  }, [containerId, packingList, downloadMutation]);

  return { downloadProgress, isDownloading: downloadMutation.isPending, handleDownloadPDF, handleShare };
};
