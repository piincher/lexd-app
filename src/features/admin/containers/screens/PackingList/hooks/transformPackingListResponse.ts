import { AdminPackingListData, PackingListContainer } from '../../../types/packingList';
import {
  GoodsItem,
  groupGoodsByClient,
  isRecord,
  mapClientGroup,
  toArray,
  toNumber,
  toText,
  unwrapPackingData,
} from './transformPackingListHelpers';

export const transformPackingListResponse = (
  packingListResponse: unknown
): AdminPackingListData | null => {
  const packingData = unwrapPackingData(packingListResponse);
  const apiSummary = isRecord(packingData?.summary) ? packingData.summary : null;
  if (!packingData || !apiSummary) {
    return null;
  }

  const apiContainer = isRecord(packingData.container) ? packingData.container : {};
  const goodsList = toArray<GoodsItem>(packingData.goods);
  const apiClients = toArray<Record<string, unknown>>(packingData.clients);
  const clients = apiClients.length > 0
    ? apiClients.map(mapClientGroup)
    : groupGoodsByClient(goodsList);
  const totalCBM = toNumber(apiSummary.totalCBM);
  const totalWeight = toNumber(apiSummary.totalWeight);
  const maxCBM = toNumber(apiContainer.capacityCBM) || 67;
  const capacityPercentage =
    toNumber(apiSummary.utilizedCapacityPercentage) || (totalCBM > 0 ? (totalCBM / maxCBM) * 100 : 0);
  const calculatedTotalQuantity = clients.reduce(
    (sum, client) =>
      sum + (client.summary.totalQuantity || client.goods.reduce(
        (goodsSum, goods) => goodsSum + toNumber(goods.quantity || 1),
        0
      )),
    0
  );
  const calculatedTotalItems = clients.reduce(
    (sum, client) => sum + (client.summary.totalItems || client.goods.length),
    0
  );
  const totalItemsCount =
    toNumber(apiSummary.totalPieces) ||
    toNumber(apiSummary.totalItems) ||
    calculatedTotalItems ||
    goodsList.length;

  return {
    container: {
      id: toText(apiContainer.id),
      number: toText(apiContainer.virtualContainerNumber, toText(apiContainer.number)),
      shippingLine: toText(apiContainer.shippingLine),
      shippingLineLabel: toText(apiContainer.shippingLine),
      shippingMode: toText(apiContainer.shippingMode),
      status: toText(apiContainer.status),
      statusLabel: toText(apiContainer.status),
      consignee: (isRecord(apiContainer.consignee) ? apiContainer.consignee : null) as PackingListContainer['consignee'],
      route: (isRecord(apiContainer.route) ? apiContainer.route : null) as PackingListContainer['route'],
    },
    clients,
    summary: {
      totalCBM,
      totalWeight,
      totalItems: totalItemsCount,
      totalPackages: totalItemsCount,
      totalQuantity: toNumber(apiSummary.totalQuantity) || calculatedTotalQuantity,
      capacityPercentage,
      remainingCBM: Math.max(0, maxCBM - totalCBM),
      maxCBM,
    },
    generatedAt: toText(packingData.generatedAt),
    generatedBy: toText(packingData.generatedBy) || undefined,
  } as AdminPackingListData;
};
