// Goods Feature - GoodsFilter Component
// Pure presentational component for filtering goods by status

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Chip } from 'react-native-paper';
import { GoodsStatus } from '../api';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CUSTOMER_GOODS_STATUS_LABELS } from '@src/shared/lib/customerStatus';

type FilterTab = 'ALL' | GoodsStatus;

interface FilterOption {
	key: FilterTab;
	label: string;
}

const filterOptions: FilterOption[] = [
	{ key: 'ALL', label: 'Tous' },
	{ key: 'RECEIVED_AT_WAREHOUSE', label: CUSTOMER_GOODS_STATUS_LABELS.RECEIVED_AT_WAREHOUSE },
	{ key: 'ASSIGNED_TO_CONTAINER', label: CUSTOMER_GOODS_STATUS_LABELS.ASSIGNED_TO_CONTAINER },
	{ key: 'LOADED_IN_CONTAINER', label: CUSTOMER_GOODS_STATUS_LABELS.LOADED_IN_CONTAINER },
	{ key: 'IN_TRANSIT', label: CUSTOMER_GOODS_STATUS_LABELS.IN_TRANSIT },
	{ key: 'ARRIVED_DESTINATION', label: CUSTOMER_GOODS_STATUS_LABELS.ARRIVED_DESTINATION },
	{ key: 'READY_FOR_PICKUP', label: CUSTOMER_GOODS_STATUS_LABELS.READY_FOR_PICKUP },
	{ key: 'DELIVERED', label: CUSTOMER_GOODS_STATUS_LABELS.DELIVERED },
];

interface GoodsFilterProps {
	activeFilter: FilterTab;
	onFilterChange: (filter: FilterTab) => void;
}

export const GoodsFilter: React.FC<GoodsFilterProps> = ({
	activeFilter,
	onFilterChange,
}) => {
	const { colors } = useAppTheme();

	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					paddingVertical: 12,
					backgroundColor: colors.background.card,
					borderBottomWidth: 1,
					borderBottomColor: colors.border,
				},
				filterList: {
					paddingHorizontal: 16,
					gap: 8,
				},
				chip: {
					backgroundColor: colors.background.paper,
					marginRight: 8,
				},
				chipText: {
					fontFamily: Fonts.meduim,
				},
			}),
		[colors]
	);

	const renderItem: ListRenderItem<FilterOption> = ({ item }) => (
		<Chip
			selected={activeFilter === item.key}
			onPress={() => onFilterChange(item.key)}
			style={[
				styles.chip,
				activeFilter === item.key && {
					backgroundColor: colors.primary.main,
				},
			]}
			textStyle={[
				styles.chipText,
				activeFilter === item.key
					? { color: colors.text.inverse }
					: { color: colors.text.secondary },
			]}
		>
			{item.label}
		</Chip>
	);

	return (
		<View style={styles.container}>
			<FlashList
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
