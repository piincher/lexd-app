/**
 * Goods Hooks - Thin re-export composition
 * All implementations moved to focused sub-hooks under goods/
 */

export {
  goodsQueryKeys,
  useGetAllGoods,
  useGetGoodsSummary,
  useGetGoodsById,
  useGetGoodsByClient,
} from './goods/useGoodsQueries';

export { useReceiveGoods } from './goods/useGoodsReceiveMutation';

export {
  useUpdateGoodsLocation,
  useUpdateGoodsPhoto,
  useDeleteGoods,
  useHardDeleteGoods,
  useAssignGoodsToContainer,
  useRemoveGoodsFromContainer,
  useUpdateGoodsStatus,
  useAssignClientToGoods,
  useBatchHardDeleteGoods,
  useResendGoodsNotification,
} from './goods/useGoodsMutations';

export { useGoodsFormValidation } from './goods/useGoodsFormValidation';
export { useCBMCalculation } from './goods/useCBMCalculation';
