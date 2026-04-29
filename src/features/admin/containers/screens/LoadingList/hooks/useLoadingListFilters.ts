import { useMemo, useState } from 'react';
import { AdminLoadingListData } from '../../../types/packingList';
import { MAX_CBM } from './useLoadingListData';

export const useLoadingListFilters = (
  loadingListData: AdminLoadingListData | null,
  initialClientId: string | null
) => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(initialClientId);

  const filteredLoadingListData = useMemo(() => {
    if (!loadingListData) return null;
    if (!selectedClientId) return loadingListData;

    const normalizeId = (id: any) => String(id).trim();
    const targetId = normalizeId(selectedClientId);

    const filteredItems = loadingListData.items.filter(
      (item) => normalizeId(item.clientId) === targetId
    );

    if (filteredItems.length === 0 && loadingListData.items.length > 0) {
      const sampleIds = loadingListData.items.slice(0, 3).map((i) => i.clientId);
      console.warn('[LoadingList] Filter failed. Target:', targetId, 'Samples:', sampleIds);
    }

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
        totalPackages: filteredItems.length,
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

  return { selectedClientId, setSelectedClientId, filteredLoadingListData };
};
