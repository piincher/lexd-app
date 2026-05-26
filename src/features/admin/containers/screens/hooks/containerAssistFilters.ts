import type { Goods } from '../../../goods/types';
import type { ContainerAssistFilter, ContainerClientDirectory } from './containerAssistTypes';
import {
  getClientName,
  getClientPhone,
  hasGoodsIssue,
  isDamaged,
  isUnidentified,
  isUnpaid,
  missingLocation,
} from './containerGoodsSignals';

export const filterGoods = (
  goodsList: Goods[],
  searchQuery: string,
  activeFilter: ContainerAssistFilter,
  directory?: ContainerClientDirectory,
) => goodsList.filter((goods) => {
  const matchesFilter =
    activeFilter === 'ALL' ||
    (activeFilter === 'ISSUES' && hasGoodsIssue(goods, directory)) ||
    (activeFilter === 'UNPAID' && isUnpaid(goods)) ||
    (activeFilter === 'UNIDENTIFIED' && isUnidentified(goods, directory)) ||
    (activeFilter === 'DAMAGED' && isDamaged(goods)) ||
    (activeFilter === 'READY' && goods.status === 'READY_FOR_PICKUP') ||
    (activeFilter === 'DELIVERED' && goods.status === 'DELIVERED') ||
    (activeFilter === 'MISSING_LOCATION' && missingLocation(goods));

  if (!matchesFilter) return false;

  const query = searchQuery.trim().toLowerCase();
  if (!query) return true;

  const haystack = [
    goods.goodsId,
    goods.expressTrackingNumber,
    goods.description,
    goods.warehouseLocation,
    getClientName(goods, directory),
    getClientPhone(goods, directory),
  ].join(' ').toLowerCase();

  return haystack.includes(query);
});
