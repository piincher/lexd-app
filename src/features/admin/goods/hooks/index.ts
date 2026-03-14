/**
 * Goods Hooks - Enterprise-grade React Query hooks
 */

// ============================================
// MAIN DATA HOOKS (from useGoods.ts - comprehensive)
// ============================================
export {
  useGetAllGoods,
  useGetGoodsById,
  useGetGoodsByClient,
  useUpdateGoodsLocation,
  useUpdateGoodsPhoto,
  useDeleteGoods,
  useUpdateGoodsStatus,
} from './useGoods';

// ============================================
// UTILITY HOOKS (from useGoods.ts)
// ============================================
export { useGoodsFormValidation, useCBMCalculation } from './useGoods';

// ============================================
// QUERY KEYS (from useGoods.ts)
// ============================================
export { goodsQueryKeys } from './useGoods';

// ============================================
// SCREEN-SPECIFIC HOOKS
// ============================================
export { useGoodsList } from './useGoodsList';
export { useGoodsDetail } from './useGoodsDetail';
export { useGoodsDetailScreen } from './useGoodsDetailScreen';
// useReceiveGoods is exported from useReceiveGoods.ts below (single source)
export { useReceiveGoodsForm } from './useReceiveGoodsForm';

// ============================================
// FEATURE-SPECIFIC HOOKS
// ============================================
export { useGoodsFilters } from './useGoodsFilters';
export { useGoodsScanner } from './useGoodsScanner';
export { useGoodsAssignment } from './useGoodsAssignment';
export { useGoodsStatus } from './useGoodsStatus';
// useReceiveGoods exported from dedicated file (single source)
export { useReceiveGoods } from './useReceiveGoods';
