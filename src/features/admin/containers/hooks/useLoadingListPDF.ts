import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { generateLoadingListPDF } from '../services/loadingListPDF';

export const useLoadingListPDF = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handlePrint = useCallback(async (data: any) => {
    if (!data) return;
    setIsGeneratingPDF(true);
    try {
      await generateLoadingListPDF(data);
      setIsGeneratingPDF(false);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer le PDF');
      console.error('PDF generation error:', error);
      setIsGeneratingPDF(false);
    }
  }, []);

  return { isGeneratingPDF, handlePrint };
};
