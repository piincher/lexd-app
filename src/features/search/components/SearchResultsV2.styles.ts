import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const useSearchResultsV2Styles = () => {
	const { colors } = useAppTheme();
	return StyleSheet.create({
		container: {
			flex: 1,
		},
		searchBar: {
			flexDirection: 'row',
			padding: 12,
			gap: 8,
		},
		searchInput: {
			flex: 1,
		},
		toolbar: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 12,
			paddingBottom: 8,
		},
		resultCount: {
			fontSize: 14,
			color: colors.text.secondary,
		},
		list: {
			padding: 12,
		},
		emptyState: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		emptyText: {
			fontSize: 16,
			color: colors.text.disabled,
		},
		modalOverlay: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: colors.background.overlay,
			justifyContent: 'center',
			padding: 20,
		},
	});
};
