/**
 * Search Results Hook
 * Manages search query and results
 */

import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClientV2 } from '@src/api/client';

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

const fetchSearchResults = async (
  query: string,
  filters: SearchFilters,
  sort: SearchSortOption
): Promise<SearchResult[]> => {
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (filters.category) params.append('category', filters.category);
  if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
  if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
  if (filters.dateTo) params.append('dateTo', filters.dateTo);
  if (sort) params.append('sort', sort);

  const response = await apiClientV2.get(`/search/global?${params.toString()}&limit=100`);
  const results = response.data?.results || {};

  const mapItem = (item: any, type: SearchResult['type']): SearchResult => ({
    _id: item._id || item.id,
    title: item.title || item.description || item.goodsDescription || item.name || 'Untitled',
    description: item.subtitle || item.description || item.goodsDescription || '',
    type,
    metadata: {
      createdAt: item.createdAt || item.metadata?.createdAt || new Date().toISOString(),
      price: item.price || item.totalPrice || item.metadata?.price,
      currency: item.currency || item.metadata?.currency,
    },
  });

  return [
    ...(results.goods || []).map((item: any) => mapItem(item, 'goods')),
    ...(results.containers || []).map((item: any) => mapItem(item, 'container')),
    ...(results.clients || []).map((item: any) => mapItem(item, 'order')),
  ];
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
