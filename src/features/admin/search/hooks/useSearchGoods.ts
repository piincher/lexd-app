/**
 * useSearchGoods - React Query hook for goods search
 */

import { useQuery } from "@tanstack/react-query";
import { searchGoods, SearchFilters, PaginationParams, SearchResponse } from "../api/searchApi";
import { searchQueryKeys } from "./useSearchQueryKeys";

interface UseSearchGoodsOptions {
  enabled?: boolean;
  keepPreviousData?: boolean;
  onSuccess?: (data: SearchResponse<any>) => void;
  onError?: (error: any) => void;
}

export const useSearchGoods = (
  query: string,
  filters: SearchFilters = {},
  pagination: PaginationParams = { page: 1, limit: 20 },
  options: UseSearchGoodsOptions = {}
) => {
  const { enabled = true, keepPreviousData = true, onSuccess, onError } = options;

  return useQuery({
    queryKey: searchQueryKeys.goodsList(query, filters, pagination),
    queryFn: () => searchGoods(query, filters, pagination),
    enabled: enabled && (query.length >= 2 || Object.keys(filters).length > 0),
    placeholderData: keepPreviousData ? (previousData) => previousData : undefined,
    staleTime: 5 * 60 * 1000,
    ...{ onSuccess, onError },
  });
};
