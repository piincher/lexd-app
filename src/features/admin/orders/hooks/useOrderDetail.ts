import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../api';

export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: ['admin-order', orderId, 'detail'],
    queryFn: () => orderApi.getOrderDetails(orderId),
    enabled: !!orderId,
  });
};
