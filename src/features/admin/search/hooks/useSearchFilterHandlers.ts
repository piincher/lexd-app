/**
 * useSearchFilterHandlers - Hook for controlled search filter operations
 * Returns handler functions for toggling filter values
 */

import { useCallback } from 'react';
import { SearchFilters as SearchFiltersType } from '../api/searchApi';

interface UseSearchFilterHandlersReturn {
  toggleStatus: (status: string) => void;
  togglePaymentStatus: (status: string) => void;
  setShippingMode: (mode: string) => void;
  setShippingLine: (line: string) => void;
  toggleRole: (role: string) => void;
  setIsActive: (isActive: boolean | undefined) => void;
  setHasBalance: (hasBalance: boolean | undefined) => void;
  hasActiveFilters: boolean;
}

const toggleArrayValue = (
  filters: SearchFiltersType,
  onFiltersChange: (filters: SearchFiltersType) => void,
  key: 'status' | 'paymentStatus' | 'role',
  value: string
) => {
  const cur = Array.isArray(filters[key]) ? (filters[key] as string[]) : filters[key] ? [filters[key] as string] : [];
  const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
  onFiltersChange({ ...filters, [key]: next.length > 0 ? next : undefined });
};

const toggleScalarValue = <K extends 'shippingMode' | 'shippingLine' | 'isActive' | 'hasBalance'>(
  filters: SearchFiltersType,
  onFiltersChange: (filters: SearchFiltersType) => void,
  key: K,
  value: SearchFiltersType[K]
) => {
  onFiltersChange({ ...filters, [key]: filters[key] === value ? undefined : value });
};

export const useSearchFilterHandlers = (
  filters: SearchFiltersType,
  onFiltersChange: (filters: SearchFiltersType) => void
): UseSearchFilterHandlersReturn => {
  const toggleStatus = useCallback((status: string) => toggleArrayValue(filters, onFiltersChange, 'status', status), [filters, onFiltersChange]);
  const togglePaymentStatus = useCallback((status: string) => toggleArrayValue(filters, onFiltersChange, 'paymentStatus', status), [filters, onFiltersChange]);
  const toggleRole = useCallback((role: string) => toggleArrayValue(filters, onFiltersChange, 'role', role), [filters, onFiltersChange]);
  const setShippingMode = useCallback((mode: string) => toggleScalarValue(filters, onFiltersChange, 'shippingMode', mode), [filters, onFiltersChange]);
  const setShippingLine = useCallback((line: string) => toggleScalarValue(filters, onFiltersChange, 'shippingLine', line), [filters, onFiltersChange]);
  const setIsActive = useCallback((isActive: boolean | undefined) => toggleScalarValue(filters, onFiltersChange, 'isActive', isActive), [filters, onFiltersChange]);
  const setHasBalance = useCallback((hasBalance: boolean | undefined) => toggleScalarValue(filters, onFiltersChange, 'hasBalance', hasBalance), [filters, onFiltersChange]);

  const hasActiveFilters = Object.keys(filters).length > 0;

  return {
    toggleStatus,
    togglePaymentStatus,
    setShippingMode,
    setShippingLine,
    toggleRole,
    setIsActive,
    setHasBalance,
    hasActiveFilters,
  };
};
