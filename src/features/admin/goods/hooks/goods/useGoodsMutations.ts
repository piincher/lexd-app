/**
 * Goods Mutation Hooks - Update, delete, assign operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goodsService } from '../../services/GoodsService';
import { AssignToContainerInput } from '../../types';
import { goodsQueryKeys } from './useGoodsQueries';

export const useUpdateGoodsLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, location }: { id: string; location: string }) =>
      goodsService.updateLocation(id, location),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};

export const useUpdateGoodsPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      photoUri,
      onProgress,
    }: {
      id: string;
      photoUri: string;
      onProgress?: (progress: number) => void;
    }) => goodsService.updatePhoto(id, photoUri, onProgress),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};

export const useDeleteGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, permanent = false }: { id: string; permanent?: boolean }) =>
      goodsService.delete(id, permanent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};

export const useAssignGoodsToContainer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ containerId, goodsIds }: AssignToContainerInput) =>
      goodsService.assignToContainer(containerId, goodsIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};

export const useUpdateGoodsStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      goodsService.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};
