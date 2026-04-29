/**
 * Hook to delete goods with offline support
 */

import { useQueryClient } from '@tanstack/react-query';
import { useOfflineMutation } from '../../../../shared';
import { goodsApi } from '../../api/goodsApi';
import type { Goods } from '../../types';
import { GOODS_KEYS } from './goodsKeys';

export const useDeleteGoods = () => {
  const queryClient = useQueryClient();

  return useOfflineMutation(
    {
      mutationType: 'DELETE',
      endpoint: '/api/goods',
      mutationFn: (id: string) => goodsApi.deleteGoods(id),

      onOptimisticUpdate: async (id, qc) => {
        const previousLists = qc.getQueriesData<Goods[]>({
          queryKey: GOODS_KEYS.lists(),
        });

        qc.setQueriesData({ queryKey: GOODS_KEYS.lists() }, (old: Goods[] = []) =>
          old.filter((item) => item.id !== id)
        );

        qc.removeQueries({ queryKey: GOODS_KEYS.detail(id) });

        return { previousLists, deletedId: id };
      },

      onRollback: async (id, context: any, qc) => {
        qc.invalidateQueries({ queryKey: GOODS_KEYS.lists() });
      },

      metadata: { entityType: 'goods', entityId: 'id' },
      queuePriority: 'normal',
    },
    queryClient
  );
};
