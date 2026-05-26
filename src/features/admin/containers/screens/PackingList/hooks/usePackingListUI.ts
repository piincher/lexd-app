import { useState, useCallback } from 'react';
import { NavigationProp } from './usePackingListParams';

export const usePackingListUI = (
  navigation: NavigationProp,
  containerId: string | undefined,
  selectedClientId: string | null
) => {
  const [allExpanded, setAllExpanded] = useState(false);

  const handleToggleAll = useCallback(() => {
    setAllExpanded((prev) => !prev);
  }, []);

  const handleGoToLoadingList = useCallback(() => {
    if (containerId) {
      navigation.navigate(
        'LoadingList',
        selectedClientId
          ? { containerId, initialClientId: selectedClientId, clientId: selectedClientId }
          : { containerId }
      );
    }
  }, [navigation, containerId, selectedClientId]);

  const formatDate = useCallback((date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }, []);

  return { allExpanded, setAllExpanded, handleToggleAll, handleGoToLoadingList, formatDate };
};
