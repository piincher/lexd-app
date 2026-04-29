import { useState, useEffect, useCallback } from "react";
import { Animated, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAdvancedSearch, useFilterPresets } from "./useSearch";
import { FilterPreset, SearchFilters } from "../api/searchApi";

export type EntityType = "goods" | "containers" | "clients";
const { width } = Dimensions.get("window");
const entityToExportEntity = { goods: "GOODS", containers: "CONTAINERS", clients: "CLIENTS" } as const;
const entityLabels = { goods: "Marchandises", containers: "Containers", clients: "Clients" };

export const useGlobalSearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedEntity, setSelectedEntity] = useState<EntityType>("goods");
  const [showFilters, setShowFilters] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [slideAnim] = useState(new Animated.Value(width));
  const { query, filters, data, isLoading, isError, error, handleSearch, handleFilterChange, handlePageChange, resetFilters, applyPreset, refetch } = useAdvancedSearch({ entity: selectedEntity });
  const { data: presets } = useFilterPresets();
  useEffect(() => { Animated.timing(slideAnim, { toValue: showFilters ? 0 : width, duration: 300, useNativeDriver: true }).start(); }, [showFilters]);
  const handleEntityChange = useCallback((entity: EntityType) => { setSelectedEntity(entity); resetFilters(); }, [resetFilters]);
  const handleItemPress = useCallback((item: any, entity: string) => {
    switch (entity) {
      case "goods": navigation.navigate("AdminGoodsDetail", { goodsId: item._id }); break;
      case "container": navigation.navigate("ContainerDetail", { containerId: item._id }); break;
      case "client": navigation.navigate("ClientDetails", { id: item._id }); break;
    }
  }, [navigation]);
  const handlePresetSelect = useCallback((preset: FilterPreset) => { applyPreset(preset.filters); setShowFilters(false); }, [applyPreset]);
  const handleRemoveFilter = useCallback((key: keyof SearchFilters) => { const newFilters = { ...filters }; delete newFilters[key]; handleFilterChange(newFilters); }, [filters, handleFilterChange]);
  const handleExport = useCallback(() => setShowExportModal(true), []);
  const resultsData = data?.data || [];
  const resultsPagination = data?.pagination;
  const resultsStats = data?.stats;
  return {
    selectedEntity, setSelectedEntity: handleEntityChange, showFilters, setShowFilters, showExportModal, setShowExportModal, slideAnim,
    query, filters, isLoading, isError, error, handleSearch, handleFilterChange, handlePageChange, resetFilters, refetch,
    handleItemPress, presets, resultsData, resultsPagination, resultsStats, handlePresetSelect, handleRemoveFilter, handleExport,
    entityToExportEntity, entityLabels,
  };
};
