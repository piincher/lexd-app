import React from 'react';
import { View, Text } from 'react-native';
import { Input } from '@src/shared/ui/Input';
import { Button } from '@src/shared/ui/Button';
import { SearchSortDropdown } from './SearchSortDropdown';
import { SearchSortOption } from '../types';
import { useSearchResultsV2Styles } from './SearchResultsV2.styles';

interface SearchResultsHeaderProps {
	query: string;
	onQueryChange: (text: string) => void;
	onShowFilters: () => void;
	resultsCount: number;
	sort: SearchSortOption;
	onSortChange: (sort: SearchSortOption) => void;
}

export const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
	query,
	onQueryChange,
	onShowFilters,
	resultsCount,
	sort,
	onSortChange,
}) => {
	const styles = useSearchResultsV2Styles();

	return (
		<>
			<View style={styles.searchBar}>
				<Input
					placeholder="Rechercher..."
					value={query}
					onChangeText={onQueryChange}
					containerStyle={styles.searchInput}
				/>
				<Button variant="secondary" onPress={onShowFilters}>
					Filtres
				</Button>
			</View>
			<View style={styles.toolbar}>
				<Text style={styles.resultCount}>
					{resultsCount} résultat{resultsCount !== 1 ? 's' : ''}
				</Text>
				<SearchSortDropdown value={sort} onChange={onSortChange} />
			</View>
		</>
	);
};
