/**
 * Container Goods Assignment Hooks
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { containerService } from '../../services/ContainerService';
import { AssignGoodsInput } from '../../types';
import { containerQueryKeys } from './containerQueryKeys';

export const useAssignGoodsToContainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      containerId,
      data,
    }: {
      containerId: string;
      data: AssignGoodsInput;
    }) => containerService.assignGoods(containerId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.detail(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.unassignedGoods(),
      });
      // Customer-side invalidation
      queryClient.invalidateQueries({ queryKey: ['customer-containers'] });
      queryClient.invalidateQueries({ queryKey: ['customer-containers', 'detail', variables.containerId] });
      queryClient.invalidateQueries({ queryKey: ['my-goods'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useRemoveGoodsFromContainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      containerId,
      goodsId,
    }: {
      containerId: string;
      goodsId: string;
    }) => containerService.removeGoods(containerId, goodsId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.detail(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.unassignedGoods(),
      });
      // Customer-side invalidation
      queryClient.invalidateQueries({ queryKey: ['customer-containers'] });
      queryClient.invalidateQueries({ queryKey: ['customer-containers', 'detail', variables.containerId] });
      queryClient.invalidateQueries({ queryKey: ['my-goods'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
