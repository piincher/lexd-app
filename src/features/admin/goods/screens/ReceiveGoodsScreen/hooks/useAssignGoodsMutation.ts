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
    } catch (error: unknown) {
      const err = error as { message?: string; response?: { data?: unknown } };
      console.error('[AutoAssign] Failed to assign goods:', err.response?.data || err.message);
    }
    queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
  }, [queryClient]);

  return { assignGoods };
};
