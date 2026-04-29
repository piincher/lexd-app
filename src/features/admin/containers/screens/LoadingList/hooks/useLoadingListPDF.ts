import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { AdminLoadingListData } from '../../../types/packingList';
import { generateLoadingListPDF } from '../../../services/loadingListPDF';

type FilteredData = AdminLoadingListData & { isSingleClientView?: boolean; singleClientName?: string };

export const useLoadingListPDF = (filteredLoadingListData: FilteredData | null) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handlePrint = useCallback(async () => {
    if (!filteredLoadingListData) return;
    setIsGeneratingPDF(true);

    try {
      await generateLoadingListPDF(filteredLoadingListData);
      setIsGeneratingPDF(false);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer le PDF');
      console.error('PDF generation error:', error);
      setIsGeneratingPDF(false);
    }
  }, [filteredLoadingListData]);

  return { isGeneratingPDF, handlePrint };
};
