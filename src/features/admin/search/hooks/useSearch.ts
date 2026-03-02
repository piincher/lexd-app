/**
 * useSearch hooks - React Query hooks for search functionality
 */

import { useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import {
  searchGoods,
  searchContainers,
  searchClients,
  globalSearch,
  getSearchSuggestions,
  getFilterPresets,
  SearchFilters,
  PaginationParams,
  SearchResponse,
  GlobalSearchResult,
  SuggestionsResponse,
  FilterPreset,
} from "../api/searchApi";

// Query Keys
export const searchQueryKeys = {
  all: ["search"] as const,
  goods: () => [...searchQueryKeys.all, "goods"] as const,
  goodsList: (query: string, filters: SearchFilters, pagination: PaginationParams) =>
    [...searchQueryKeys.goods(), "list", { query, filters, pagination }] as const,
  containers: () => [...searchQueryKeys.all, "containers"] as const,
  containersList: (query: string, filters: SearchFilters, pagination: PaginationParams) =>
    [...searchQueryKeys.containers(), "list", { query, filters, pagination }] as const,
  clients: () => [...searchQueryKeys.all, "clients"] as const,
  clientsList: (query: string, filters: SearchFilters, pagination: PaginationParams) =>
    [...searchQueryKeys.clients(), "list", { query, filters, pagination }] as const,
  global: () => [...searchQueryKeys.all, "global"] as const,
  globalSearch: (query: string) => [...searchQueryKeys.global(), query] as const,
  suggestions: () => [...searchQueryKeys.all, "suggestions"] as const,
  suggestionsList: (query: string) => [...searchQueryKeys.suggestions(), query] as const,
  presets: () => [...searchQueryKeys.all, "presets"] as const,
};

// ============================================================================
// GOODS SEARCH HOOK
// ============================================================================

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
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...{ onSuccess, onError },
  });
};

// ============================================================================
// CONTAINERS SEARCH HOOK
// ============================================================================

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

// ============================================================================
// CLIENTS SEARCH HOOK
// ============================================================================

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

// ============================================================================
// GLOBAL SEARCH HOOK
// ============================================================================

interface UseGlobalSearchOptions {
  enabled?: boolean;
  debounceMs?: number;
  minQueryLength?: number;
  onSuccess?: (data: GlobalSearchResult) => void;
  onError?: (error: any) => void;
}

export const useGlobalSearch = (
  query: string,
  options: UseGlobalSearchOptions = {}
) => {
  const {
    enabled = true,
    debounceMs = 300,
    minQueryLength = 2,
    onSuccess,
    onError,
  } = options;

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const debounceRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    debounceRef.current = debounce((value: string) => {
      setDebouncedQuery(value);
    }, debounceMs);

    return () => {
      debounceRef.current?.cancel();
    };
  }, [debounceMs]);

  useEffect(() => {
    debounceRef.current?.(query);
  }, [query]);

  return useQuery({
    queryKey: searchQueryKeys.globalSearch(debouncedQuery),
    queryFn: () => globalSearch(debouncedQuery),
    enabled: enabled && debouncedQuery.length >= minQueryLength,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...{ onSuccess, onError },
  });
};

// ============================================================================
// SEARCH SUGGESTIONS HOOK
// ============================================================================

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

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const debounceRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    debounceRef.current = debounce((value: string) => {
      setDebouncedQuery(value);
    }, debounceMs);

    return () => {
      debounceRef.current?.cancel();
    };
  }, [debounceMs]);

  useEffect(() => {
    debounceRef.current?.(query);
  }, [query]);

  const { data, isLoading, error } = useQuery({
    queryKey: searchQueryKeys.suggestionsList(debouncedQuery),
    queryFn: () => getSearchSuggestions(debouncedQuery),
    enabled: enabled && debouncedQuery.length >= minQueryLength,
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  const suggestions = data?.suggestions || { goods: [], containers: [], clients: [] };
  const totalSuggestions =
    suggestions.goods.length +
    suggestions.containers.length +
    suggestions.clients.length;

  return {
    suggestions,
    totalSuggestions,
    isLoading,
    error,
  };
};

// ============================================================================
// FILTER PRESETS HOOK
// ============================================================================

export const useFilterPresets = (options?: UseQueryOptions<FilterPreset[]>) => {
  return useQuery({
    queryKey: searchQueryKeys.presets(),
    queryFn: getFilterPresets,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

// ============================================================================
// RECENT SEARCHES HOOK (Local Storage)
// ============================================================================

const RECENT_SEARCHES_KEY = "chinalink_recent_searches";
const MAX_RECENT_SEARCHES = 10;

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const queryClient = useQueryClient();

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load recent searches:", e);
    }
  }, []);

  // Save to local storage
  const saveRecentSearches = (searches: string[]) => {
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
    } catch (e) {
      console.error("Failed to save recent searches:", e);
    }
  };

  // Add a new search
  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;

    setRecentSearches((prev) => {
      const newSearches = [
        query.trim(),
        ...prev.filter((s) => s.toLowerCase() !== query.trim().toLowerCase()),
      ].slice(0, MAX_RECENT_SEARCHES);
      saveRecentSearches(newSearches);
      return newSearches;
    });
  };

  // Remove a search
  const removeRecentSearch = (query: string) => {
    setRecentSearches((prev) => {
      const newSearches = prev.filter((s) => s !== query);
      saveRecentSearches(newSearches);
      return newSearches;
    });
  };

  // Clear all searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  };
};

// ============================================================================
// ADVANCED SEARCH HOOK (Combines multiple features)
// ============================================================================

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
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 20,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { recentSearches, addRecentSearch } = useRecentSearches();

  // Debounced query for search
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const debounceRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    debounceRef.current = debounce((value: string) => {
      setDebouncedQuery(value);
    }, debounceMs);

    return () => {
      debounceRef.current?.cancel();
    };
  }, [debounceMs]);

  useEffect(() => {
    debounceRef.current?.(query);
  }, [query]);

  // Fetch data based on entity
  const goodsQuery = useSearchGoods(
    debouncedQuery,
    filters,
    pagination,
    { enabled: entity === "goods" }
  );

  const containersQuery = useSearchContainers(
    debouncedQuery,
    filters,
    pagination,
    { enabled: entity === "containers" }
  );

  const clientsQuery = useSearchClients(
    debouncedQuery,
    filters,
    pagination,
    { enabled: entity === "clients" }
  );

  const currentQuery = entity === "goods" 
    ? goodsQuery 
    : entity === "containers" 
    ? containersQuery 
    : clientsQuery;

  // Actions
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPagination((prev) => ({ ...prev, page: 1 }));
    if (newQuery.trim()) {
      addRecentSearch(newQuery);
    }
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    setPagination((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  const resetFilters = () => {
    setFilters({});
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const applyPreset = (presetFilters: SearchFilters) => {
    setFilters(presetFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return {
    // State
    query,
    filters,
    pagination,
    debouncedQuery,
    recentSearches,

    // Data
    data: currentQuery.data,
    isLoading: currentQuery.isLoading,
    isError: currentQuery.isError,
    error: currentQuery.error,

    // Actions
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
