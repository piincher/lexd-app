/**
 * useVoidGoodsList - Hook for void goods list screen state and data
 * SRP: Manages search, filter state and goods data fetching
 */

import { useState, useMemo } from 'react';
import { useGetAllGoods } from './useGoods';
import { Goods } from '../types';

interface UseVoidGoodsListReturn {
  goodsList: Goods[];
  isLoading: boolean;
  refetch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
}

export const useVoidGoodsList = (): UseVoidGoodsListReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const { data, isLoading, refetch } = useGetAllGoods({
    status: (statusFilter || undefined) as any,
    search: searchQuery || undefined,
  });

  const goodsList = useMemo(
    () => data?.data?.data || data?.data?.goods || [],
    [data]
  );

  return {
    goodsList,
    isLoading,
    refetch,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    menuVisible,
    setMenuVisible,
  };
};
