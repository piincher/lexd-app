/**
 * useGlobalSearchQuery - React Query hook for global search with debounce
 */

import { useQuery } from "@tanstack/react-query";
import { globalSearch, GlobalSearchResult } from "../api/searchApi";
import { searchQueryKeys } from "./useSearchQueryKeys";
import { useDebouncedValue } from "./useDebouncedValue";

interface UseGlobalSearchQueryOptions {
  enabled?: boolean;
  debounceMs?: number;
  minQueryLength?: number;
  onSuccess?: (data: GlobalSearchResult) => void;
  onError?: (error: any) => void;
}

export const useGlobalSearchQuery = (
  query: string,
  options: UseGlobalSearchQueryOptions = {}
) => {
  const {
    enabled = true,
    debounceMs = 300,
    minQueryLength = 2,
    onSuccess,
    onError,
  } = options;

  const debouncedQuery = useDebouncedValue(query, debounceMs);

  return useQuery({
    queryKey: searchQueryKeys.globalSearch(debouncedQuery),
    queryFn: () => globalSearch(debouncedQuery),
    enabled: enabled && debouncedQuery.length >= minQueryLength,
    staleTime: 2 * 60 * 1000,
    ...{ onSuccess, onError },
  });
};
