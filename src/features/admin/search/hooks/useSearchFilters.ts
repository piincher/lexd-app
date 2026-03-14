/**
 * useSearchFilters - Hook for search filter management
 * Handles filter state and toggle operations
 */

import { useState, useCallback } from 'react';
import { SearchFilters as SearchFiltersType, FilterPreset } from '../api/searchApi';

interface UseSearchFiltersReturn {
  filters: SearchFiltersType;
  setFilters: (filters: SearchFiltersType) => void;
  toggleStatus: (status: string) => void;
  togglePaymentStatus: (status: string) => void;
  setShippingMode: (mode: string) => void;
  setShippingLine: (line: string) => void;
  setDateRange: (type: 'from' | 'to', date: string) => void;
  clearFilter: (key: keyof SearchFiltersType) => void;
  hasActiveFilters: boolean;
  resetFilters: () => void;
}

export const useSearchFilters = (initialFilters: SearchFiltersType = {}): UseSearchFiltersReturn => {
  const [filters, setFilters] = useState<SearchFiltersType>(initialFilters);

  const toggleStatus = useCallback((status: string) => {
    const currentStatuses = Array.isArray(filters.status)
      ? filters.status
      : filters.status
      ? [filters.status]
      : [];

    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];

    setFilters((prev) => ({
      ...prev,
      status: newStatuses.length > 0 ? newStatuses : undefined,
    }));
  }, [filters.status]);

  const togglePaymentStatus = useCallback((status: string) => {
    const currentStatuses = Array.isArray(filters.paymentStatus)
      ? filters.paymentStatus
      : filters.paymentStatus
      ? [filters.paymentStatus]
      : [];

    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];

    setFilters((prev) => ({
      ...prev,
      paymentStatus: newStatuses.length > 0 ? newStatuses : undefined,
    }));
  }, [filters.paymentStatus]);

  const setShippingMode = useCallback((mode: string) => {
    setFilters((prev) => ({
      ...prev,
      shippingMode: prev.shippingMode === mode ? undefined : mode,
    }));
  }, []);

  const setShippingLine = useCallback((line: string) => {
    setFilters((prev) => ({
      ...prev,
      shippingLine: prev.shippingLine === line ? undefined : line,
    }));
  }, []);

  const setDateRange = useCallback((type: 'from' | 'to', date: string) => {
    setFilters((prev) => ({
      ...prev,
      [type === 'from' ? 'dateFrom' : 'dateTo']: date,
    }));
  }, []);

  const clearFilter = useCallback((key: keyof SearchFiltersType) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasActiveFilters = Object.keys(filters).length > 0;

  return {
    filters,
    setFilters,
    toggleStatus,
    togglePaymentStatus,
    setShippingMode,
    setShippingLine,
    setDateRange,
    clearFilter,
    hasActiveFilters,
    resetFilters,
  };
};
