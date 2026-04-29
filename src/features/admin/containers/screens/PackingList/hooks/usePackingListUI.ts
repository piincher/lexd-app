import { useState, useCallback } from 'react';
import { NavigationProp } from './usePackingListParams';

export const usePackingListUI = (navigation: NavigationProp, containerId: string | undefined) => {
  const [allExpanded, setAllExpanded] = useState(true);

  const handleToggleAll = useCallback(() => {
    setAllExpanded((prev) => !prev);
  }, []);

  const handleGoToLoadingList = useCallback(() => {
    if (containerId) {
      navigation.navigate('LoadingList', { containerId });
    }
  }, [navigation, containerId]);

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
