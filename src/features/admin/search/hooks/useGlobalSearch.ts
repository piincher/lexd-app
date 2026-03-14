/**
 * useGlobalSearch - Hook for global search query and results management
 * Extracted from GlobalSearchScreen for SRP compliance
 */

import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAdvancedSearch, useFilterPresets } from "./useSearch";
import { FilterPreset, SearchFilters } from "../api/searchApi";

type EntityType = "goods" | "containers" | "clients";

interface UseGlobalSearchReturn {
  // Entity state
  selectedEntity: EntityType;
  setSelectedEntity: (entity: EntityType) => void;
  
  // Search state from useAdvancedSearch
  query: string;
  filters: SearchFilters;
  pagination: any;
  data: any;
  isLoading: boolean;
  isError: boolean;
  error: any;
  
  // Actions
  setQuery: (query: string) => void;
  handleSearch: (query: string) => void;
  handleFilterChange: (filters: SearchFilters) => void;
  handlePageChange: (page: number) => void;
  resetFilters: () => void;
  applyPreset: (filters: SearchFilters) => void;
  refetch: () => void;
  
  // Navigation
  handleItemPress: (item: any, entity: string) => void;
  
  // Presets
  presets: FilterPreset[] | undefined;
  
  // Stats
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
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedEntity, setSelectedEntityState] = useState<EntityType>("goods");

  const {
    query,
    filters,
    pagination,
    data,
    isLoading,
    isError,
    error,
    setQuery,
    handleSearch,
    handleFilterChange,
    handlePageChange,
    resetFilters,
    applyPreset,
    refetch,
  } = useAdvancedSearch({ entity: selectedEntity });

  const { data: presets } = useFilterPresets();

  // Handle entity tab change with reset
  const setSelectedEntity = useCallback((entity: EntityType) => {
    setSelectedEntityState(entity);
    resetFilters();
  }, [resetFilters]);

  // Handle item press navigation
  const handleItemPress = useCallback((item: any, entity: string) => {
    switch (entity) {
      case "goods":
        navigation.navigate("AdminGoodsDetail", { goodsId: item.goodsId });
        break;
      case "container":
        navigation.navigate("ContainerDetail", { containerId: item._id });
        break;
      case "client":
        navigation.navigate("ClientDetails", { id: item._id });
        break;
    }
  }, [navigation]);

  // Derived data
  const resultsData = data?.data || [];
  const resultsPagination = data?.pagination;
  const resultsStats = data?.stats;

  return {
    selectedEntity,
    setSelectedEntity,
    query,
    filters,
    pagination,
    data,
    isLoading,
    isError,
    error,
    setQuery,
    handleSearch,
    handleFilterChange,
    handlePageChange,
    resetFilters,
    applyPreset,
    refetch,
    handleItemPress,
    presets,
    resultsData,
    resultsPagination,
    resultsStats,
  };
};

export { ENTITY_TABS };
export type { EntityType, UseGlobalSearchReturn };
