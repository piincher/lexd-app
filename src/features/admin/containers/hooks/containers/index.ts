/**
 * Container Hooks - Focused sub-hooks for container management
 */

export { containerQueryKeys } from './containerQueryKeys';

export {
  useGetAllContainers,
  useGetContainerById,
  useGetContainersByStatus,
  useGetReadyForDeparture,
} from './useContainerList';

export {
  useGetUnassignedGoods,
  useGetClientAllocations,
  useGetPackingList,
  useReconcileContainer,
} from './useContainerGoods';

export {
  useCreateContainer,
  useUpdateContainerStatus,
  useArchiveContainer,
  useUnarchiveContainer,
  useDeleteContainer,
} from './useContainerMutations';

export {
  useAssignGoodsToContainer,
  useRemoveGoodsFromContainer,
} from './useContainerAssignments';

export {
  useMarkReadyForPickup,
  useMarkGoodsDelivered,
  useMarkContainerDelivered,
} from './useContainerPickup';

export { useGetActiveRoutesForMode } from './useContainerRoutes';

export { useContainerStats } from './useContainerStats';
