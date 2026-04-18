/**
 * useGoodsPdfExport
 *
 * Hook for fetching goods by date range and generating a PDF report
 */

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { getGoodsForExport, GoodsExportFilters } from '../api/goodsExportApi';
import { generateGoodsPdf } from '../services/goodsPdfService';

export const useGoodsPdfExport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [goodsCount, setGoodsCount] = useState(0);

  const fetchPreview = useCallback(async (filters: GoodsExportFilters) => {
    try {
      const { total } = await getGoodsForExport({ ...filters, limit: 1 });
      setGoodsCount(total);
    } catch (error) {
      console.error('Failed to fetch goods preview:', error);
    }
  }, []);

  const exportPdf = useCallback(async (filters: GoodsExportFilters) => {
    const { startDate, endDate } = filters;
    if (!startDate || !endDate) {
      Alert.alert('Erreur', 'Veuillez sélectionner une plage de dates');
      return;
    }

    setIsLoading(true);
    try {
      const { goods } = await getGoodsForExport(filters);
      if (goods.length === 0) {
        Alert.alert('Info', 'Aucune marchandise trouvée pour cette période');
        return;
      }
      await generateGoodsPdf(goods, startDate, endDate);
    } catch (error) {
      console.error('PDF export error:', error);
      Alert.alert('Erreur', 'Impossible de générer le PDF');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, goodsCount, fetchPreview, exportPdf };
};
