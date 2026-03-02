// Goods Feature - GoodsFilter Component
// Pure presentational component for filtering goods by status

import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { GoodsStatus } from '../api';
import { Fonts } from '@src/constants/Fonts';

type FilterTab = 'ALL' | GoodsStatus;

interface FilterOption {
	key: FilterTab;
	label: string;
}

const filterOptions: FilterOption[] = [
	{ key: 'ALL', label: 'Tous' },
	{ key: 'RECEIVED_AT_WAREHOUSE', label: 'En Entrepôt' },
	{ key: 'ASSIGNED_TO_CONTAINER', label: 'Assigné' },
	{ key: 'LOADED_IN_CONTAINER', label: 'Chargé' },
	{ key: 'IN_TRANSIT', label: 'En Transit' },
	{ key: 'ARRIVED_DESTINATION', label: 'Arrivé' },
	{ key: 'READY_FOR_PICKUP', label: 'Prêt' },
	{ key: 'DELIVERED', label: 'Livré' },
];

interface GoodsFilterProps {
	activeFilter: FilterTab;
	onFilterChange: (filter: FilterTab) => void;
}

export const GoodsFilter: React.FC<GoodsFilterProps> = ({
	activeFilter,
	onFilterChange,
}) => {
	const theme = useTheme();

	const renderItem: ListRenderItem<FilterOption> = ({ item }) => (
		<Chip
			selected={activeFilter === item.key}
			onPress={() => onFilterChange(item.key)}
			style={[
				styles.chip,
				activeFilter === item.key && {
					backgroundColor: theme.colors.primary,
				},
			]}
			textStyle={[
				styles.chipText,
				activeFilter === item.key && { color: 'white' },
			]}
		>
			{item.label}
		</Chip>
	);

	return (
		<View style={styles.container}>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={filterOptions}
				renderItem={renderItem}
				keyExtractor={(item) => item.key}
				contentContainerStyle={styles.filterList}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: '#E0E0E0',
	},
	filterList: {
		paddingHorizontal: 16,
		gap: 8,
	},
	chip: {
		backgroundColor: '#E8E8E8',
		marginRight: 8,
	},
	chipText: {
		fontFamily: Fonts.meduim,
	},
});
