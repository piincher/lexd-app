/**
 * useGoodsAssignment - Hook for container assignment operations
 * SRP: Assign/unassign goods to/from containers with optimistic updates
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goodsService } from '../services/GoodsService';
import { goodsQueryKeys } from './useGoods';
import { showSuccessToast, showErrorToast } from '@src/app/lib/toast';

interface AssignmentData {
  containerId: string;
  goodsIds: string[];
}

export const useGoodsAssignment = (goodsId: string) => {
  const queryClient = useQueryClient();

  const assignMutation = useMutation({
    mutationFn: ({ containerId, goodsIds }: AssignmentData) =>
      goodsService.assignToContainer(containerId, goodsIds),
    onMutate: async ({ containerId }) => {
      await queryClient.cancelQueries({ queryKey: goodsQueryKeys.detail(goodsId) });
      const previousGoods = queryClient.getQueryData(goodsQueryKeys.detail(goodsId));
      queryClient.setQueryData(goodsQueryKeys.detail(goodsId), (old: any) => ({
        ...old,
        data: { ...old?.data, containerId, status: 'in_container' },
      }));
      return { previousGoods };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(goodsQueryKeys.detail(goodsId), context?.previousGoods);
      showErrorToast("Erreur lors de l'assignation");
    },
    onSuccess: () => {
      showSuccessToast('Marchandise assignée');
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.detail(goodsId) });
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });

  const unassignMutation = useMutation({
    mutationFn: () => goodsService.assignToContainer('', [goodsId]),
    onSuccess: () => {
      showSuccessToast('Marchandise retirée du conteneur');
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.detail(goodsId) });
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
    onError: () => showErrorToast('Erreur lors du retrait'),
  });

  return {
    assignToContainer: (containerId: string) =>
      assignMutation.mutateAsync({ containerId, goodsIds: [goodsId] }),
    unassignFromContainer: () => unassignMutation.mutateAsync(),
    isAssigning: assignMutation.isPending,
    isUnassigning: unassignMutation.isPending,
  };
};
