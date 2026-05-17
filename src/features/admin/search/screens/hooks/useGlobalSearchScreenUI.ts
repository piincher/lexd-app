import { useCallback } from "react";
import { useGlobalSearchScreen } from "../../hooks/useGlobalSearchScreen";

export const useGlobalSearchScreenUI = () => {
  const {
    selectedEntity,
    setSelectedEntity,
    showFilters,
    setShowFilters,
    showExportModal,
    setShowExportModal,
    slideAnim,
    query,
    filters,
    isLoading,
    isError,
    error,
    handleSearch,
    handleFilterChange,
    handlePageChange,
    resetFilters,
    refetch,
    handleItemPress,
    presets,
    resultsData,
    resultsPagination,
    resultsStats,
    handlePresetSelect,
    handleRemoveFilter,
    handleExport,
    entityToExportEntity,
    entityLabels,
  } = useGlobalSearchScreen();

  const handleFilterPress = useCallback(() => {
    setShowFilters(true);
  }, [setShowFilters]);

  const handleLoadMore = useCallback(() => {
    if (resultsPagination?.hasNext) {
      handlePageChange(resultsPagination.page + 1);
    }
  }, [resultsPagination, handlePageChange]);

  const handleCloseFilters = useCallback(() => {
    setShowFilters(false);
  }, [setShowFilters]);

  const handleDismissExport = useCallback(() => {
    setShowExportModal(false);
  }, [setShowExportModal]);

  return {
    data: {
      selectedEntity,
      showFilters,
      showExportModal,
      slideAnim,
      query,
      filters,
      isLoading,
      isError,
      error,
      presets,
      resultsData,
      resultsPagination,
      resultsStats,
      entityToExportEntity,
      entityLabels,
    },
    handlers: {
      setSelectedEntity,
      handleSearch,
      handleFilterChange,
      handlePageChange,
      resetFilters,
      refetch,
      handleItemPress,
      handlePresetSelect,
      handleRemoveFilter,
      handleExport,
      handleFilterPress,
      handleLoadMore,
      handleCloseFilters,
      handleDismissExport,
    },
  };
};
