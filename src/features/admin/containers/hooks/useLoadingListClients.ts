import { useMemo, useState } from 'react';
import { AdminLoadingListData, ClientGoodsGroup } from '../types/packingList';

export const useLoadingListClients = (
  loadingListData: AdminLoadingListData | null,
  initialClientId: string | null
) => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(initialClientId);

  const allClients = useMemo<ClientGoodsGroup[]>(() => {
    if (!loadingListData?.items?.length) return [];
    const clientsMap = new Map<string, ClientGoodsGroup>();
    loadingListData.items.forEach((item) => {
      const normalizedId = String(item.clientId).trim();
      if (!clientsMap.has(normalizedId)) {
        const clientItems = loadingListData.items.filter((i) => String(i.clientId).trim() === normalizedId);
        clientsMap.set(normalizedId, {
          clientId: normalizedId,
          clientName: item.clientName,
          clientPhone: 'N/A',
          goods: clientItems.map((i) => i.goods),
          summary: {
            totalCBM: clientItems.reduce((s, i) => s + (i.goods.actualCBM || 0), 0),
            totalWeight: clientItems.reduce((s, i) => s + (i.goods.weight || 0), 0),
            totalItems: clientItems.length,
            totalQuantity: clientItems.length,
            totalCost: 0,
            totalPaid: 0,
            balanceDue: 0,
          },
        });
      }
    });
    return Array.from(clientsMap.values());
  }, [loadingListData]);

  const filteredLoadingListData = useMemo(() => {
    if (!loadingListData) return null;
    if (!selectedClientId) return loadingListData;

    const targetId = String(selectedClientId).trim();
    const filteredItems = loadingListData.items.filter((item) => String(item.clientId).trim() === targetId);
    if (filteredItems.length === 0) return loadingListData;

    const totalCBM = filteredItems.reduce((s, i) => s + (i.goods.actualCBM || 0), 0);
    const totalWeight = filteredItems.reduce((s, i) => s + (i.goods.weight || 0), 0);
    const loadedItemsCount = filteredItems.filter((i) => i.isLoaded).length;
    const loadedCBM = filteredItems.filter((i) => i.isLoaded).reduce((s, i) => s + (i.goods.actualCBM || 0), 0);

    return {
      ...loadingListData,
      items: filteredItems,
      summary: {
        ...loadingListData.summary,
        totalItems: filteredItems.length,
        totalPackages: filteredItems.length,
        totalCBM,
        totalWeight,
        loadedItems: loadedItemsCount,
        remainingItems: filteredItems.length - loadedItemsCount,
        loadedCBM,
        remainingCBM: totalCBM - loadedCBM,
        capacityPercentage: (totalCBM / 67) * 100,
      },
      isSingleClientView: true,
      singleClientName: filteredItems[0]?.clientName,
    };
  }, [loadingListData, selectedClientId]);

  return { selectedClientId, setSelectedClientId, allClients, filteredLoadingListData };
};
