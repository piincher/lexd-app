import React from 'react';
import { View, Text } from 'react-native';
import { useSearchResultsV2Styles } from './SearchResultsV2.styles';

export const SearchResultsEmptyState: React.FC = () => {
	const styles = useSearchResultsV2Styles();

	return (
		<View style={styles.emptyState}>
			<Text style={styles.emptyText}>Aucun résultat trouvé</Text>
		</View>
	);
};
