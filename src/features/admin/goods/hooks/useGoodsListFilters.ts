/**
 * useGoodsListFilters - Filter state management for goods list
 */

import { useState, useMemo, useCallback } from 'react';
import { GoodsFilters, GoodsStatus } from '../types';
import { userData } from '@src/shared/types/user';

interface DateRange {
  startDate: string;
  endDate: string;
}

export const useGoodsListFilters = (initialStatus: GoodsStatus | 'all' = 'all') => {
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

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedClient(null);
    setDateRange(null);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedClient,
    setSelectedClient,
    dateRange,
    setDateRange,
    filters,
    hasFilters,
    clearAllFilters,
  };
};
