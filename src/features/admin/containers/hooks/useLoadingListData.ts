import { useMemo } from 'react';
import { useGetContainerById, useGetPackingList } from './useContainers';
import { Container } from '../types';
import { Goods } from '../../goods/types';
import { AdminLoadingListData, LoadingListItem, getClientColor } from '../types/packingList';

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
    console.log('[DEBUG] Packing list data:', packingData);
    console.log('[DEBUG] Packing list clients:', packingData?.clients);

    let goodsList: any[] = [];
    if (packingData?.clients) {
      packingData.clients.forEach((client: any) => {
        if (client.goods) {
          client.goods.forEach((g: any) => goodsList.push({ ...g, clientId: client.clientId, clientName: client.clientName }));
        }
      });
    }

    if (goodsList.length === 0) {
      const goodsIds = (container as any).goodsIds;
      goodsList = Array.isArray(goodsIds) && goodsIds.length > 0 && typeof goodsIds[0] === 'object'
        ? goodsIds as Goods[]
        : (container.goods || []);
    }

    console.log('[DEBUG] Final goods count:', goodsList.length);
    if (goodsList.length > 0) {
      console.log('[DEBUG] First goods:', JSON.stringify(goodsList[0], null, 2));
    }

    if (goodsList.length === 0) {
      return {
        container,
        items: [],
        clientColors: {},
        summary: {
          totalCBM: 0, totalWeight: 0, totalItems: 0, totalPackages: 0,
          capacityPercentage: 0, maxCBM: MAX_CBM, loadedItems: 0, remainingItems: 0,
          loadedCBM: 0, remainingCBM: MAX_CBM,
        },
      };
    }

    const clientColorMap = new Map<string, string>();
    const uniqueClients = new Set<string>();
    goodsList.forEach((g) => uniqueClients.add(g.clientId || 'unknown'));
    Array.from(uniqueClients).forEach((id, i) => clientColorMap.set(id, getClientColor(i)));

    const items: LoadingListItem[] = [...goodsList]
      .sort((a, b) => (b.weight || 0) - (a.weight || 0))
      .map((goods, index) => {
        const clientId = goods.clientId || 'unknown';
        return {
          sequenceNumber: index + 1,
          goods,
          clientId,
          clientName: goods.clientName || 'Client Inconnu',
          clientColor: clientColorMap.get(clientId) || '#8B5CF6',
          isLoaded: loadedItems.has(goods._id),
        };
      });

    const totalCBM = container.totalCBM || 0;
    const loadedCBM = items.filter((i) => i.isLoaded).reduce((s, i) => s + (i.goods.actualCBM || 0), 0);

    return {
      container,
      items,
      clientColors: Object.fromEntries(clientColorMap),
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

  const weightDistribution = useMemo(() => {
    if (!loadingListData) return [];
    const map = new Map<string, { name: string; weight: number; color: string }>();
    loadingListData.items.forEach((item) => {
      const ex = map.get(item.clientId);
      if (ex) {
        ex.weight += item.goods.weight || 0;
      } else {
        map.set(item.clientId, { name: item.clientName, weight: item.goods.weight || 0, color: item.clientColor });
      }
    });
    const total = loadingListData.summary.totalWeight;
    return Array.from(map.entries())
      .map(([id, d]) => ({ clientId: id, clientName: d.name, weight: d.weight, percentage: total > 0 ? (d.weight / total) * 100 : 0, color: d.color }))
      .sort((a, b) => b.weight - a.weight);
  }, [loadingListData]);

  const progressPercentage = (loadingListData?.summary.totalItems ?? 0) > 0
    ? ((loadingListData?.summary.loadedItems ?? 0) / loadingListData!.summary.totalItems) * 100
    : 0;

  return { container, isContainerLoading, loadingListData, weightDistribution, progressPercentage };
};
