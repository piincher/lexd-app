import { useCallback, useState } from 'react';
import { goodsService } from '../../../services/GoodsService';
import type { Goods } from '../../../types';
import { unwrapReceiveGoods } from './unwrapReceiveGoods';

export const useReceiveLabel = () => {
  const [labelGoods, setLabelGoods] = useState<Goods | null>(null);
  const [visible, setVisible] = useState(false);

  const prepareLabel = useCallback(async (result: unknown, open = false) => {
    const goods = unwrapReceiveGoods(result);
    if (!goods) return null;

    if (goods.qrCodeImageUrl || !goods._id) {
      setLabelGoods(goods);
      if (open) setVisible(true);
      return goods;
    }

    try {
      const details = await goodsService.getById(goods._id);
      const detailedGoods = unwrapReceiveGoods(details) || goods;
      setLabelGoods(detailedGoods);
      if (open) setVisible(true);
      return detailedGoods;
    } catch {
      setLabelGoods(goods);
      if (open) setVisible(true);
      return goods;
    }
  }, []);

  const openLabel = useCallback(() => {
    if (labelGoods) setVisible(true);
  }, [labelGoods]);

  const dismissLabel = useCallback(() => setVisible(false), []);

  return { labelGoods, labelVisible: visible, prepareLabel, openLabel, dismissLabel };
};
