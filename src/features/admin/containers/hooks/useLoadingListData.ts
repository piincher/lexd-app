import { useMemo } from 'react';
import { useGetContainerById, useGetPackingList } from './useContainers';
import { Container } from '../types';
import { AdminLoadingListData } from '../types/packingList';
import { buildGoodsList, buildClientColorMap, buildLoadingListItems, buildEmptySummary, MAX_CBM } from './loadingListHelpers';

export { MAX_CBM };

export const useLoadingListData = (containerId: string, loadedItems: Set<string>) => {
  const { data: containerResponse, isLoading: isContainerLoading } = useGetContainerById(containerId);
  const container: Container | undefined = containerResponse?.data?.container || containerResponse?.data;
  const { data: packingListResponse, isLoading: isPackingListLoading } = useGetPackingList(containerId);

  console.log('[DEBUG] Packing list loading:', isPackingListLoading);
  console.log('[DEBUG] Packing list response:', packingListResponse ? 'has data' : 'no data');

  const loadingListData = useMemo<AdminLoadingListData | null>(() => {
    if (!container) return null;

    const packingData = packingListResponse?.data?.data || packingListResponse?.data;
    console.log('[DEBUG] Packing list data:', packingData);
    console.log('[DEBUG] Packing list clients:', packingData?.clients);

    const goodsList = buildGoodsList(packingData, container);
    console.log('[DEBUG] Final goods count:', goodsList.length);
    if (goodsList.length > 0) {
      console.log('[DEBUG] First goods:', JSON.stringify(goodsList[0], null, 2));
    }

    if (goodsList.length === 0) {
      return { container, items: [], clientColors: {}, summary: buildEmptySummary() };
    }

    const items = buildLoadingListItems(goodsList, loadedItems);
    const totalCBM = container.totalCBM || 0;
    const loadedCBM = items
      .filter((i) => i.isLoaded)
      .reduce((s, i) => s + (i.goods.actualCBM || 0), 0);

    return {
      container,
      items,
      clientColors: Object.fromEntries(buildClientColorMap(goodsList)),
      summary: {
        totalCBM,
        totalWeight: items.reduce((s, i) => s + (i.goods.weight || 0), 0),
        totalItems: goodsList.length,
        totalPackages: items.reduce((s, i) => s + (i.goods.quantity || 1), 0),
        capacityPercentage: (totalCBM / MAX_CBM) * 100,
        maxCBM: MAX_CBM,
        loadedItems: items.filter((i) => i.isLoaded).length,
        remainingItems: items.filter((i) => !i.isLoaded).length,
        loadedCBM,
        remainingCBM: totalCBM - loadedCBM,
      },
    };
  }, [container, loadedItems, packingListResponse]);

  return { container, isContainerLoading, loadingListData };
};
