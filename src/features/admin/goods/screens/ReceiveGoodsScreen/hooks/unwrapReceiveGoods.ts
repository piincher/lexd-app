import type { Goods } from '../../../types';

type GoodsEnvelope = Partial<Goods> & {
  data?: GoodsEnvelope;
  goods?: GoodsEnvelope;
};

const isGoodsLike = (value: GoodsEnvelope) => !!(value._id || value.goodsId);

export const unwrapReceiveGoods = (result: unknown): Goods | undefined => {
  if (!result || typeof result !== 'object') return undefined;
  const value = result as GoodsEnvelope;

  if (value.data) {
    const nested = unwrapReceiveGoods(value.data);
    if (nested) return nested;
  }

  if (value.goods) {
    const nested = unwrapReceiveGoods(value.goods);
    if (nested) return nested;
  }

  return isGoodsLike(value) ? (value as Goods) : undefined;
};
