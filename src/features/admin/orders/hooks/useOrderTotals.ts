import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../api';
import { OrderTotalsBreakdown } from '../api/types';

const QUERY_KEYS = {
  orderTotals: (id: string) => ['admin-order', id, 'totals'],
} as const;

interface UseOrderTotalsReturn {
  data: OrderTotalsBreakdown | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Query hook for totals breakdown
 * GET /api/v1/orders/:id/totals-breakdown
 * Enabled only when orderId exists
 */
export const useOrderTotals = (orderId: string | undefined): UseOrderTotalsReturn => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: orderId ? QUERY_KEYS.orderTotals(orderId) : ['admin-order', 'totals'],
    queryFn: () => {
      if (!orderId) throw new Error('Order ID is required');
      return orderApi.getOrderTotals(orderId).then((res) => res.data.data);
    },
    enabled: !!orderId,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
