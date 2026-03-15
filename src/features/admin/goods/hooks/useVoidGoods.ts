import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminGoodsApi } from '../api/goodsApi';
import { goodsQueryKeys } from './useGoods';

interface VoidGoodsInput {
  id: string;
  reason: string;
}

/**
 * Hook to void goods (cancel/annul goods)
 * POST /api/v2/goods/:id/void
 */
export const useVoidGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: VoidGoodsInput) => adminGoodsApi.void(id, reason),
    onSuccess: (_, variables) => {
      // Invalidate specific goods detail
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.detail(variables.id) });
      // Invalidate all goods lists
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
      // Invalidate orders queries
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
