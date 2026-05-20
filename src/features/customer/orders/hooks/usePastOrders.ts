/**
 * Past Orders Hook
 * Fetches paginated past orders with filtering
 */

import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { apiClientV2 } from '@src/api/client';
import { Order, OrderFilters } from '../types';

// Query keys factory
const pastOrdersQueryKeys = {
  all: ['pastOrders'] as const,
  lists: () => [...pastOrdersQueryKeys.all, 'list'] as const,
  list: (filters: OrderFilters) => [...pastOrdersQueryKeys.lists(), filters] as const,
  infinite: (filters: OrderFilters) => [...pastOrdersQueryKeys.lists(), 'infinite', filters] as const,
};

const fetchPastOrders = async (filters: OrderFilters, page: number = 1): Promise<{
  orders: Order[];
  pagination: { page: number; totalPages: number; hasMore: boolean };
}> => {
  try {
    const response = await apiClientV2.get('/orders/past', {
      params: { ...filters, page },
    });
    const data = response.data.data || response.data;
    return {
      orders: data.orders || [],
      pagination: data.pagination || { page, totalPages: 1, hasMore: false },
    };
  } catch (error) {
    console.warn('Failed to fetch past orders:', error);
    return {
      orders: [],
      pagination: { page, totalPages: 1, hasMore: false },
    };
  }
};

export const usePastOrders = (filters: OrderFilters) => {
  return useQuery({
    queryKey: pastOrdersQueryKeys.list(filters),
    queryFn: () => fetchPastOrders(filters),
    staleTime: 30 * 1000,
  });
};

export const usePastOrdersInfinite = (filters: OrderFilters) => {
  return useInfiniteQuery({
    queryKey: pastOrdersQueryKeys.infinite(filters),
    queryFn: ({ pageParam = 1 }) => fetchPastOrders(filters, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 30 * 1000,
  });
};

export const useRefreshPastOrders = () => {
  const queryClient = useQueryClient();

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: pastOrdersQueryKeys.all });
  }, [queryClient]);

  return refresh;
};
