import { useCallback } from 'react';
import { Alert } from 'react-native';
import { LoadingListItem } from '../../../types/packingList';

export const useLoadingListActions = (
  items: LoadingListItem[],
  setLoadedItems: React.Dispatch<React.SetStateAction<Set<string>>>
) => {
  const handleToggleLoaded = useCallback((goodsId: string, isLoaded: boolean) => {
    setLoadedItems((prev) => {
      const newSet = new Set(prev);
      if (isLoaded) {
        newSet.add(goodsId);
      } else {
        newSet.delete(goodsId);
      }
      return newSet;
    });
  }, [setLoadedItems]);

  const handleMarkAllLoaded = useCallback(() => {
    const allIds = new Set(items.map((item) => item.goods._id));
    setLoadedItems(allIds);
  }, [items, setLoadedItems]);

  const handleResetLoading = useCallback(() => {
    Alert.alert(
      'Réinitialiser le chargement',
      'Êtes-vous sûr de vouloir réinitialiser le statut de chargement ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => setLoadedItems(new Set()),
        },
      ]
    );
  }, [setLoadedItems]);

  return { handleToggleLoaded, handleMarkAllLoaded, handleResetLoading };
};
