/**
 * Goods Hooks - Enterprise-grade React Query hooks
 */

// Main data hooks
export {
  useGetAllGoods,
  useGetGoodsById,
  useGetGoodsByClient,
  useReceiveGoods,
  useUpdateGoodsLocation,
  useUpdateGoodsPhoto,
  useDeleteGoods,
  useAssignGoodsToContainer,
  useUpdateGoodsStatus,
} from './useGoods';

// Utility hooks
export { useGoodsFormValidation, useCBMCalculation } from './useGoods';

// Query keys for advanced cache management
export { goodsQueryKeys } from './useGoods';

// Form management hook
export { useReceiveGoodsForm } from './useReceiveGoodsForm';
