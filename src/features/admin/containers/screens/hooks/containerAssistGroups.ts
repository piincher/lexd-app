import type { Goods } from '../../../goods/types';
import type { ContainerClientDirectory, ContainerClientGroup } from './containerAssistTypes';
import { getClientKey, getClientName, getClientPhone, hasGoodsIssue } from './containerGoodsSignals';

export const buildClientGroups = (goodsList: Goods[], directory?: ContainerClientDirectory): ContainerClientGroup[] => {
  const groups = new Map<string, ContainerClientGroup>();

  goodsList.forEach((goods) => {
    const key = getClientKey(goods, directory);
    const existing = groups.get(key) || {
      clientId: key,
      clientName: getClientName(goods, directory),
      clientPhone: getClientPhone(goods, directory),
      goods: [],
      issueCount: 0,
      summary: { totalCBM: 0, totalWeight: 0, totalItems: 0, totalValue: 0, totalPaid: 0, balanceDue: 0 },
    };

    existing.goods.push(goods);
    existing.issueCount += hasGoodsIssue(goods, directory) ? 1 : 0;
    existing.summary.totalCBM += Number(goods.actualCBM) || 0;
    existing.summary.totalWeight += Number(goods.weight) || 0;
    existing.summary.totalItems += goods.quantity || 1;
    existing.summary.totalValue += goods.totalCost || 0;
    existing.summary.totalPaid += goods.amountPaid || 0;
    existing.summary.balanceDue = Math.max(existing.summary.totalValue - existing.summary.totalPaid, 0);
    groups.set(key, existing);
  });

  return Array.from(groups.values()).sort((a, b) => b.issueCount - a.issueCount || a.clientName.localeCompare(b.clientName));
};
