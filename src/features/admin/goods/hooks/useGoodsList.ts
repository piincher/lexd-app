/**
 * useGoodsList - Hook for goods list screen data management
 * Combines data fetching with list-specific state
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllGoods, goodsQueryKeys } from './useGoods';
import { GoodsFilters, GoodsStatus } from '../types';
import { ApiClientError } from '@src/api/client';
import { userData } from '@src/shared/types/user';

interface DateRange {
  startDate: string;
  endDate: string;
}

interface UseGoodsListOptions {
  initialStatus?: GoodsStatus | 'all';
  onError?: (error: ApiClientError) => void;
}

interface UseGoodsListReturn {
  goods: any[];
  total: number;
  isLoading: boolean;
  isRefetching: boolean;
  error: ApiClientError | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: GoodsStatus | 'all';
  setSelectedStatus: (status: GoodsStatus | 'all') => void;
  selectedClient: userData | null;
  setSelectedClient: (client: userData | null) => void;
  dateRange: DateRange | null;
  setDateRange: (range: DateRange | null) => void;
  refetch: () => Promise<any>;
  handleRefresh: () => Promise<void>;
  clearAllFilters: () => void;
  hasFilters: boolean;
}

export const useGoodsList = (options: UseGoodsListOptions = {}): UseGoodsListReturn => {
  const { initialStatus = 'all', onError } = options;
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<GoodsStatus | 'all'>(initialStatus);
  const [selectedClient, setSelectedClient] = useState<userData | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const filters = useMemo<GoodsFilters>(() => ({
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    ...(searchQuery && { search: searchQuery }),
    ...(selectedClient && { clientId: selectedClient._id }),
    ...(dateRange && { startDate: dateRange.startDate, endDate: dateRange.endDate }),
  }), [selectedStatus, searchQuery, selectedClient, dateRange]);

  const hasFilters = !!searchQuery || selectedStatus !== 'all' || !!selectedClient || !!dateRange;

  const { data, isLoading, isRefetching, error, refetch } = useGetAllGoods(filters);

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

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedClient(null);
    setDateRange(null);
  }, []);

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
    selectedClient,
    setSelectedClient,
    dateRange,
    setDateRange,
    refetch,
    handleRefresh,
    clearAllFilters,
    hasFilters,
  };
};
