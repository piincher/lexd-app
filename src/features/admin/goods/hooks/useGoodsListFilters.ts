/**
 * useGoodsListFilters - Filter state management for goods list
 *
 * Server-side filters (mode, status, search, client, date range) go to the backend via
 * `filters`. Client-side facets (quick filter chips, sort) ride on top and are applied
 * in useGoodsList after the data lands — so a chip tap or sort change is instant.
 */

import { useState, useMemo, useCallback } from 'react';
import { GoodsFilters, GoodsStatus } from '../types';
import { userData } from '@src/shared/types/user';
import { DEFAULT_SORT, type QuickFilterKey, type SortKey } from './goodsListSorting';

interface DateRange {
  startDate: string;
  endDate: string;
}

export type ShippingMode = 'AIR' | 'SEA';

export const useGoodsListFilters = (
  initialStatus: GoodsStatus | 'all' = 'all',
  initialMode: ShippingMode = 'SEA',
) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<GoodsStatus | 'all'>(initialStatus);
  const [selectedMode, setSelectedMode] = useState<ShippingMode>(initialMode);
  const [selectedClient, setSelectedClient] = useState<userData | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  // Client-side facets — never sent to the backend, applied in useGoodsList.
  const [quickFilter, setQuickFilter] = useState<QuickFilterKey | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>(DEFAULT_SORT);

  const filters = useMemo<GoodsFilters>(() => ({
    shippingMode: selectedMode,
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    ...(searchQuery && { search: searchQuery }),
    ...(selectedClient && { clientId: selectedClient._id }),
    ...(dateRange && { startDate: dateRange.startDate, endDate: dateRange.endDate }),
  }), [selectedMode, selectedStatus, searchQuery, selectedClient, dateRange]);

  const hasFilters =
    !!searchQuery ||
    selectedStatus !== 'all' ||
    !!selectedClient ||
    !!dateRange ||
    !!quickFilter;

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedClient(null);
    setDateRange(null);
    setQuickFilter(null);
    // Sort is intentionally preserved — it's an operator preference for how to read
    // the list, not a query that should reset alongside filters.
  }, []);

  return {
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
    filters,
    hasFilters,
    clearAllFilters,
  };
};
