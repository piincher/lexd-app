import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExportDataModal } from "@src/features/admin/export/components/ExportDataModal";
import { Theme } from "@src/constants/Theme";
import { useGlobalSearchScreen } from "../hooks/useGlobalSearchScreen";
import { GlobalSearchHeader } from "../components/GlobalSearchHeader";
import { GlobalSearchBar } from "../components/GlobalSearchBar";
import { GlobalSearchActiveFilters } from "../components/GlobalSearchActiveFilters";
import { SearchStatsPanel } from "../components/SearchStatsPanel";
import { SearchResults } from "../components/SearchResults";
import { FilterFAB } from "../components/FilterFAB";
import { FilterPanelModal } from "../components/FilterPanelModal";

export const GlobalSearchScreen: React.FC = () => {
  const { selectedEntity, setSelectedEntity, showFilters, setShowFilters, showExportModal, setShowExportModal, slideAnim, query, filters, isLoading, isError, error, handleSearch, handleFilterChange, handlePageChange, resetFilters, refetch, handleItemPress, presets, resultsData, resultsPagination, resultsStats, handlePresetSelect, handleRemoveFilter, handleExport, entityToExportEntity, entityLabels } = useGlobalSearchScreen();
  return (
    <SafeAreaView style={styles.container}>
      <GlobalSearchHeader selectedEntity={selectedEntity} onEntityChange={setSelectedEntity} onExport={handleExport} />
      <View style={styles.searchContainer}>
        <GlobalSearchBar onSearch={handleSearch} onFilterPress={() => setShowFilters(true)} placeholder={`Rechercher ${selectedEntity}...`} showSuggestions={true} />
      </View>
      <GlobalSearchActiveFilters filters={filters} onRemoveFilter={handleRemoveFilter} />
      <SearchStatsPanel stats={resultsStats} />
      <View style={styles.resultsContainer}>
        <SearchResults entity={selectedEntity} results={{ data: resultsData }} isLoading={isLoading} isError={isError} error={error} onItemPress={handleItemPress} onRefresh={refetch} pagination={resultsPagination} onLoadMore={() => { if (resultsPagination?.hasNext) { handlePageChange(resultsPagination.page + 1); } }} emptyMessage={`Aucun ${selectedEntity} ne correspond à votre recherche`} highlightQuery={query} />
      </View>
      <FilterFAB filters={filters} onPress={() => setShowFilters(true)} />
      <FilterPanelModal visible={showFilters} onClose={() => setShowFilters(false)} slideAnim={slideAnim} entity={selectedEntity} filters={filters} onFiltersChange={handleFilterChange} onReset={resetFilters} presets={presets} onPresetSelect={handlePresetSelect} />
      <ExportDataModal visible={showExportModal} onDismiss={() => setShowExportModal(false)} entity={entityToExportEntity[selectedEntity]} entityLabel={entityLabels[selectedEntity]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background.default },
  searchContainer: { marginTop: -Theme.spacing.lg, zIndex: 100 },
  resultsContainer: { flex: 1, marginTop: Theme.spacing.md },
});

export default GlobalSearchScreen;
