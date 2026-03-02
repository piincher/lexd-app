/**
 * GlobalSearchScreen - Full-page search interface for admin
 * Advanced filters, results table with sorting, export functionality
 */

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, FAB, IconButton, ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAdvancedSearch, useFilterPresets } from "../hooks/useSearch";
import { GlobalSearchBar } from "../components/GlobalSearchBar";
import { SearchFilters } from "../components/SearchFilters";
import { SearchResults } from "../components/SearchResults";
import { SearchFilters as SearchFiltersType, FilterPreset } from "../api/searchApi";
import { Theme } from "@src/constants/Theme";

const { width, height } = Dimensions.get("window");

type EntityType = "goods" | "containers" | "clients";

const ENTITY_TABS: { key: EntityType; label: string; icon: string }[] = [
  { key: "goods", label: "Marchandises", icon: "cube" },
  { key: "containers", label: "Containers", icon: "airplane" },
  { key: "clients", label: "Clients", icon: "people" },
];

export const GlobalSearchScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedEntity, setSelectedEntity] = useState<EntityType>("goods");
  const [showFilters, setShowFilters] = useState(false);
  const [slideAnim] = useState(new Animated.Value(width));

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

  // Animate filter panel
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: showFilters ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showFilters]);

  // Handle entity tab change
  const handleEntityChange = (entity: EntityType) => {
    setSelectedEntity(entity);
    resetFilters();
  };

  // Handle item press
  const handleItemPress = (item: any, entity: string) => {
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
  };

  // Handle preset selection
  const handlePresetSelect = (preset: FilterPreset) => {
    applyPreset(preset.filters);
    setShowFilters(false);
  };

  // Handle export
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting results...", data);
  };

  // Get results data based on entity
  const resultsData = data?.data || [];
  const resultsPagination = data?.pagination;
  const resultsStats = data?.stats;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={Theme.gradients.glass} style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Recherche globale</Text>
          <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
            <Ionicons name="download-outline" size={20} color={Theme.primary[500]} />
          </TouchableOpacity>
        </View>

        {/* Entity Tabs */}
        <View style={styles.tabsContainer}>
          {ENTITY_TABS.map((tab) => {
            const isActive = selectedEntity === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => handleEntityChange(tab.key)}
              >
                {isActive && (
                  <LinearGradient
                    colors={Theme.gradients.primary}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                )}
                <Ionicons
                  name={tab.icon as any}
                  size={16}
                  color={isActive ? "#FFF" : Theme.neutral[500]}
                  style={styles.tabIcon}
                />
                <Text
                  style={[styles.tabText, isActive && styles.tabTextActive]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <GlobalSearchBar
          onSearch={handleSearch}
          placeholder={`Rechercher ${selectedEntity}...`}
          showSuggestions={true}
        />
      </View>

      {/* Active Filters Display */}
      {Object.keys(filters).length > 0 && (
        <View style={styles.activeFiltersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.activeFilters}>
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null;
                return (
                  <View key={key} style={styles.filterChip}>
                    <Text style={styles.filterChipText}>
                      {key}: {Array.isArray(value) ? value.join(", ") : value.toString()}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newFilters = { ...filters };
                        delete newFilters[key as keyof SearchFiltersType];
                        handleFilterChange(newFilters);
                      }}
                    >
                      <Ionicons name="close" size={14} color={Theme.neutral[600]} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Stats Row */}
      {resultsStats && (
        <View style={styles.statsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {resultsStats.count !== undefined && (
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{resultsStats.count}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
            )}
            {resultsStats.totalCBM !== undefined && (
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {resultsStats.totalCBM.toFixed(2)}
                </Text>
                <Text style={styles.statLabel}>CBM Total</Text>
              </View>
            )}
            {resultsStats.totalValue !== undefined && (
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {(resultsStats.totalValue / 1000000).toFixed(1)}M
                </Text>
                <Text style={styles.statLabel}>Valeur (FCFA)</Text>
              </View>
            )}
            {resultsStats.totalBalance !== undefined && (
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {(resultsStats.totalBalance / 1000000).toFixed(1)}M
                </Text>
                <Text style={styles.statLabel}>Solde Total</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {/* Results */}
      <View style={styles.resultsContainer}>
        <SearchResults
          entity={selectedEntity}
          results={{ data: resultsData }}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onItemPress={handleItemPress}
          onRefresh={refetch}
          pagination={resultsPagination}
          onLoadMore={() => {
            if (resultsPagination?.hasNext) {
              handlePageChange(resultsPagination.page + 1);
            }
          }}
          emptyMessage={`Aucun ${selectedEntity} ne correspond à votre recherche`}
          highlightQuery={query}
        />
      </View>

      {/* Filter FAB */}
      <TouchableOpacity
        style={styles.filterFab}
        onPress={() => setShowFilters(true)}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={Theme.gradients.ocean}
          style={styles.filterFabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="options" size={24} color="#FFF" />
          {Object.keys(filters).length > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {Object.keys(filters).length}
              </Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Filter Panel Modal */}
      <Modal
        visible={showFilters}
        transparent
        animationType="none"
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={() => setShowFilters(false)}
          />
          <Animated.View
            style={[
              styles.filterPanel,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <SearchFilters
              entity={selectedEntity}
              filters={filters}
              onFiltersChange={handleFilterChange}
              onReset={resetFilters}
              presets={presets || []}
              onPresetSelect={handlePresetSelect}
            />
            <TouchableOpacity
              style={styles.closeFilterButton}
              onPress={() => setShowFilters(false)}
            >
              <Ionicons name="close" size={24} color={Theme.neutral[600]} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FC",
  },
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.lg,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: Theme.neutral[800],
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.neutral.white,
    justifyContent: "center",
    alignItems: "center",
    ...Theme.shadows.sm,
  },
  tabsContainer: {
    flexDirection: "row",
    gap: Theme.spacing.sm,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.neutral.white,
    ...Theme.shadows.sm,
    overflow: "hidden",
  },
  tabActive: {
    ...Theme.shadows.md,
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.neutral[600],
  },
  tabTextActive: {
    color: "#FFF",
  },
  searchContainer: {
    marginTop: -Theme.spacing.lg,
    zIndex: 100,
  },
  activeFiltersContainer: {
    marginTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  activeFilters: {
    flexDirection: "row",
    gap: Theme.spacing.sm,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    backgroundColor: Theme.primary[100],
    borderRadius: Theme.radius.full,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: Theme.primary[700],
  },
  statsContainer: {
    marginTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  statItem: {
    alignItems: "center",
    marginRight: Theme.spacing.xl,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: Theme.neutral[800],
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: Theme.neutral[500],
    marginTop: 2,
  },
  resultsContainer: {
    flex: 1,
    marginTop: Theme.spacing.md,
  },
  filterFab: {
    position: "absolute",
    right: Theme.spacing.xl,
    bottom: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
    ...Theme.shadows.xl,
  },
  filterFabGradient: {
    width: 56,
    height: 56,
    borderRadius: Theme.radius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Theme.status.error,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFF",
  },
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  filterPanel: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.85,
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    ...Theme.shadows.xl,
  },
  closeFilterButton: {
    position: "absolute",
    top: Theme.spacing.lg,
    right: Theme.spacing.lg,
    width: 40,
    height: 40,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral[100],
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GlobalSearchScreen;
