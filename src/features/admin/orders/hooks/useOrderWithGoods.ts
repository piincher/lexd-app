import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../api';
import { OrderWithGoodsSeparated } from '../api/types';

const QUERY_KEYS = {
  orderWithGoods: (id: string) => ['admin-order', id, 'with-goods'],
} as const;

interface UseOrderWithGoodsReturn {
  data: OrderWithGoodsSeparated | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Query hook to get order with goods
 * GET /api/v1/orders/:id/with-goods
 * Transforms response to separate active/void goods
 */
export const useOrderWithGoods = (orderId: string | undefined): UseOrderWithGoodsReturn => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: orderId ? QUERY_KEYS.orderWithGoods(orderId) : ['admin-order', 'with-goods'],
    queryFn: () => {
      if (!orderId) throw new Error('Order ID is required');
      return orderApi.getOrderWithGoods(orderId).then((res) => res.data.data);
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
