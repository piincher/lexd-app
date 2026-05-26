import { useState } from 'react';
import { useLoadingListNavigation } from './useLoadingListNavigation';
import { useLoadingListData, MAX_CBM } from './useLoadingListData';
import { useLoadingListStats } from './useLoadingListStats';
import { useLoadingListFilters } from './useLoadingListFilters';
import { useLoadingListActions } from './useLoadingListActions';
import { useLoadingListPDF } from './useLoadingListPDF';

export type { AdminV2StackParamList, NavigationProp } from './useLoadingListNavigation';
export { MAX_CBM };

export const useLoadingListScreen = () => {
  const { containerId, initialClientId, navigation } = useLoadingListNavigation();
  const [loadedItems, setLoadedItems] = useState<Set<string>>(new Set());

  const { container, isContainerLoading, loadingListData } = useLoadingListData(containerId, loadedItems);
  const { weightDistribution } = useLoadingListStats(loadingListData);
  const { selectedClientId, setSelectedClientId, filteredLoadingListData } = useLoadingListFilters(
    loadingListData,
    initialClientId
  );
  const { progressPercentage } = useLoadingListStats(filteredLoadingListData);
  const { handleToggleLoaded, handleMarkAllLoaded, handleResetLoading } = useLoadingListActions(
    filteredLoadingListData?.items || loadingListData?.items || [],
    setLoadedItems
  );
  const { isGeneratingPDF, handlePrint } = useLoadingListPDF(filteredLoadingListData);

  return {
    containerId,
    container,
    navigation,
    isContainerLoading,
    isGeneratingPDF,
    loadingListData,
    filteredLoadingListData,
    selectedClientId,
    setSelectedClientId,
    weightDistribution,
    progressPercentage,
    handleToggleLoaded,
    handleMarkAllLoaded,
    handleResetLoading,
    handlePrint,
  };
};
