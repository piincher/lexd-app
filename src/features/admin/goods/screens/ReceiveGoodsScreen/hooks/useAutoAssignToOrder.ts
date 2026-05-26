/**
 * useAutoAssignToOrder - Hook for auto-assigning goods to an existing or new order
 * Finds a recent active order (< 7 days) or creates a new one, then assigns goods.
 */

import { useCallback } from 'react';
import { useOrderMatching } from './useOrderMatching';
import { useAssignGoodsMutation } from './useAssignGoodsMutation';
import type { AutoAssignGoodsData, AutoAssignResult } from './autoAssignHelpers';

export const useAutoAssignToOrder = () => {
  const { matchOrder } = useOrderMatching();
  const { assignGoods } = useAssignGoodsMutation();

  const autoAssignToOrder = useCallback(async (
    goodsId: string,
    client: { _id: string; firstName: string; lastName: string; phoneNumber?: string },
    goodsData: AutoAssignGoodsData,
  ): Promise<AutoAssignResult | null> => {
    try {
      const matchResult = await matchOrder(client, goodsData);
      if (!matchResult) return null;

      await assignGoods(goodsId, matchResult.orderId);
      return { action: matchResult.action, code: matchResult.code };
    } catch (error: unknown) {
      const err = error as { message?: string; response?: { data?: unknown; status?: number } };
      console.error('[AutoAssign] Error details:', JSON.stringify({ status: err.response?.status, data: err.response?.data, message: err.message }));
      return null;
    }
  }, [matchOrder, assignGoods]);

  return { autoAssignToOrder };
};
