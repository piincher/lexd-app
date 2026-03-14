/**
 * useGoodsList - Hook for goods list screen data management
 * Combines data fetching with list-specific state
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllGoods, goodsQueryKeys } from './useGoods';
import { GoodsFilters, GoodsStatus } from '../types';
import { ApiClientError } from '@src/api/client';

interface UseGoodsListOptions {
  initialStatus?: GoodsStatus | 'all';
  onError?: (error: ApiClientError) => void;
}

interface UseGoodsListReturn {
  // Data
  goods: any[];
  total: number;
  isLoading: boolean;
  isRefetching: boolean;
  error: ApiClientError | null;
  
  // Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: GoodsStatus | 'all';
  setSelectedStatus: (status: GoodsStatus | 'all') => void;
  
  // Actions
  refetch: () => Promise<any>;
  handleRefresh: () => Promise<void>;
}

export const useGoodsList = (options: UseGoodsListOptions = {}): UseGoodsListReturn => {
  const { initialStatus = 'all', onError } = options;
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<GoodsStatus | 'all'>(initialStatus);

  const filters = useMemo<GoodsFilters>(() => ({
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    ...(searchQuery && { search: searchQuery }),
  }), [selectedStatus, searchQuery]);

  const { data, isLoading, isRefetching, error, refetch } = useGetAllGoods(filters);

  // Handle errors via effect for React Query v5 compatibility
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const goods = useMemo(() => data?.data?.goods || [], [data]);
  const total = useMemo(() => data?.data?.pagination?.total || 0, [data]);

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    await refetch();
  }, [queryClient, refetch]);

  return {
    goods,
    total,
    isLoading,
    isRefetching,
    error: error || null,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    refetch,
    handleRefresh,
  };
};
