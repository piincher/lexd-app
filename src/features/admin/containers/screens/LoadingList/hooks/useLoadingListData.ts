import { useMemo } from 'react';
import { Theme } from '@src/constants/Theme';
import { useGetContainerById, useGetPackingList } from '../../../hooks';
import { Container } from '../../../types';
import { Goods } from '../../../../goods/types';
import { AdminLoadingListData, ClientGoodsGroup, LoadingListItem, getClientColor } from '../../../types/packingList';

export const MAX_CBM = 67;

type PackingData = {
  clients?: ClientGoodsGroup[];
  container?: { consignee?: Container['consigneeId'] | null };
};
type PackingEnvelope = { data?: PackingData | { data?: PackingData } };
type LoadingContainer = Container & { consignee?: Container['consigneeId'] | null };

const unwrapPackingData = (response: unknown): PackingData | null => {
  const envelope = response as PackingEnvelope | null | undefined;
  const data = envelope?.data;
  if (data && 'data' in data) return data.data || null;
  return (data || response || null) as PackingData | null;
};

const getGoodsClientId = (goods: Goods) => (
  typeof goods.clientId === 'string' && goods.clientId
    ? goods.clientId
    : goods.client?._id || goods.client?.id || 'unknown'
);

const getGoodsClientName = (goods: Goods) => {
  const fullName = [goods.client?.firstName, goods.client?.lastName].filter(Boolean).join(' ');
  return goods.clientName || goods.client?.name || fullName || 'Client Inconnu';
};

export const useLoadingListData = (containerId: string, loadedItems: Set<string>) => {
  const { data: containerResponse, isLoading: isContainerLoading } = useGetContainerById(containerId);
  const container: Container | undefined = containerResponse?.data?.container || containerResponse?.data;
  const { data: packingListResponse } = useGetPackingList(containerId);

  const loadingListData = useMemo<AdminLoadingListData | null>(() => {
    if (!container) return null;
    const packingData = unwrapPackingData(packingListResponse);
    const typedContainer = container as LoadingContainer;
    const documentContainer = {
      ...container,
      consignee: typedContainer.consignee ||
        (typeof container.consigneeId === 'object' ? container.consigneeId : null) ||
        packingData?.container?.consignee,
    };
    let goodsList: Goods[] = [];
    if (packingData?.clients) {
      packingData.clients.forEach((client) => {
        client.goods.forEach((goods) => {
          goodsList.push({ ...goods, clientId: client.clientId, clientName: client.clientName });
        });
      });
    }
    if (goodsList.length === 0) {
      const goodsIds = container.goodsIds;
      goodsList = Array.isArray(goodsIds) && goodsIds.length > 0 && typeof goodsIds[0] === 'object' ? goodsIds as Goods[] : (container.goods || []);
    }
    if (goodsList.length === 0) {
      return { container: documentContainer, items: [], clientColors: {}, summary: { totalCBM: 0, totalWeight: 0, totalItems: 0, totalPackages: 0, capacityPercentage: 0, maxCBM: MAX_CBM, loadedItems: 0, remainingItems: 0, loadedCBM: 0, remainingCBM: MAX_CBM } };
    }

    const clientColorMap = new Map<string, string>();
    const uniqueClients = new Set<string>();
    goodsList.forEach((goods) => uniqueClients.add(getGoodsClientId(goods)));
    Array.from(uniqueClients).forEach((id, i) => clientColorMap.set(id, getClientColor(i)));

    const items: LoadingListItem[] = [...goodsList].sort((a, b) => (b.weight || 0) - (a.weight || 0)).map((goods, i) => {
      const clientId = getGoodsClientId(goods);
      return { sequenceNumber: i + 1, goods, clientId, clientName: getGoodsClientName(goods), clientColor: clientColorMap.get(clientId) || Theme.primary.main, isLoaded: loadedItems.has(goods._id) };
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
