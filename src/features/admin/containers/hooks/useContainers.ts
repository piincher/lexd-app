/**
 * Container Hooks - React Query hooks for container management
 * Phase 3: Container System with Route Integration
 *
 * NOTE: This file is a backward-compatible barrel re-export.
 * New code should import from the focused sub-hooks directly.
 */

export {
  containerQueryKeys,
  useGetAllContainers,
  useGetContainerById,
  useGetContainersByStatus,
  useGetReadyForDeparture,
  useGetUnassignedGoods,
  useGetClientAllocations,
  useGetPackingList,
  useReconcileContainer,
  useCreateContainer,
  useUpdateContainerStatus,
  useArchiveContainer,
  useUnarchiveContainer,
  useDeleteContainer,
  useAssignGoodsToContainer,
  useRemoveGoodsFromContainer,
  useMarkReadyForPickup,
  useMarkGoodsDelivered,
  useMarkContainerDelivered,
  useGetActiveRoutesForMode,
  useContainerStats,
} from './containers';
