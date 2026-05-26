import { ClientGoodsGroup } from '../../../types/packingList';

export type GoodsItem = ClientGoodsGroup['goods'][number];
type LooseGoods = GoodsItem & { client?: Record<string, unknown> };

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const toArray = <T>(value: unknown): T[] => (Array.isArray(value) ? value as T[] : []);
export const toNumber = (value: unknown): number =>
  typeof value === 'number' ? value : Number(value) || 0;
export const toText = (value: unknown, fallback = ''): string =>
  value === undefined || value === null || value === '' ? fallback : String(value);

export const unwrapPackingData = (response: unknown): Record<string, unknown> | null => {
  const apiData = isRecord(response) && response.data ? response.data : response;
  if (!isRecord(apiData)) return null;
  return isRecord(apiData.data) ? apiData.data : apiData;
};

export const mapClientGroup = (apiClient: Record<string, unknown>): ClientGoodsGroup => {
  const summary = isRecord(apiClient.summary) ? apiClient.summary : {};
  const goods = toArray<GoodsItem>(apiClient.goods);
  return {
    clientId: toText(apiClient.clientId, toText(apiClient.clientName, 'unknown')),
    clientName: toText(apiClient.clientName, 'Client Inconnu'),
    clientPhone: toText(apiClient.clientPhone, 'N/A'),
    clientEmail: toText(apiClient.clientEmail) || undefined,
    goods,
    summary: {
      totalCBM: toNumber(summary.totalCBM),
      totalWeight: toNumber(summary.totalWeight),
      totalItems: toNumber(summary.totalItems) || goods.length,
      totalQuantity: toNumber(summary.totalQuantity) ||
        goods.reduce((sum, item) => sum + toNumber(item.quantity || 1), 0),
      totalCost: toNumber(summary.totalCost),
      totalPaid: toNumber(summary.totalPaid),
      balanceDue: toNumber(summary.balanceDue),
    },
  };
};

export const groupGoodsByClient = (goodsList: GoodsItem[]): ClientGoodsGroup[] => {
  const clientMap = new Map<string, ClientGoodsGroup>();
  goodsList.forEach((goods) => {
    const goodsClient = (goods as LooseGoods).client;
    const client = isRecord(goodsClient) ? goodsClient : {};
    const clientName = toText(client.name, 'Client Inconnu');
    const clientId = toText(client.id ?? client._id, clientName);
    if (!clientMap.has(clientId)) clientMap.set(clientId, createClientGroup(clientId, clientName, client));
    const group = clientMap.get(clientId)!;
    group.goods.push(goods);
    group.summary.totalCBM += toNumber(goods.actualCBM);
    group.summary.totalWeight += toNumber(goods.weight);
    group.summary.totalItems += 1;
    group.summary.totalQuantity += toNumber(goods.quantity || 1);
    group.summary.totalCost += toNumber(goods.totalCost);
    group.summary.totalPaid += toNumber(goods.amountPaid);
    group.summary.balanceDue += Math.max(0, toNumber(goods.totalCost) - toNumber(goods.amountPaid));
  });
  return Array.from(clientMap.values());
};

const createClientGroup = (
  clientId: string,
  clientName: string,
  client: Record<string, unknown>
): ClientGoodsGroup => ({
  clientId,
  clientName,
  clientPhone: toText(client.phone ?? client.phoneNumber, 'N/A'),
  goods: [],
  summary: {
    totalCBM: 0,
    totalWeight: 0,
    totalItems: 0,
    totalQuantity: 0,
    totalCost: 0,
    totalPaid: 0,
    balanceDue: 0,
  },
});
