import { useMemo } from 'react';
import { Goods } from '../../../../goods/types';
import { Container } from '../../../types';

export const useAssignGoodsFilter = (
  unassignedGoods: Goods[],
  container: Container | undefined,
  searchQuery: string,
) => {
  const modeFilteredGoods = useMemo(() => {
    if (!container?.shippingMode) return unassignedGoods;
    return unassignedGoods.filter((g) => g.shippingMode === container.shippingMode);
  }, [unassignedGoods, container?.shippingMode]);

  const filteredGoods = useMemo(() => {
    if (!searchQuery.trim()) return modeFilteredGoods;
    const query = searchQuery.toLowerCase();
    return modeFilteredGoods.filter((goods) => {
      const goodsIdMatch = goods.goodsId.toLowerCase().includes(query);
      const clientNameMatch =
        typeof goods.clientId === 'object' &&
        goods.clientId &&
        (goods.clientId.firstName.toLowerCase().includes(query) ||
          goods.clientId.lastName.toLowerCase().includes(query));
      return goodsIdMatch || clientNameMatch;
    });
  }, [searchQuery, modeFilteredGoods]);

  return { filteredGoods, modeFilteredGoods };
};
