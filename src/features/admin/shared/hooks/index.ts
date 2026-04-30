/**
 * Admin Shared Hooks
 * Cross-sub-feature hooks that multiple admin modules depend on.
 * Import from here instead of directly from sibling sub-features.
 */

export { useGetAllOrders } from "@src/features/admin/orders/hooks/useOrderManagement";
export { useGetAllGoods } from "@src/features/admin/goods/hooks/useGoods";
export {
  containerQueryKeys,
  useGetAllContainers,
  useGetUnassignedGoods,
} from "@src/features/admin/containers/hooks/useContainers";
export {
  useGetAllAirwayBills,
  useAssignGoodsToAirwayBill,
  useRemoveGoodsFromAirwayBill,
} from "@src/features/admin/airwayBills/hooks/useAirwayBills";
