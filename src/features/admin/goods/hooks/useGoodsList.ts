/**
 * useGoodsList - Hook for goods list screen data management
 * Combines data fetching with list-specific state
 */

import { GoodsStatus } from '../types';
import { ApiClientError } from '@src/api/client';
import { userData } from '@src/shared/types/user';
import { useGoodsListFilters, ShippingMode } from './useGoodsListFilters';
import { useGoodsListData } from './useGoodsListData';

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
    filters, hasFilters, clearAllFilters,
  } = useGoodsListFilters(initialStatus);

  const {
    goods, total, isLoading, isRefetching, error, refetch, handleRefresh,
  } = useGoodsListData(filters, onError);

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
    refetch,
    handleRefresh,
    clearAllFilters,
    hasFilters,
  };
};
