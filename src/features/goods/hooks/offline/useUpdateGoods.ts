/**
 * Hook to update goods with offline support
 */

import { useQueryClient } from '@tanstack/react-query';
import { useOfflineMutation } from '../../../../shared';
import { goodsApi } from '../../api/goodsApi';
import type { Goods, UpdateGoodsInput } from '../../types';
import { GOODS_KEYS } from './goodsKeys';

export const useUpdateGoods = () => {
  const queryClient = useQueryClient();

  return useOfflineMutation(
    {
      mutationType: 'UPDATE',
      endpoint: '/api/goods',
      mutationFn: ({ id, data }: { id: string; data: UpdateGoodsInput }) =>
        goodsApi.updateGoods(id, data),

      onOptimisticUpdate: async (variables, qc) => {
        const previousDetail = qc.getQueryData<Goods>(
          GOODS_KEYS.detail(variables.id)
        );
        const previousLists = qc.getQueriesData<Goods[]>({
          queryKey: GOODS_KEYS.lists(),
        });

        qc.setQueryData(GOODS_KEYS.detail(variables.id), (old: Goods | undefined) =>
          old ? { ...old, ...variables.data, updatedAt: new Date().toISOString() } : old
        );

        qc.setQueriesData({ queryKey: GOODS_KEYS.lists() }, (old: Goods[] = []) =>
          old.map((item) =>
            item.id === variables.id
              ? { ...item, ...variables.data, updatedAt: new Date().toISOString() }
              : item
          )
        );

        return { previousDetail, previousLists };
      },

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
