/**
 * useGlobalSearch - Hook for global search query and results management
 * Composes smaller hooks for entity selection, search, and navigation
 */

import { useCallback } from "react";
import { useAdvancedSearch, useFilterPresets } from "./useSearch";
import { useGlobalSearchEntity, type EntityType } from "./useGlobalSearchEntity";
import { useGlobalSearchNavigation } from "./useGlobalSearchNavigation";
import type { FilterPreset, SearchFilters } from "../api/searchApi";

interface UseGlobalSearchReturn {
  selectedEntity: EntityType;
  setSelectedEntity: (entity: EntityType) => void;
  query: string;
  filters: SearchFilters;
  pagination: any;
  data: any;
  isLoading: boolean;
  isError: boolean;
  error: any;
  setQuery: (query: string) => void;
  handleSearch: (query: string) => void;
  handleFilterChange: (filters: SearchFilters) => void;
  handlePageChange: (page: number) => void;
  resetFilters: () => void;
  applyPreset: (filters: SearchFilters) => void;
  refetch: () => void;
  handleItemPress: (item: any, entity: string) => void;
  presets: FilterPreset[] | undefined;
  resultsData: any[];
  resultsPagination: any;
  resultsStats: any;
}

const ENTITY_TABS: { key: EntityType; label: string; icon: string }[] = [
  { key: "goods", label: "Marchandises", icon: "cube" },
  { key: "containers", label: "Containers", icon: "airplane" },
  { key: "clients", label: "Clients", icon: "people" },
];

export const useGlobalSearch = (): UseGlobalSearchReturn => {
  const { selectedEntity, setSelectedEntityState } = useGlobalSearchEntity();

  const {
    query, filters, pagination, data, isLoading, isError, error,
    setQuery, handleSearch, handleFilterChange, handlePageChange,
    resetFilters, applyPreset, refetch,
  } = useAdvancedSearch({ entity: selectedEntity });

  const { data: presets } = useFilterPresets();
  const { handleItemPress } = useGlobalSearchNavigation();

  const setSelectedEntity = useCallback((entity: EntityType) => {
    setSelectedEntityState(entity);
    resetFilters();
  }, [resetFilters]);

  const resultsData = data?.data || [];
  const resultsPagination = data?.pagination;
  const resultsStats = data?.stats;

  return {
    selectedEntity, setSelectedEntity,
    query, filters, pagination, data, isLoading, isError, error,
    setQuery, handleSearch, handleFilterChange, handlePageChange,
    resetFilters, applyPreset, refetch,
    handleItemPress, presets,
    resultsData, resultsPagination, resultsStats,
  };
};

export { ENTITY_TABS };
export type { EntityType, UseGlobalSearchReturn };
