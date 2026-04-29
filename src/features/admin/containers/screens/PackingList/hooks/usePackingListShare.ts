import { useCallback } from 'react';
import { Alert, Share } from 'react-native';
import { AdminPackingListData } from '../../../types/packingList';
import { buildPackingListShareText } from './buildPackingListShareText';

export const usePackingListShare = (filteredPackingListData: AdminPackingListData | null) => {
  const handleShare = useCallback(async () => {
    if (!filteredPackingListData) return;

    const { container, clients, summary, isSingleClientView, singleClientName } = filteredPackingListData;

    const message = buildPackingListShareText(container, clients, summary, isSingleClientView, singleClientName);

    try {
      await Share.share({
        message,
        title: `Liste de Colisage - ${container.number}`,
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager la liste');
    }
  }, [filteredPackingListData]);

  return { handleShare };
};
