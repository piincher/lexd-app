/**
 * useSearchContainers - React Query hook for containers search
 */

import { useQuery } from "@tanstack/react-query";
import { searchContainers, SearchFilters, PaginationParams, SearchResponse } from "../api/searchApi";
import { searchQueryKeys } from "./useSearchQueryKeys";

interface UseSearchContainersOptions {
  enabled?: boolean;
  keepPreviousData?: boolean;
  onSuccess?: (data: SearchResponse<any>) => void;
  onError?: (error: any) => void;
}

export const useSearchContainers = (
  query: string,
  filters: SearchFilters = {},
  pagination: PaginationParams = { page: 1, limit: 20 },
  options: UseSearchContainersOptions = {}
) => {
  const { enabled = true, keepPreviousData = true, onSuccess, onError } = options;

  return useQuery({
    queryKey: searchQueryKeys.containersList(query, filters, pagination),
    queryFn: () => searchContainers(query, filters, pagination),
    enabled: enabled && (query.length >= 2 || Object.keys(filters).length > 0),
    placeholderData: keepPreviousData ? (previousData) => previousData : undefined,
    staleTime: 5 * 60 * 1000,
    ...{ onSuccess, onError },
  });
};
