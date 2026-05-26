import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import { AdminPackingListData } from '../../../types/packingList';
import { buildPackingListPDF } from './buildPackingListPDF';
import { sharePDFFromUri } from '@src/shared/lib/pdfShare';

export const usePackingListPrint = (filteredPackingListData: AdminPackingListData | null) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handlePrint = useCallback(async () => {
    if (!filteredPackingListData) return;
    setIsGeneratingPDF(true);

    try {
      const { container, clients, summary, isSingleClientView, singleClientName } = filteredPackingListData;

      const html = buildPackingListPDF(container, clients, summary, isSingleClientView, singleClientName);

      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      await sharePDFFromUri({
        uri,
        filename: `PackingList_${container.number}_${Date.now()}.pdf`,
        dialogTitle: `Liste de Colisage - ${container.number}`,
      });

      setIsGeneratingPDF(false);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer le PDF');
      console.error('PDF generation error:', error);
      setIsGeneratingPDF(false);
    }
  }, [filteredPackingListData]);

  return { isGeneratingPDF, setIsGeneratingPDF, handlePrint };
};
