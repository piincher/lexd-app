/**
 * SearchResultsList - Wrapper for SearchResults with consistent styling
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { SearchResults } from "./SearchResults";
import { EntityType } from "../hooks/useGlobalSearch";

interface SearchResultsListProps {
  entity: EntityType;
  data: any[];
  isLoading: boolean;
  isError: boolean;
  error: any;
  pagination: any;
  query: string;
  onItemPress: (item: any, entity: string) => void;
  onRefresh: () => void;
  onLoadMore: () => void;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  entity,
  data,
  isLoading,
  isError,
  error,
  pagination,
  query,
  onItemPress,
  onRefresh,
  onLoadMore,
}) => {
  return (
    <View style={styles.container}>
      <SearchResults
        entity={entity}
        results={{ data }}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onItemPress={onItemPress}
        onRefresh={onRefresh}
        pagination={pagination}
        onLoadMore={onLoadMore}
        emptyMessage={`Aucun ${entity} ne correspond à votre recherche`}
        highlightQuery={query}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Theme.spacing.md,
  },
});

// Import Theme after component definition
import { Theme } from "@src/constants/Theme";
