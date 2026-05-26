/**
 * Goods Mutation Hooks - Update, delete, assign operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goodsService } from '../../services/GoodsService';
import { AssignToContainerInput, AssignClientToGoodsInput } from '../../types';
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

export const useHardDeleteGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => goodsService.delete(id, true),
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

/**
 * Re-trigger the customer "goods received" notifications on demand. Used from the goods
 * detail screen when the original WhatsApp dispatch reported FAILED — re-uses the same
 * server-side flow as the receive endpoint and returns the per-channel result.
 *
 * No cache invalidation: this doesn't mutate the goods document itself.
 */
export const useResendGoodsNotification = () => {
  return useMutation({
    mutationFn: (id: string) => goodsService.resendNotification(id),
  });
};

/**
 * Bulk hard delete. Single round-trip regardless of selection size — backend uses
 * updateMany per related collection + deleteMany, so this scales to hundreds at once.
 * Invalidates the list cache on success so the deleted rows disappear.
 */
export const useBatchHardDeleteGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goodsIds, reason }: { goodsIds: string[]; reason?: string }) =>
      goodsService.batchHardDelete(goodsIds, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};

/**
 * Assign a client to previously-unidentified goods. On success the backend has already
 * fired the customer "arrived at warehouse" notification, so we just invalidate the
 * detail + lists caches to refresh the UI.
 */
export const useAssignClientToGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goodsId, clientId, notes }: AssignClientToGoodsInput) =>
      goodsService.assignClient(goodsId, { clientId, notes }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.detail(variables.goodsId) });
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    },
  });
};
