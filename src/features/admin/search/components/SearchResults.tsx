/**
 * SearchResults - Grouped results display with highlighting
 * Shows results for Goods, Containers, and Clients
 */

import React from "react";
import { SearchResultsProps } from "../types/searchResults";
import { SearchLoadingState } from "./SearchResults/SearchLoadingState";
import { SearchErrorState } from "./SearchResults/SearchErrorState";
import { SearchEmptyState } from "./SearchResults/SearchEmptyState";
import { GlobalSearchResults } from "./SearchResults/GlobalSearchResults";
import { EntitySearchResults } from "./SearchResults/EntitySearchResults";

export const SearchResults: React.FC<SearchResultsProps> = ({
  entity,
  results,
  isLoading,
  isError,
  error,
  onItemPress,
  onRefresh,
  pagination,
  onLoadMore,
  emptyMessage = "Aucun résultat trouvé",
  highlightQuery = "",
}) => {
  if (isLoading) {
    return <SearchLoadingState />;
  }

  if (isError) {
    return <SearchErrorState error={error} onRefresh={onRefresh} />;
  }

  const hasResults =
    (results.goods && results.goods.length > 0) ||
    (results.containers && results.containers.length > 0) ||
    (results.clients && results.clients.length > 0) ||
    (results.data && results.data.length > 0);

  if (!hasResults) {
    return <SearchEmptyState message={emptyMessage} />;
  }

  if (entity === "all") {
    return (
      <GlobalSearchResults
        results={results}
        onItemPress={onItemPress}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        isLoading={isLoading}
        highlightQuery={highlightQuery}
      />
    );
  }

  return (
    <EntitySearchResults
      entity={entity}
      results={results}
      onItemPress={onItemPress}
      onRefresh={onRefresh}
      onLoadMore={onLoadMore}
      pagination={pagination}
      isLoading={isLoading}
      highlightQuery={highlightQuery}
    />
  );
};

export default SearchResults;
