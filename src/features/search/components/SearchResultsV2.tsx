/**
 * Search Results Component V2
 * Decomposed version under 150 lines
 */

import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSearchResults } from '../hooks/useSearchResults';
import { SearchResultCard } from './SearchResultCard';
import { SearchFilterPanel } from './SearchFilterPanel';
import { SearchPagination } from './SearchPagination';
import { SearchResult } from '../types';
import { SearchResultsHeader } from './SearchResultsHeader';
import { SearchResultsEmptyState } from './SearchResultsEmptyState';
import { useSearchResultsV2Styles } from './SearchResultsV2.styles';

interface SearchResultsV2Props {
	initialQuery?: string;
	onResultPress?: (result: SearchResult) => void;
}

export const SearchResultsV2: React.FC<SearchResultsV2Props> = ({
	initialQuery = '',
	onResultPress,
}) => {
	const styles = useSearchResultsV2Styles();

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
			<SearchResultsHeader
				query={query}
				onQueryChange={updateQuery}
				onShowFilters={() => setShowFilters(true)}
				resultsCount={results.length}
				sort={sort}
				onSortChange={updateSort}
			/>

			{results.length === 0 && !isLoading ? (
				<SearchResultsEmptyState />
			) : (
				<FlashList
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
