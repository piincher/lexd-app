import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExportDataModal } from "../../export/components/ExportDataModal";
import { useGlobalSearchScreenUI } from "./hooks/useGlobalSearchScreenUI";
import { styles } from "./GlobalSearchScreen.styles";
import { GlobalSearchHeader } from "../components/GlobalSearchHeader";
import { GlobalSearchBar } from "../components/GlobalSearchBar";
import { GlobalSearchActiveFilters } from "../components/GlobalSearchActiveFilters";
import { SearchStatsPanel } from "../components/SearchStatsPanel";
import { SearchResults } from "../components/SearchResults";
import { FilterFAB } from "../components/FilterFAB";
import { FilterPanelModal } from "../components/FilterPanelModal";

export const GlobalSearchScreen: React.FC = () => {
  const { data, handlers } = useGlobalSearchScreenUI();

  return (
    <SafeAreaView style={styles.container}>
      <GlobalSearchHeader selectedEntity={data.selectedEntity} onEntityChange={handlers.setSelectedEntity} onExport={handlers.handleExport} />
      <View style={styles.searchContainer}>
        <GlobalSearchBar onSearch={handlers.handleSearch} onFilterPress={handlers.handleFilterPress} placeholder={`Rechercher ${data.selectedEntity}...`} showSuggestions={true} />
      </View>
      <GlobalSearchActiveFilters filters={data.filters} onRemoveFilter={handlers.handleRemoveFilter} />
      <SearchStatsPanel stats={data.resultsStats} />
      <View style={styles.resultsContainer}>
        <SearchResults entity={data.selectedEntity} results={{ data: data.resultsData }} isLoading={data.isLoading} isError={data.isError} error={data.error} onItemPress={handlers.handleItemPress} onRefresh={handlers.refetch} pagination={data.resultsPagination} onLoadMore={handlers.handleLoadMore} emptyMessage={`Aucun ${data.selectedEntity} ne correspond à votre recherche`} highlightQuery={data.query} />
      </View>
      <FilterFAB filters={data.filters} onPress={handlers.handleFilterPress} />
      <FilterPanelModal visible={data.showFilters} onClose={handlers.handleCloseFilters} slideAnim={data.slideAnim} entity={data.selectedEntity} filters={data.filters} onFiltersChange={handlers.handleFilterChange} onReset={handlers.resetFilters} presets={data.presets} onPresetSelect={handlers.handlePresetSelect} />
      <ExportDataModal visible={data.showExportModal} onDismiss={handlers.handleDismissExport} entity={data.entityToExportEntity[data.selectedEntity]} entityLabel={data.entityLabels[data.selectedEntity]} />
    </SafeAreaView>
  );
};

export default GlobalSearchScreen;
