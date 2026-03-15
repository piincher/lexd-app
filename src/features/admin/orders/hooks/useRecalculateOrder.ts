import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../api';
import { OrderTotalsBreakdown } from '../api/types';
import { queryKey } from '@src/constants/queryKey';

const QUERY_KEYS = {
  orderWithGoods: (id: string) => ['admin-order', id, 'with-goods'],
  orderTotals: (id: string) => ['admin-order', id, 'totals'],
} as const;

interface UseRecalculateOrderReturn {
  mutate: (orderId: string) => void;
  mutateAsync: (orderId: string) => Promise<OrderTotalsBreakdown>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  data: OrderTotalsBreakdown | undefined;
}

/**
 * Mutation hook to force recalculation
 * POST /api/v1/orders/:id/recalculate
 * On success: invalidate order queries
 */
export const useRecalculateOrder = (): UseRecalculateOrderReturn => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (orderId: string) =>
      orderApi.recalculateOrder(orderId).then((res) => res.data.data),
    onSuccess: (_, orderId) => {
      // Invalidate order-related queries
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.orderWithGoods(orderId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.orderTotals(orderId),
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.ORDERKEY],
      });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
