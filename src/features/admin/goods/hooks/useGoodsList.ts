/**
 * useGoodsList - Hook for goods list screen data management
 * Combines data fetching with list-specific state.
 *
 * The hook returns goods *after* applying client-side quick filter + sort so the screen
 * doesn't have to duplicate the logic. Server-side filters (mode, status, search, etc.)
 * still happen in useGoodsListData via the React Query key — the client-side stage just
 * narrows/orders the already-loaded set.
 */

import { useMemo } from 'react';
import { GoodsStatus } from '../types';
import { ApiClientError } from '@src/api/client';
import { userData } from '@src/shared/types/user';
import { useGoodsListFilters, ShippingMode } from './useGoodsListFilters';
import { useGoodsListData } from './useGoodsListData';
import { applyQuickFilter, applySort, type QuickFilterKey, type SortKey } from './goodsListSorting';

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
  selectedMode: ShippingMode;
  setSelectedMode: (mode: ShippingMode) => void;
  selectedClient: userData | null;
  setSelectedClient: (client: userData | null) => void;
  dateRange: DateRange | null;
  setDateRange: (range: DateRange | null) => void;
  quickFilter: QuickFilterKey | null;
  setQuickFilter: (key: QuickFilterKey | null) => void;
  sortBy: SortKey;
  setSortBy: (key: SortKey) => void;
  refetch: () => Promise<any>;
  handleRefresh: () => Promise<void>;
  clearAllFilters: () => void;
  hasFilters: boolean;
}

export const useGoodsList = (options: UseGoodsListOptions = {}): UseGoodsListReturn => {
  const { initialStatus = 'all', onError } = options;

  const {
    searchQuery, setSearchQuery, selectedStatus, setSelectedStatus,
    selectedMode, setSelectedMode,
    selectedClient, setSelectedClient, dateRange, setDateRange,
    quickFilter, setQuickFilter, sortBy, setSortBy,
    filters, hasFilters, clearAllFilters,
  } = useGoodsListFilters(initialStatus);

  const {
    goods: serverGoods, total, isLoading, isRefetching, error, refetch, handleRefresh,
  } = useGoodsListData(filters, onError);

  // Client-side pipeline: server result → quick filter → sort. O(n) per step on a
  // capped page; instant feedback on chip / sort changes, no extra API roundtrip.
  const goods = useMemo(() => {
    const filtered = applyQuickFilter(serverGoods, quickFilter);
    return applySort(filtered, sortBy);
  }, [serverGoods, quickFilter, sortBy]);

  return {
    goods,
    total,
    isLoading,
    isRefetching,
    error,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedMode,
    setSelectedMode,
    selectedClient,
    setSelectedClient,
    dateRange,
    setDateRange,
    quickFilter,
    setQuickFilter,
    sortBy,
    setSortBy,
    refetch,
    handleRefresh,
    clearAllFilters,
    hasFilters,
  };
};
