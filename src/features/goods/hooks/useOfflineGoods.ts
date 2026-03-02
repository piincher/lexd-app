/**
 * Offline-Aware Goods Hooks
 * Real-world example of offline mutations for goods feature
 */

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useOfflineMutation, CACHE_STRATEGIES } from '../../../shared';
import { goodsApi } from '../api/goodsApi';
import type { Goods, CreateGoodsInput, UpdateGoodsInput } from '../types';

// Query keys
const GOODS_KEYS = {
  all: ['goods'] as const,
  lists: () => [...GOODS_KEYS.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...GOODS_KEYS.lists(), filters] as const,
  details: () => [...GOODS_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...GOODS_KEYS.details(), id] as const,
};

/**
 * Hook to fetch goods list with offline support
 */
export const useGoodsList = (filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: GOODS_KEYS.list(filters),
    queryFn: () => goodsApi.getGoodsList(filters),
    // Use goods list cache strategy - 5 min stale, 24 hours cache
    staleTime: CACHE_STRATEGIES.GOODS_LIST.staleTime,
    gcTime: CACHE_STRATEGIES.GOODS_LIST.gcTime,
    // Keep data when offline
    networkMode: 'offlineFirst',
  });
};

/**
 * Hook to fetch single goods with offline support
 */
export const useGoodsDetail = (id: string) => {
  return useQuery({
    queryKey: GOODS_KEYS.detail(id),
    queryFn: () => goodsApi.getGoodsById(id),
    staleTime: CACHE_STRATEGIES.GOODS_LIST.staleTime,
    gcTime: CACHE_STRATEGIES.GOODS_LIST.gcTime,
    enabled: !!id,
    networkMode: 'offlineFirst',
  });
};

/**
 * Hook to create goods with offline support
 */
export const useCreateGoods = () => {
  const queryClient = useQueryClient();

  return useOfflineMutation(
    {
      mutationType: 'CREATE',
      endpoint: '/api/goods',
      mutationFn: (data: CreateGoodsInput) => goodsApi.createGoods(data),
      
      // Optimistic update - add to list immediately
      onOptimisticUpdate: async (variables, qc) => {
        const tempId = `temp-${Date.now()}`;
        const tempGoods: Goods = {
          id: tempId,
          ...variables,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Goods;

        // Add to list
        qc.setQueryData(GOODS_KEYS.lists(), (old: Goods[] = []) => [
          tempGoods,
          ...old,
        ]);

        return { tempId, tempGoods };
      },

      // Replace temp item with real data on success
      onSuccess: (data, variables, context: any) => {
        queryClient.setQueryData(GOODS_KEYS.lists(), (old: Goods[] = []) =>
          old.map((item) =>
            item.id === context?.tempId ? { ...data, id: data.id } : item
          )
        );
      },

      // Rollback on error
      onRollback: async (variables, context: any, qc) => {
        qc.setQueryData(GOODS_KEYS.lists(), (old: Goods[] = []) =>
          old.filter((item) => item.id !== context?.tempId)
        );
      },

      metadata: { entityType: 'goods' },
      queuePriority: 'high',
    },
    queryClient
  );
};

/**
 * Hook to update goods with offline support
 */
export const useUpdateGoods = () => {
  const queryClient = useQueryClient();

  return useOfflineMutation(
    {
      mutationType: 'UPDATE',
      endpoint: '/api/goods',
      mutationFn: ({ id, data }: { id: string; data: UpdateGoodsInput }) =>
        goodsApi.updateGoods(id, data),

      // Optimistic update
      onOptimisticUpdate: async (variables, qc) => {
        // Get previous data for rollback
        const previousDetail = qc.getQueryData<Goods>(
          GOODS_KEYS.detail(variables.id)
        );
        const previousLists = qc.getQueriesData<Goods[]>({
          queryKey: GOODS_KEYS.lists(),
        });

        // Update detail
        qc.setQueryData(GOODS_KEYS.detail(variables.id), (old: Goods | undefined) =>
          old ? { ...old, ...variables.data, updatedAt: new Date().toISOString() } : old
        );

        // Update in all lists
        qc.setQueriesData({ queryKey: GOODS_KEYS.lists() }, (old: Goods[] = []) =>
          old.map((item) =>
            item.id === variables.id
              ? { ...item, ...variables.data, updatedAt: new Date().toISOString() }
              : item
          )
        );

        return { previousDetail, previousLists };
      },

      // Rollback on error
      onRollback: async (variables, context: any, qc) => {
        if (context?.previousDetail) {
          qc.setQueryData(GOODS_KEYS.detail(variables.id), context.previousDetail);
        }
      },

      metadata: { entityType: 'goods', entityId: 'id' },
      queuePriority: 'normal',
    },
    queryClient
  );
};

/**
 * Hook to delete goods with offline support
 */
export const useDeleteGoods = () => {
  const queryClient = useQueryClient();

  return useOfflineMutation(
    {
      mutationType: 'DELETE',
      endpoint: '/api/goods',
      mutationFn: (id: string) => goodsApi.deleteGoods(id),

      // Optimistic delete
      onOptimisticUpdate: async (id, qc) => {
        const previousLists = qc.getQueriesData<Goods[]>({
          queryKey: GOODS_KEYS.lists(),
        });

        // Remove from all lists
        qc.setQueriesData({ queryKey: GOODS_KEYS.lists() }, (old: Goods[] = []) =>
          old.filter((item) => item.id !== id)
        );

        // Remove detail
        qc.removeQueries({ queryKey: GOODS_KEYS.detail(id) });

        return { previousLists, deletedId: id };
      },

      // Rollback on error
      onRollback: async (id, context: any, qc) => {
        // Invalidate to refetch
        qc.invalidateQueries({ queryKey: GOODS_KEYS.lists() });
      },

      metadata: { entityType: 'goods', entityId: 'id' },
      queuePriority: 'normal',
    },
    queryClient
  );
};

/**
 * Hook to receive goods (admin operation) with offline support
 */
export const useReceiveGoods = () => {
  const queryClient = useQueryClient();

  return useOfflineMutation(
    {
      mutationType: 'CUSTOM',
      endpoint: '/api/goods/receive',
      mutationFn: (data: {
        goodsId: string;
        warehouseZone?: string;
        shelfCode?: string;
      }) => goodsApi.receiveGoods(data.goodsId, data),

      onOptimisticUpdate: async (variables, qc) => {
        qc.setQueryData(GOODS_KEYS.detail(variables.goodsId), (old: Goods | undefined) =>
          old
            ? {
                ...old,
                status: 'received',
                location: {
                  ...old.location,
                  current: 'china_warehouse',
                  warehouseZone: variables.warehouseZone,
                  shelfCode: variables.shelfCode,
                },
                updatedAt: new Date().toISOString(),
              }
            : old
        );
      },

      onRollback: async (variables, context, qc) => {
        qc.invalidateQueries({ queryKey: GOODS_KEYS.detail(variables.goodsId) });
      },

      metadata: { entityType: 'goods', entityId: 'goodsId' },
      queuePriority: 'high',
    },
    queryClient
  );
};

export default {
  useGoodsList,
  useGoodsDetail,
  useCreateGoods,
  useUpdateGoods,
  useDeleteGoods,
  useReceiveGoods,
  GOODS_KEYS,
};
