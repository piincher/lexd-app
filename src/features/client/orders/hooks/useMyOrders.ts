/**
 * useMyOrders Hook
 * Fetches the current customer's orders
 */

import { useQuery } from '@tanstack/react-query';
import { Order } from '../types';

// Query keys factory
const myOrdersQueryKeys = {
  all: ['myOrders'] as const,
  lists: () => [...myOrdersQueryKeys.all, 'list'] as const,
};

// Mock API - replace with actual implementation
const fetchMyOrders = async (): Promise<Order[]> => {
  // Replace with actual API call
  return [];
};

export interface UseMyOrdersReturn {
  data: Order[] | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useMyOrders = (): UseMyOrdersReturn => {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: myOrdersQueryKeys.lists(),
    queryFn: fetchMyOrders,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    isRefetching,
    error,
    refetch,
  };
};

export default useMyOrders;
