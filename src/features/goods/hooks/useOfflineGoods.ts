/**
 * Offline-Aware Goods Hooks
 * Re-export barrel for backward compatibility.
 * @deprecated Import from './offline' directly for tree-shaking.
 */

export {
  GOODS_KEYS,
  useGoodsList,
  useGoodsDetail,
  useCreateGoods,
  useUpdateGoods,
  useDeleteGoods,
  useReceiveGoods,
} from './offline';
