import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminGoodsApi, ReceiveGoodsInput } from '../api';

export const useReceiveGoods = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ReceiveGoodsInput | FormData) => {
      // Check if data is FormData (has photo)
      if (data instanceof FormData) {
        return adminGoodsApi.receiveWithPhoto(data);
      }
      return adminGoodsApi.receive(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-goods'] });
    },
  });
};

export const useUpdateGoodsLocation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, location }: { id: string; location: string }) =>
      adminGoodsApi.updateLocation(id, { location }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['admin-goods', variables.id],
      });
    },
  });
};

export const useDeleteGoods = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminGoodsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-goods'] });
    },
  });
};

export const useHardDeleteGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminGoodsApi.hardDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-goods'] });
    },
  });
};

export const useAssignGoodsToContainer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ containerId, goodsIds }: { containerId: string; goodsIds: string[] }) =>
      adminGoodsApi.assignToContainer(containerId, goodsIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-goods'] });
    },
  });
};
