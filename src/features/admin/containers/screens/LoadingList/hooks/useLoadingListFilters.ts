import { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AdminLoadingListData } from '../../../types/packingList';
import { MAX_CBM } from './useLoadingListData';

type RouteParamNavigation = {
  setParams: (params: { initialClientId?: string; clientId?: string }) => void;
};

export const useLoadingListFilters = (
  loadingListData: AdminLoadingListData | null,
  initialClientId: string | null
) => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(initialClientId);
  const navigation = useNavigation();

  const handleSelectClient = useCallback((clientId: string | null) => {
    setSelectedClientId(clientId);
    (navigation as RouteParamNavigation).setParams({
      initialClientId: clientId || undefined,
      clientId: clientId || undefined,
    });
  }, [navigation]);

  const filteredLoadingListData = useMemo(() => {
    if (!loadingListData) return null;
    if (!selectedClientId) return loadingListData;

    const normalizeId = (id: unknown) => String(id).trim();
    const targetId = normalizeId(selectedClientId);

    const filteredItems = loadingListData.items.filter(
      (item) => normalizeId(item.clientId) === targetId
    );

    if (filteredItems.length === 0) {
      return loadingListData;
    }

    const totalCBM = filteredItems.reduce((sum, item) => sum + (item.goods.actualCBM || 0), 0);
    const totalWeight = filteredItems.reduce((sum, item) => sum + (item.goods.weight || 0), 0);
    const loadedItems = filteredItems.filter((item) => item.isLoaded).length;
    const loadedCBM = filteredItems
      .filter((item) => item.isLoaded)
      .reduce((sum, item) => sum + (item.goods.actualCBM || 0), 0);

    return {
      ...loadingListData,
      items: filteredItems,
      summary: {
        ...loadingListData.summary,
        totalItems: filteredItems.length,
        totalPackages: filteredItems.reduce((sum, item) => sum + (item.goods.quantity || 1), 0),
        totalCBM,
        totalWeight,
        loadedItems,
        remainingItems: filteredItems.length - loadedItems,
        loadedCBM,
        remainingCBM: totalCBM - loadedCBM,
        capacityPercentage: (totalCBM / MAX_CBM) * 100,
      },
      isSingleClientView: true,
      singleClientName: filteredItems[0]?.clientName,
    };
  }, [loadingListData, selectedClientId]);

  return { selectedClientId, setSelectedClientId: handleSelectClient, filteredLoadingListData };
};
