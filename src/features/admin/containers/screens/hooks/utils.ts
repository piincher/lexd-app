import { Container, ContainerStatus, CONTAINER_STATUS_COLORS, CONTAINER_STATUS_LABELS } from '../../types';
import { Goods } from '../../../goods/types';
import { CbmProfit, DualLedger } from '../../types/containerProfit';
import { Theme } from '@src/constants/Theme';

export const MAX_CBM = 67;
export const MAX_WEIGHT = 28000;

export const TIMELINE_STEPS: ContainerStatus[] = [
  'BOOKED', 'EMPTY_TO_WAREHOUSE', 'LOADING', 'LOADED',
  'GATE_IN_FULL', 'LOADED_ON_VESSEL', 'IN_TRANSIT', 'ARRIVED',
  'DISCHARGED', 'READY_FOR_PICKUP',
];

export const getGoodsList = (container: Container | undefined): Goods[] => {
  if (!container) return [];
  const g = (container as any).goodsIds;
  return (Array.isArray(g) && g.length > 0 && typeof g[0] === 'object') ? g as Goods[] : container?.goods || [];
};

export const getCapacityInfo = (container: Container | undefined, goodsList: Goods[]) => {
  const isAirContainer = container?.shippingMode === 'AIR';
  const totalWeight = goodsList.reduce((sum, g: any) => sum + (parseFloat(g?.weight) || 0), 0);
  const capacityValue = isAirContainer ? totalWeight : (container?.totalCBM || 0);
  const maxCapacity = isAirContainer ? MAX_WEIGHT : MAX_CBM;
  const fillPercentage = container ? Math.min((capacityValue / maxCapacity) * 100, 100) : 0;
  const fillColor = fillPercentage >= 90 ? Theme.status.error : fillPercentage >= 70 ? Theme.status.warning : Theme.status.success;
  return { isAirContainer, totalWeight, capacityValue, maxCapacity, fillPercentage, fillColor };
};

export const getContainerStatusInfo = (container: Container | undefined) => ({
  statusColor: container ? CONTAINER_STATUS_COLORS[container.status] : Theme.primary.main,
  statusLabel: container ? CONTAINER_STATUS_LABELS[container.status] : '',
  currentStatusIndex: container ? TIMELINE_STEPS.indexOf(container.status) : -1,
});

export const normalizeCbmProfit = (containerResponse: any, goodsList: Goods[]): CbmProfit | null => {
  const rawCbmProfit: CbmProfit | null = containerResponse?.data?.cbmProfit ?? null;
  if (!rawCbmProfit) return null;

  const normalized: CbmProfit = {
    ...rawCbmProfit,
    revenue: rawCbmProfit.revenue ?? 0,
    collected: rawCbmProfit.collected ?? 0,
    cost: rawCbmProfit.cost ?? 0,
    profit: rawCbmProfit.profit ?? 0,
    profitMargin: rawCbmProfit.profitMargin ?? 0,
    totalCBM: rawCbmProfit.totalCBM ?? 0,
    cbmCostPerUnit: rawCbmProfit.cbmCostPerUnit ?? 0,
  };

  if (!goodsList.length || (normalized.dualLedger && normalized.dualLedger.clientTotalCBM > 0)) return normalized;

  const clientTotalCBM = goodsList.reduce((sum, g: any) => sum + (parseFloat(g?.actualCBM) || 0), 0);
  if (clientTotalCBM <= 0) return normalized;

  const clientUnitPrice = 300000;
  const agentUnitCost = normalized.dualLedger?.agentUnitCost || normalized.cbmCostPerUnit || 278000;
  const clientTotalRevenue = clientTotalCBM * clientUnitPrice;
  const realTimeProfit = clientTotalRevenue - (clientTotalCBM * agentUnitCost);

  const dualLedger: DualLedger = {
    ...(normalized.dualLedger || {}),
    clientTotalCBM,
    clientTotalRevenue,
    realTimeProfit,
    agentUnitCost,
    reconciliationStatus: normalized.dualLedger?.reconciliationStatus || 'PENDING',
  } as DualLedger;

  return { ...normalized, totalCBM: clientTotalCBM, dualLedger };
};

export const extractConsignee = (container: Container | undefined) => {
  const c = container as any;
  return c?.consigneeId && typeof c.consigneeId === 'object'
    ? { name: c.consigneeId.name, phone: c.consigneeId.phone, warehouseAddress: c.consigneeId.warehouseAddress }
    : undefined;
};
