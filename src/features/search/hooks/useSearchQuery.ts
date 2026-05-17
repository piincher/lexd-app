import { useQuery } from '@tanstack/react-query';
import type { SearchFilters, SearchSortOption, SearchResult } from '../types';
import { fetchSearchResults } from './fetchSearchResults';

const searchQueryKeys = {
  all: ['search'] as const,
  results: (query: string, filters: SearchFilters, sort: SearchSortOption) =>
    [...searchQueryKeys.all, 'results', query, filters, sort] as const,
};

export const useSearchQuery = (
  query: string,
  filters: SearchFilters,
  sort: SearchSortOption
) => {
  return useQuery<SearchResult[]>({
    queryKey: searchQueryKeys.results(query, filters, sort),
    queryFn: () => fetchSearchResults(query, filters, sort),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000,
  });
};
