/**
 * useAdvancedSearch - Composed hook that combines search state, pagination,
 * debounce, recent searches, and entity-specific queries.
 */

import { useState, useCallback } from "react";
import { SearchFilters } from "../api/searchApi";
import { useDebouncedValue } from "./useDebouncedValue";
import { useSearchPagination } from "./useSearchPagination";
import { useRecentSearches } from "./useRecentSearches";
import { useSearchGoods } from "./useSearchGoods";
import { useSearchContainers } from "./useSearchContainers";
import { useSearchClients } from "./useSearchClients";

interface UseAdvancedSearchOptions {
  entity: "goods" | "containers" | "clients";
  initialQuery?: string;
  initialFilters?: SearchFilters;
  debounceMs?: number;
}

export const useAdvancedSearch = (options: UseAdvancedSearchOptions) => {
  const { entity, initialQuery = "", initialFilters = {}, debounceMs = 300 } = options;

  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const { pagination, handlePageChange, handleSortChange, resetPagination } = useSearchPagination();
  const { recentSearches, addRecentSearch } = useRecentSearches();
  const debouncedQuery = useDebouncedValue(query, debounceMs);

  const goodsQuery = useSearchGoods(debouncedQuery, filters, pagination, { enabled: entity === "goods" });
  const containersQuery = useSearchContainers(debouncedQuery, filters, pagination, { enabled: entity === "containers" });
  const clientsQuery = useSearchClients(debouncedQuery, filters, pagination, { enabled: entity === "clients" });

  const currentQuery = entity === "goods" ? goodsQuery : entity === "containers" ? containersQuery : clientsQuery;

  const handleSearch = useCallback((newQuery: string) => {
    setQuery(newQuery);
    resetPagination();
    if (newQuery.trim()) addRecentSearch(newQuery);
  }, [resetPagination, addRecentSearch]);

  const handleFilterChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    resetPagination();
  }, [resetPagination]);

  const resetFilters = useCallback(() => {
    setFilters({});
    resetPagination();
  }, [resetPagination]);

  const applyPreset = useCallback((presetFilters: SearchFilters) => {
    setFilters(presetFilters);
    resetPagination();
  }, [resetPagination]);

  return {
    query,
    filters,
    pagination,
    debouncedQuery,
    recentSearches,
    data: currentQuery.data,
    isLoading: currentQuery.isLoading,
    isError: currentQuery.isError,
    error: currentQuery.error,
    setQuery,
    handleSearch,
    handleFilterChange,
    handlePageChange,
    handleSortChange,
    resetFilters,
    applyPreset,
    refetch: currentQuery.refetch,
  };
};
