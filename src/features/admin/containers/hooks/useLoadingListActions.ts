import { useCallback } from 'react';
import { Alert } from 'react-native';
import { AdminLoadingListData } from '../types/packingList';

export const useLoadingListActions = (
  loadingListData: AdminLoadingListData | null,
  setLoadedItems: React.Dispatch<React.SetStateAction<Set<string>>>
) => {
  const handleToggleLoaded = useCallback((goodsId: string, isLoaded: boolean) => {
    setLoadedItems((prev) => {
      const next = new Set(prev);
      if (isLoaded) next.add(goodsId);
      else next.delete(goodsId);
      return next;
    });
  }, [setLoadedItems]);

  const handleMarkAllLoaded = useCallback(() => {
    if (!loadingListData) return;
    setLoadedItems(new Set(loadingListData.items.map((item) => item.goods._id)));
  }, [loadingListData, setLoadedItems]);

  const handleResetLoading = useCallback(() => {
    Alert.alert(
      'Réinitialiser le chargement',
      'Êtes-vous sûr de vouloir réinitialiser le statut de chargement ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Réinitialiser', style: 'destructive', onPress: () => setLoadedItems(new Set()) },
      ]
    );
  }, [setLoadedItems]);

  return { handleToggleLoaded, handleMarkAllLoaded, handleResetLoading };
};
