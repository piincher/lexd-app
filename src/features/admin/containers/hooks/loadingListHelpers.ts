import { Theme } from '@src/constants/Theme';
import { Goods } from '../../goods/types';
import { Container } from '../types';
import { LoadingListItem, getClientColor } from '../types/packingList';

export const MAX_CBM = 67;

export const buildGoodsList = (packingData: any, container: Container): any[] => {
  let goodsList: any[] = [];
  if (packingData?.clients) {
    packingData.clients.forEach((client: any) => {
      if (client.goods) {
        client.goods.forEach((g: any) =>
          goodsList.push({ ...g, clientId: client.clientId, clientName: client.clientName }),
        );
      }
    });
  }
  if (goodsList.length === 0) {
    const goodsIds = (container as any).goodsIds;
    goodsList =
      Array.isArray(goodsIds) && goodsIds.length > 0 && typeof goodsIds[0] === 'object'
        ? (goodsIds as Goods[])
        : container.goods || [];
  }
  return goodsList;
};

export const buildClientColorMap = (goodsList: any[]): Map<string, string> => {
  const map = new Map<string, string>();
  const unique = new Set<string>();
  goodsList.forEach((g) => unique.add(g.clientId || 'unknown'));
  Array.from(unique).forEach((id, i) => map.set(id, getClientColor(i)));
  return map;
};

export const buildLoadingListItems = (
  goodsList: any[],
  loadedItems: Set<string>,
): LoadingListItem[] => {
  const colorMap = buildClientColorMap(goodsList);
  return [...goodsList]
    .sort((a, b) => (b.weight || 0) - (a.weight || 0))
    .map((goods, index) => {
      const clientId = goods.clientId || 'unknown';
      return {
        sequenceNumber: index + 1,
        goods,
        clientId,
        clientName: goods.clientName || 'Client Inconnu',
        clientColor: colorMap.get(clientId) || Theme.primary.main,
        isLoaded: loadedItems.has(goods._id),
      };
    });
};

export const buildEmptySummary = () => ({
  totalCBM: 0,
  totalWeight: 0,
  totalItems: 0,
  totalPackages: 0,
  capacityPercentage: 0,
  maxCBM: MAX_CBM,
  loadedItems: 0,
  remainingItems: 0,
  loadedCBM: 0,
  remainingCBM: MAX_CBM,
});
