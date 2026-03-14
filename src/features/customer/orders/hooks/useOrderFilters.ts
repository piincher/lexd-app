/**
 * Order Filters Hook
 * Manages order filter state
 */

import { useState, useCallback } from 'react';

export type OrderStatus = 'all' | 'pending' | 'in_transit' | 'delivered' | 'cancelled';
export type OrderDateRange = 'all' | 'today' | 'week' | 'month' | 'year';

export interface OrderFilters {
  status: OrderStatus;
  dateRange: OrderDateRange;
  searchQuery: string;
}

export const useOrderFilters = () => {
  const [filters, setFilters] = useState<OrderFilters>({
    status: 'all',
    dateRange: 'all',
    searchQuery: '',
  });

  const setStatus = useCallback((status: OrderStatus) => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const setDateRange = useCallback((dateRange: OrderDateRange) => {
    setFilters((prev) => ({ ...prev, dateRange }));
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      status: 'all',
      dateRange: 'all',
      searchQuery: '',
    });
  }, []);

  return {
    filters,
    setStatus,
    setDateRange,
    setSearchQuery,
    resetFilters,
  };
};
