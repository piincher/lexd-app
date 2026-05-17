import { useCallback } from 'react';
import { useAllOrdersScreen } from '../../hooks/useAllOrdersScreen';

export const useAllOrdersScreenUI = () => {
  const allOrdersData = useAllOrdersScreen();

  const handleToggleSelectionMode = useCallback(() => {
    if (allOrdersData.isSelectionMode) {
      allOrdersData.exitSelectionMode();
    } else {
      allOrdersData.setIsSelectionMode(true);
    }
  }, [allOrdersData.isSelectionMode, allOrdersData.exitSelectionMode, allOrdersData.setIsSelectionMode]);

  return {
    ...allOrdersData,
    handlers: {
      handleToggleSelectionMode,
    },
  };
};
