import { AdminPackingListData, ClientGoodsGroup } from '../../../types/packingList';

export const transformPackingListResponse = (packingListResponse: any): AdminPackingListData | null => {
  const apiData = packingListResponse?.data;
  if (!apiData) return null;

  const packingData = apiData.data || apiData;
  if (!packingData || !packingData.summary) {
    console.warn('[PackingList] Invalid data structure:', packingData);
    return null;
  }

  const apiContainer = packingData.container;
  const container = {
    id: apiContainer.id,
    number: apiContainer.virtualContainerNumber || apiContainer.number,
    shippingLine: apiContainer.shippingLine,
    shippingLineLabel: apiContainer.shippingLine,
    shippingMode: apiContainer.shippingMode,
    status: apiContainer.status,
    statusLabel: apiContainer.status,
    consignee: apiContainer.consignee,
    route: apiContainer.route,
  };

  const goodsList = packingData.goods || [];
  let clients: ClientGoodsGroup[] = [];

  if (packingData.clients && packingData.clients.length > 0) {
    clients = packingData.clients.map((apiClient: any) => ({
      clientId: apiClient.clientId?.toString() || apiClient.clientId,
      clientName: apiClient.clientName,
      clientPhone: apiClient.clientPhone || 'N/A',
      clientEmail: apiClient.clientEmail,
      goods: apiClient.goods || [],
      summary: {
        totalCBM: apiClient.summary?.totalCBM || 0,
        totalWeight: apiClient.summary?.totalWeight || 0,
        totalItems: apiClient.summary?.totalItems || 0,
        totalQuantity: apiClient.summary?.totalQuantity || 0,
        totalCost: apiClient.summary?.totalCost || 0,
        totalPaid: apiClient.summary?.totalPaid || 0,
        balanceDue: apiClient.summary?.balanceDue || 0,
      },
    }));
  } else if (goodsList.length > 0) {
    const clientMap = new Map<string, ClientGoodsGroup>();
    goodsList.forEach((goods: any) => {
      const client = goods.client || {};
      const clientName = client.name || 'Client Inconnu';
      const clientId = client.id || client._id || clientName;
      if (!clientMap.has(clientId)) {
        clientMap.set(clientId, {
          clientId,
          clientName,
          clientPhone: client.phone || client.phoneNumber || 'N/A',
          goods: [],
          summary: { totalCBM: 0, totalWeight: 0, totalItems: 0, totalQuantity: 0, totalCost: 0, totalPaid: 0, balanceDue: 0 },
        });
      }
      const group = clientMap.get(clientId)!;
      group.goods.push(goods);
      group.summary.totalCBM += goods.actualCBM || 0;
      group.summary.totalWeight += goods.weight || 0;
      group.summary.totalItems += 1;
      group.summary.totalQuantity += goods.quantity || 1;
      group.summary.totalCost += goods.totalCost || 0;
      group.summary.totalPaid += goods.amountPaid || 0;
      group.summary.balanceDue += Math.max(0, (goods.totalCost || 0) - (goods.amountPaid || 0));
    });
    clients = Array.from(clientMap.values());
  }

  const apiSummary = packingData.summary;
  const totalCBM = apiSummary.totalCBM || 0;
  const totalWeight = apiSummary.totalWeight || 0;
  const maxCBM = apiContainer.capacityCBM || 67;
  const capacityPercentage = apiSummary.utilizedCapacityPercentage || (totalCBM > 0 ? (totalCBM / maxCBM) * 100 : 0);

  // Calculate total quantity as sum of all goods quantities (not just count)
  const calculatedTotalQuantity = goodsList.reduce((sum: number, g: any) => sum + (g.quantity || 1), 0);
  const totalItemsCount = apiSummary.totalPieces || apiSummary.totalItems || goodsList.length;

  const summary = {
    totalCBM,
    totalWeight,
    totalItems: totalItemsCount,
    totalPackages: totalItemsCount,
    totalQuantity: apiSummary.totalQuantity || calculatedTotalQuantity,
    capacityPercentage,
    remainingCBM: Math.max(0, maxCBM - totalCBM),
    maxCBM,
  };

  return {
    container,
    clients,
    summary,
    generatedAt: packingData.generatedAt,
    generatedBy: packingData.generatedBy,
  } as AdminPackingListData;
};
