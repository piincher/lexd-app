import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { usePackingListParams } from './usePackingListParams';
import { usePackingListData } from './usePackingListData';
import { usePackingListFilters } from './usePackingListFilters';
import { usePackingListUI } from './usePackingListUI';
import { usePackingListPrint } from './usePackingListPrint';
import { usePackingListShare } from './usePackingListShare';

export type { AdminV2StackParamList, NavigationProp } from './usePackingListParams';
export const MAX_CBM = 67;

export const usePackingListScreen = () => {
  const { containerId, initialClientId, autoPrint, navigation } = usePackingListParams();
  const documentRef = useRef<View>(null);
  const autoPrintStarted = useRef(false);

  const { packingListData, isContainerLoading } = usePackingListData(containerId || '');
  const { filteredPackingListData, selectedClientId, setSelectedClientId } = usePackingListFilters(
    packingListData,
    initialClientId
  );
  const { allExpanded, setAllExpanded, handleToggleAll, handleGoToLoadingList, formatDate } =
    usePackingListUI(navigation, containerId, selectedClientId);
  const { isGeneratingPDF, setIsGeneratingPDF, handlePrint } = usePackingListPrint(filteredPackingListData);
  const { handleShare } = usePackingListShare(filteredPackingListData);

  useEffect(() => {
    if (!autoPrint || autoPrintStarted.current || !filteredPackingListData) return;
    autoPrintStarted.current = true;
    handlePrint();
  }, [autoPrint, filteredPackingListData, handlePrint]);

  const clients = filteredPackingListData?.clients ?? [];
  const allClients = packingListData?.clients ?? [];
  const safeSummary = filteredPackingListData?.summary ?? {
    totalItems: 0,
    totalCBM: 0,
    totalWeight: 0,
    totalPackages: 0,
    capacityPercentage: 0,
  };

  return {
    containerId,
    container: packingListData?.container,
    navigation,
    documentRef,
    isContainerLoading,
    isGeneratingPDF,
    setIsGeneratingPDF,
    allExpanded,
    setAllExpanded,
    packingListData,
    filteredPackingListData,
    clients,
    allClients,
    safeSummary,
    selectedClientId,
    setSelectedClientId,
    handlePrint,
    handleShare,
    handleToggleAll,
    handleGoToLoadingList,
    formatDate,
  };
};
