import { useMemo } from 'react';
import { useGetContainerById, useGetPackingList } from '../../../hooks';
import { Container } from '../../../types';
import { Goods } from '../../../../goods/types';
import { AdminLoadingListData, LoadingListItem, getClientColor, ClientGoodsGroup } from '../../../types/packingList';

export const MAX_CBM = 67;

export const useLoadingListData = (containerId: string, loadedItems: Set<string>) => {
  const { data: containerResponse, isLoading: isContainerLoading } = useGetContainerById(containerId);
  const container: Container | undefined = containerResponse?.data?.container || containerResponse?.data;
  const { data: packingListResponse, isLoading: isPackingListLoading } = useGetPackingList(containerId);

  console.log('[DEBUG] Packing list loading:', isPackingListLoading);
  console.log('[DEBUG] Packing list response:', packingListResponse ? 'has data' : 'no data');

  const loadingListData = useMemo<AdminLoadingListData | null>(() => {
    if (!container) return null;
    const packingData = packingListResponse?.data?.data || packingListResponse?.data;
    const documentContainer = {
      ...container,
      consignee: (container as any).consignee ||
        (typeof (container as any).consigneeId === 'object' ? (container as any).consigneeId : null) ||
        packingData?.container?.consignee,
    };
    console.log('[DEBUG] Packing list data:', packingData);
    console.log('[DEBUG] Packing list clients:', packingData?.clients);
    if (packingData?.clients) {
      packingData.clients.forEach((client: ClientGoodsGroup) => {
        console.log('[DEBUG] Adding client to map:', client.clientId, client.clientName);
      });
    }
    console.log('[DEBUG] Client info map size:', packingData?.clients?.length ?? 0);

    let goodsList: any[] = [];
    if (packingData?.clients) {
      packingData.clients.forEach((client: any) => {
        if (client.goods) client.goods.forEach((g: any) => goodsList.push({ ...g, clientId: client.clientId, clientName: client.clientName }));
      });
    }
    if (goodsList.length === 0) {
      const goodsIds = (container as any).goodsIds;
      goodsList = Array.isArray(goodsIds) && goodsIds.length > 0 && typeof goodsIds[0] === 'object' ? goodsIds as Goods[] : (container.goods || []);
    }
    console.log('[DEBUG] Final goods count:', goodsList.length);
    if (goodsList.length > 0) console.log('[DEBUG] First goods:', JSON.stringify(goodsList[0], null, 2));
    if (goodsList.length === 0) {
      return { container: documentContainer, items: [], clientColors: {}, summary: { totalCBM: 0, totalWeight: 0, totalItems: 0, totalPackages: 0, capacityPercentage: 0, maxCBM: MAX_CBM, loadedItems: 0, remainingItems: 0, loadedCBM: 0, remainingCBM: MAX_CBM } };
    }

    const clientColorMap = new Map<string, string>();
    const uniqueClients = new Set<string>();
    goodsList.forEach((g) => uniqueClients.add(g.clientId || 'unknown'));
    Array.from(uniqueClients).forEach((id, i) => clientColorMap.set(id, getClientColor(i)));

    const items: LoadingListItem[] = [...goodsList].sort((a, b) => (b.weight || 0) - (a.weight || 0)).map((goods, i) => {
      const clientId = goods.clientId || 'unknown';
      return { sequenceNumber: i + 1, goods, clientId, clientName: goods.clientName || 'Client Inconnu', clientColor: clientColorMap.get(clientId) || '#8B5CF6', isLoaded: loadedItems.has(goods._id) };
    });

    const totalCBM = container.totalCBM || 0;
    const loadedCBM = items.filter((it) => it.isLoaded).reduce((s, it) => s + (it.goods.actualCBM || 0), 0);

    return {
      container: documentContainer, items, clientColors: Object.fromEntries(clientColorMap),
      summary: {
        totalCBM, totalWeight: items.reduce((s, it) => s + (it.goods.weight || 0), 0), totalItems: goodsList.length,
        totalPackages: items.reduce((s, it) => s + (it.goods.quantity || 1), 0), capacityPercentage: (totalCBM / MAX_CBM) * 100,
        maxCBM: MAX_CBM, loadedItems: items.filter((it) => it.isLoaded).length, remainingItems: items.filter((it) => !it.isLoaded).length,
        loadedCBM, remainingCBM: totalCBM - loadedCBM,
      },
    };
  }, [container, loadedItems, packingListResponse]);

  return { container, isContainerLoading, loadingListData };
};
