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
  useReceiveGoods,  // React Query mutation hook
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
// Note: useReceiveGoods mutation hook is exported from useGoods.ts above
export { useReceiveGoodsForm } from './useReceiveGoodsForm';

// ============================================
// FEATURE-SPECIFIC HOOKS
// ============================================
export { useGoodsFilters } from './useGoodsFilters';
export { useGoodsScanner } from './useGoodsScanner';
export { useGoodsAssignment } from './useGoodsAssignment';
export { useGoodsStatus } from './useGoodsStatus';
// Screen-level orchestrator hook (returns form state, handlers - NOT the mutation)
export { useReceiveGoods as useReceiveGoodsScreen } from './useReceiveGoods';

// ============================================
// MUTATION HOOKS
// ============================================
export { useVoidGoods } from './useVoidGoods';
