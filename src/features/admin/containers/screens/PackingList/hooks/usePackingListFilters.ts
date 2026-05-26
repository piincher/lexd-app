import { useState, useMemo } from 'react';
import { AdminPackingListData } from '../../../types/packingList';

export const usePackingListFilters = (
  packingListData: AdminPackingListData | null,
  initialClientId: string | null
) => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(initialClientId);

  const filteredPackingListData = useMemo(() => {
    if (!packingListData) return null;
    if (!selectedClientId) return packingListData;

    const normalizeId = (id: unknown) => String(id ?? '').trim();
    const targetClientId = normalizeId(selectedClientId);

    const filteredClients = packingListData.clients.filter(
      (c) => normalizeId(c.clientId) === targetClientId
    );

    if (filteredClients.length === 0) return packingListData;

    const client = filteredClients[0];
    const totalQuantity = client.summary.totalQuantity ||
      client.goods.reduce((sum, goods) => sum + (goods.quantity || 1), 0);
    const singleClientSummary = {
      ...packingListData.summary,
      totalItems: client.summary.totalItems,
      totalPackages: client.summary.totalItems,
      totalQuantity,
      totalCBM: client.summary.totalCBM,
      totalWeight: client.summary.totalWeight,
    };

    return {
      ...packingListData,
      clients: filteredClients,
      summary: singleClientSummary,
      isSingleClientView: true,
      singleClientName: client.clientName,
    };
  }, [packingListData, selectedClientId]);

  return { filteredPackingListData, selectedClientId, setSelectedClientId };
};
