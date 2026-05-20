/**
 * Goods Hooks - Enterprise-grade React Query hooks
 */

// ============================================
// QUERY KEYS
// ============================================
export { goodsQueryKeys } from './goods/useGoodsQueries';

// ============================================
// READ HOOKS
// ============================================
export {
  useGetAllGoods,
  useGetGoodsById,
  useGetGoodsByClient,
} from './goods/useGoodsQueries';

// ============================================
// MUTATION HOOKS
// ============================================
export { useReceiveGoods } from './goods/useGoodsReceiveMutation';
export {
  useUpdateGoodsLocation,
  useUpdateGoodsPhoto,
  useDeleteGoods,
  useHardDeleteGoods,
  useUpdateGoodsStatus,
} from './goods/useGoodsMutations';

// ============================================
// UTILITY HOOKS
// ============================================
export { useGoodsFormValidation } from './goods/useGoodsFormValidation';
export { useCBMCalculation } from './goods/useCBMCalculation';

// ============================================
// SCREEN-SPECIFIC HOOKS
// ============================================
export { useGoodsList } from './useGoodsList';
export { useGoodsListFilters } from './useGoodsListFilters';
export { useGoodsListData } from './useGoodsListData';
// Note: useReceiveGoods mutation hook is exported from goods/ above
export { useReceiveGoodsForm } from './useReceiveGoodsForm';

// ============================================
// RECEIVE FORM SUB-HOOKS
// ============================================
export {
  useReceiveFormState,
  useReceiveFormClient,
  useReceiveFormPhotos,
  useReceiveFormDimensions,
  useReceiveFormErrors,
  useReceiveFormValidation,
  useReceiveFormComputations,
  useReceiveFormSubmit,
} from './receiveForm';

// ============================================
// FEATURE-SPECIFIC HOOKS
// ============================================
export { useGoodsFilters } from './useGoodsFilters';
export { useGoodsScanner } from './useGoodsScanner';
export { useGoodsAssignment } from './useGoodsAssignment';
export { useGoodsStatus } from './useGoodsStatus';
// Screen-level orchestrator hook (returns form state, handlers - NOT the mutation)
export { useReceiveGoods as useReceiveGoodsScreen } from './useReceiveGoods';

// Void goods list screen hook
export { useVoidGoodsList } from './useVoidGoodsList';

// Void goods screen orchestrator hook
export { useVoidGoodsScreen } from './useVoidGoodsScreen';

// ============================================
// VOID MUTATION HOOKS
// ============================================
export { useVoidGoods } from './useVoidGoods';
