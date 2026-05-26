import type { Goods } from '../../../goods/types';
import type { ContainerClientDirectory, ContainerFilterCounts, ContainerHealth } from './containerAssistTypes';
import {
  getClientKey,
  getClientName,
  hasGoodsIssue,
  isDamaged,
  isUnidentified,
  isUnpaid,
  missingLocation,
} from './containerGoodsSignals';

export const buildContainerHealth = (
  goodsList: Goods[],
  capacityValue: number,
  maxCapacity: number,
  capacityPercentage: number,
  isAirContainer: boolean,
  directory?: ContainerClientDirectory,
): ContainerHealth => {
  const totalValue = goodsList.reduce((sum, goods) => sum + (goods.totalCost || 0), 0);
  const totalPaid = goodsList.reduce((sum, goods) => sum + (goods.amountPaid || 0), 0);
  const clientIds = new Set(goodsList.map((goods) => `${getClientKey(goods, directory) || getClientName(goods, directory)}`));

  return {
    goodsCount: goodsList.length,
    clientCount: clientIds.size,
    totalCBM: goodsList.reduce((sum, goods) => sum + (Number(goods.actualCBM) || 0), 0),
    totalWeight: goodsList.reduce((sum, goods) => sum + (Number(goods.weight) || 0), 0),
    totalValue,
    totalPaid,
    balanceDue: Math.max(totalValue - totalPaid, 0),
    unpaidCount: goodsList.filter(isUnpaid).length,
    issueGoodsCount: goodsList.filter((goods) => hasGoodsIssue(goods, directory)).length,
    capacityPercentage,
    remainingCapacity: Math.max(maxCapacity - capacityValue, 0),
    capacityUnit: isAirContainer ? 'kg' : 'CBM',
  };
};

export const buildFilterCounts = (goodsList: Goods[], directory?: ContainerClientDirectory): ContainerFilterCounts => ({
  ALL: goodsList.length,
  ISSUES: goodsList.filter((goods) => hasGoodsIssue(goods, directory)).length,
  UNPAID: goodsList.filter(isUnpaid).length,
  UNIDENTIFIED: goodsList.filter((goods) => isUnidentified(goods, directory)).length,
  DAMAGED: goodsList.filter(isDamaged).length,
  READY: goodsList.filter((goods) => goods.status === 'READY_FOR_PICKUP').length,
  DELIVERED: goodsList.filter((goods) => goods.status === 'DELIVERED').length,
  MISSING_LOCATION: goodsList.filter(missingLocation).length,
});
