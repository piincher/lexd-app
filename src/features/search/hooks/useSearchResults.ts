/**
 * Search Results Hook
 * Manages search query and results by composing smaller hooks
 */

import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { SearchFilters, SearchSortOption } from '../types';
import { useSearchQuery } from './useSearchQuery';

export const useSearchResults = (
  initialQuery: string = '',
  initialFilters: SearchFilters = {}
) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [sort, setSort] = useState<SearchSortOption>('relevance');
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, refetch } = useSearchQuery(query, filters, sort);

  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const updateSort = useCallback((newSort: SearchSortOption) => {
    setSort(newSort);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setFilters({});
    queryClient.removeQueries({ queryKey: ['search'] });
  }, [queryClient]);

  return {
    query,
    filters,
    sort,
    results: data ?? [],
    isLoading,
    isFetching,
    updateQuery,
    updateFilters,
    updateSort,
    clearFilters,
    clearSearch,
    refetch,
  };
};
