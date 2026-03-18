import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchUsers, SearchUsersParams, SearchUsersResponse } from "../api/searchUsers";

interface UseSearchUsersOptions {
  enabled?: boolean;
  debounceMs?: number;
}

/**
 * Hook to search users/clients with debouncing
 * Uses React Query with caching
 */
export const useSearchUsers = (
  params: SearchUsersParams,
  options: UseSearchUsersOptions = {}
) => {
  const { enabled = true, debounceMs = 500 } = options;
  
  // Debounce the query string
  const [debouncedQuery, setDebouncedQuery] = useState(params.query);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(params.query);
    }, debounceMs);
    
    return () => clearTimeout(timer);
  }, [params.query, debounceMs]);

  const queryResult = useQuery<SearchUsersResponse, Error>({
    queryKey: ["users", "search", debouncedQuery, params.limit],
    queryFn: () => {
      console.log(`[useSearchUsers] Searching for: ${debouncedQuery}`);
      return searchUsers({ ...params, query: debouncedQuery });
    },
    enabled: enabled && debouncedQuery.length >= 3, // Only search if 3+ chars (better for phone numbers)
    staleTime: 30 * 1000, // 30 seconds
  });

  return {
    ...queryResult,
    isLoading: queryResult.isLoading && params.query.length >= 3,
  };
};
