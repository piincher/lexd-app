/**
 * Hook to create goods with offline support
 */

import { useQueryClient } from '@tanstack/react-query';
import { useOfflineMutation } from '../../../../shared';
import { goodsApi } from '../../api/goodsApi';
import type { Goods, CreateGoodsInput } from '../../types';
import { GOODS_KEYS } from './goodsKeys';

export const useCreateGoods = () => {
  const queryClient = useQueryClient();

  return useOfflineMutation(
    {
      mutationType: 'CREATE',
      endpoint: '/api/goods',
      mutationFn: (data: CreateGoodsInput) => goodsApi.createGoods(data),

      onOptimisticUpdate: async (variables, qc) => {
        const tempId = `temp-${Date.now()}`;
        const tempGoods: Goods = {
          id: tempId,
          ...variables,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Goods;

        qc.setQueryData(GOODS_KEYS.lists(), (old: Goods[] = []) => [
          tempGoods,
          ...old,
        ]);

        return { tempId, tempGoods };
      },

      onSuccess: (data, variables, context: any) => {
        queryClient.setQueryData(GOODS_KEYS.lists(), (old: Goods[] = []) =>
          old.map((item) =>
            item.id === context?.tempId ? { ...data, id: data.id } : item
          )
        );
      },

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
