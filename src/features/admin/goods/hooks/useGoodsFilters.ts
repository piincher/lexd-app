/**
 * useGoodsFilters - Hook for goods list filter state management
 * Single Responsibility: Manages filter and search state only
 */

import { useState, useCallback } from 'react';
import { GoodsStatus } from '../types';

interface FilterOption {
  key: GoodsStatus | 'all';
  label: string;
  icon: string;
}

const STATUS_FILTERS: FilterOption[] = [
  { key: 'all', label: 'Tous', icon: 'apps' },
  { key: 'RECEIVED_AT_WAREHOUSE', label: 'Entrepôt', icon: 'home' },
  { key: 'ASSIGNED_TO_CONTAINER', label: 'Container', icon: 'cube' },
  { key: 'IN_TRANSIT', label: 'Transit', icon: 'airplane' },
  { key: 'ARRIVED_DESTINATION', label: 'Arrivé', icon: 'flag' },
];

interface UseGoodsFiltersReturn {
  // State
  searchQuery: string;
  selectedStatus: GoodsStatus | 'all';
  filters: FilterOption[];
  
  // Actions
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  setSelectedStatus: (status: GoodsStatus | 'all') => void;
  isSelected: (key: GoodsStatus | 'all') => boolean;
}

export const useGoodsFilters = (): UseGoodsFiltersReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<GoodsStatus | 'all'>('all');

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const isSelected = useCallback((key: GoodsStatus | 'all') => 
    selectedStatus === key,
    [selectedStatus]
  );

  return {
    searchQuery,
    selectedStatus,
    filters: STATUS_FILTERS,
    setSearchQuery,
    clearSearch,
    setSelectedStatus,
    isSelected,
  };
};
