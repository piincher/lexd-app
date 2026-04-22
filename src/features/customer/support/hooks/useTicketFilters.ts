/**
 * Ticket Filters Hook
 * Manages filter state for the ticket list
 */

import { useState, useEffect, useCallback } from 'react';
import { TicketFilters, TicketStatus, TicketType, TicketPriority } from '../types';

export const useTicketFilters = () => {
  const [filters, setFilters] = useState<TicketFilters>({});
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const setStatusFilter = useCallback((statuses: TicketStatus[]) => {
    setFilters((prev) => ({ ...prev, status: statuses }));
  }, []);

  const setTypeFilter = useCallback((types: TicketType[]) => {
    setFilters((prev) => ({ ...prev, type: types }));
  }, []);

  const setPriorityFilter = useCallback((priorities: TicketPriority[]) => {
    setFilters((prev) => ({ ...prev, priority: priorities }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (filters.status?.length) count++;
    if (filters.type?.length) count++;
    if (filters.priority?.length) count++;
    if (filters.search) count++;
    setActiveFilterCount(count);
  }, [filters]);

  return {
    filters,
    activeFilterCount,
    setStatusFilter,
    setTypeFilter,
    setPriorityFilter,
    setSearchQuery,
    clearFilters,
  };
};
