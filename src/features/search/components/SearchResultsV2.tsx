/**
 * Search Results Component V2
 * Decomposed version under 150 lines
 */

import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Input } from '@src/shared/ui/Input';
import { Button } from '@src/shared/ui/Button';
import { useSearchResults } from '../hooks/useSearchResults';
import { SearchResultCard } from './SearchResultCard';
import { SearchFilterPanel } from './SearchFilterPanel';
import { SearchSortDropdown } from './SearchSortDropdown';
import { SearchPagination } from './SearchPagination';
import { SearchResult } from '../types';

interface SearchResultsV2Props {
  initialQuery?: string;
  onResultPress?: (result: SearchResult) => void;
}

export const SearchResultsV2: React.FC<SearchResultsV2Props> = ({
  initialQuery = '',
  onResultPress,
}) => {
  const {
    query,
    filters,
    sort,
    results,
    isLoading,
    updateQuery,
    updateFilters,
    updateSort,
    clearFilters,
  } = useSearchResults(initialQuery);

  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleResultPress = useCallback(
    (result: SearchResult) => {
      onResultPress?.(result);
    },
    [onResultPress]
  );

  const totalPages = Math.ceil(results.length / 10) || 1;

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Input
          placeholder="Rechercher..."
          value={query}
          onChangeText={updateQuery}
          leftIcon="search"
          containerStyle={styles.searchInput}
        />
        <Button variant="secondary" onPress={() => setShowFilters(true)}>
          Filtres
        </Button>
      </View>

      <View style={styles.toolbar}>
        <Text style={styles.resultCount}>
          {results.length} résultat{results.length !== 1 ? 's' : ''}
        </Text>
        <SearchSortDropdown value={sort} onChange={updateSort} />
      </View>

      {results.length === 0 && !isLoading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Aucun résultat trouvé</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <SearchResultCard result={item} onPress={handleResultPress} />
          )}
          contentContainerStyle={styles.list}
        />
      )}

      <SearchPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {showFilters && (
        <View style={styles.modalOverlay}>
          <SearchFilterPanel
            filters={filters}
            onFilterChange={updateFilters}
            onClose={() => setShowFilters(false)}
            onClear={clearFilters}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  resultCount: {
    fontSize: 14,
    color: Theme.neutral.grey600,
  },
  list: {
    padding: Theme.spacing.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Theme.neutral.grey500,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
});
