/**
 * useFilterPresets - React Query hook for filter presets
 */

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getFilterPresets, FilterPreset } from "../api/searchApi";
import { searchQueryKeys } from "./useSearchQueryKeys";

export const useFilterPresets = (options?: UseQueryOptions<FilterPreset[]>) => {
  return useQuery({
    queryKey: searchQueryKeys.presets(),
    queryFn: getFilterPresets,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};
