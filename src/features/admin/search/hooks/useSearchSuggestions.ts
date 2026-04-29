/**
 * useSearchSuggestions - React Query hook for search suggestions with debounce
 */

import { useQuery } from "@tanstack/react-query";
import { getSearchSuggestions } from "../api/searchApi";
import { searchQueryKeys } from "./useSearchQueryKeys";
import { useDebouncedValue } from "./useDebouncedValue";

interface UseSearchSuggestionsOptions {
  enabled?: boolean;
  debounceMs?: number;
  minQueryLength?: number;
}

export const useSearchSuggestions = (
  query: string,
  options: UseSearchSuggestionsOptions = {}
) => {
  const { enabled = true, debounceMs = 200, minQueryLength = 2 } = options;
  const debouncedQuery = useDebouncedValue(query, debounceMs);

  const { data, isLoading, error } = useQuery({
    queryKey: searchQueryKeys.suggestionsList(debouncedQuery),
    queryFn: () => getSearchSuggestions(debouncedQuery),
    enabled: enabled && debouncedQuery.length >= minQueryLength,
    staleTime: 1 * 60 * 1000,
  });

  const suggestions = data?.suggestions || { goods: [], containers: [], clients: [] };
  const totalSuggestions =
    suggestions.goods.length +
    suggestions.containers.length +
    suggestions.clients.length;

  return { suggestions, totalSuggestions, isLoading, error };
};
