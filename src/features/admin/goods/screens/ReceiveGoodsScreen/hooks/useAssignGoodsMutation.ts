import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { assignGoodsToOrder } from '@src/features/admin/shared/api';
import { queryKey } from '@src/constants/queryKey';

export const useAssignGoodsMutation = () => {
  const queryClient = useQueryClient();

  const assignGoods = useCallback(async (goodsId: string, orderId: string): Promise<void> => {
    try {
      await assignGoodsToOrder({ orderId, goodsId });
      console.log('[AutoAssign] Goods assigned successfully');
    } catch (error: any) {
      console.error('[AutoAssign] Failed to assign goods:', error?.response?.data || error?.message);
    }
    queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
  }, [queryClient]);

  return { assignGoods };
};
