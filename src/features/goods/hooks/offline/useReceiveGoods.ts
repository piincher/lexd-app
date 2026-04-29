/**
 * Hook to receive goods (admin operation) with offline support
 */

import { useQueryClient } from '@tanstack/react-query';
import { useOfflineMutation } from '../../../../shared';
import { goodsApi } from '../../api/goodsApi';
import type { Goods } from '../../types';
import { GOODS_KEYS } from './goodsKeys';

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
