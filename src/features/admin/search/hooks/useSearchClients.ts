/**
 * useSearchClients - React Query hook for clients search
 */

import { useQuery } from "@tanstack/react-query";
import { searchClients, SearchFilters, PaginationParams, SearchResponse } from "../api/searchApi";
import { searchQueryKeys } from "./useSearchQueryKeys";

interface UseSearchClientsOptions {
  enabled?: boolean;
  keepPreviousData?: boolean;
  onSuccess?: (data: SearchResponse<any>) => void;
  onError?: (error: any) => void;
}

export const useSearchClients = (
  query: string,
  filters: SearchFilters = {},
  pagination: PaginationParams = { page: 1, limit: 20 },
  options: UseSearchClientsOptions = {}
) => {
  const { enabled = true, keepPreviousData = true, onSuccess, onError } = options;

  return useQuery({
    queryKey: searchQueryKeys.clientsList(query, filters, pagination),
    queryFn: () => searchClients(query, filters, pagination),
    enabled: enabled && (query.length >= 2 || Object.keys(filters).length > 0),
    placeholderData: keepPreviousData ? (previousData) => previousData : undefined,
    staleTime: 5 * 60 * 1000,
    ...{ onSuccess, onError },
  });
};
