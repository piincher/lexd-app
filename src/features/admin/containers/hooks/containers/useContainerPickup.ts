/**
 * Container Pickup Workflow Hooks
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { containerService } from '../../services/ContainerService';
import { containerQueryKeys } from './containerQueryKeys';

export const useMarkReadyForPickup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (containerId: string) =>
      containerService.markReadyForPickup(containerId),
    onSuccess: (_, containerId) => {
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.detail(containerId),
      });
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.lists(),
      });
    },
  });
};

export const useMarkGoodsDelivered = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (goodsId: string) =>
      containerService.markGoodsDelivered(goodsId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.all,
      });
    },
  });
};

export const useMarkContainerDelivered = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (containerId: string) =>
      containerService.updateStatus(containerId, { status: 'DELIVERED' }),
    onSuccess: (_, containerId) => {
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.detail(containerId),
      });
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: ['goods'],
      });
    },
  });
};
