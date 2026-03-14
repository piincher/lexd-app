/**
 * Search Results Hook
 * Manages search query and results
 */

import { useState, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export type SearchSortOption = 'relevance' | 'date_desc' | 'date_asc' | 'price_asc' | 'price_desc';

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface SearchResult {
  _id: string;
  title: string;
  description: string;
  type: 'order' | 'goods' | 'container';
  metadata: {
    createdAt: string;
    price?: number;
    currency?: string;
  };
}

// Query keys
const searchQueryKeys = {
  all: ['search'] as const,
  results: (query: string, filters: SearchFilters, sort: SearchSortOption) =>
    [...searchQueryKeys.all, 'results', query, filters, sort] as const,
};

// Mock API - replace with actual implementation
const fetchSearchResults = async (
  query: string,
  filters: SearchFilters,
  sort: SearchSortOption
): Promise<SearchResult[]> => {
  // Replace with actual API call
  return [];
};

export const useSearchResults = (
  initialQuery: string = '',
  initialFilters: SearchFilters = {}
) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [sort, setSort] = useState<SearchSortOption>('relevance');
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: searchQueryKeys.results(query, filters, sort),
    queryFn: () => fetchSearchResults(query, filters, sort),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000,
  });

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
    queryClient.removeQueries({ queryKey: searchQueryKeys.all });
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
