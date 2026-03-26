// Goods Feature - GoodsList Component
// Pure presentational component for displaying a list of goods

import React from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	RefreshControl,
	ListRenderItem,
} from 'react-native';
import { Goods } from '../api';
import { GoodsCard } from './GoodsCard';
import { GoodsEmptyState } from './GoodsEmptyState';

interface GoodsListProps {
	goods: Goods[];
	refreshing?: boolean;
	onRefresh?: () => void;
	onGoodsPress?: (goodsId: string) => void;
	ListHeaderComponent?: React.ReactElement;
	ListFooterComponent?: React.ReactElement;
}

export const GoodsList: React.FC<GoodsListProps> = ({
	goods,
	refreshing = false,
	onRefresh,
	onGoodsPress,
	ListHeaderComponent,
	ListFooterComponent,
}) => {
	const renderItem: ListRenderItem<Goods> = ({ item }) => (
		<GoodsCard
			goods={item}
			onPress={() => onGoodsPress?.(item._id)}
		/>
	);

	const keyExtractor = (item: Goods) => item._id;

	return (
		<FlatList
			data={goods}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			contentContainerStyle={styles.listContent}
			showsVerticalScrollIndicator={false}
			refreshControl={
				onRefresh ? (
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				) : undefined
			}
			ListHeaderComponent={ListHeaderComponent}
			ListFooterComponent={ListFooterComponent}
			ListEmptyComponent={<GoodsEmptyState />}
		/>
	);
};

const styles = StyleSheet.create({
	listContent: {
		paddingVertical: 8,
		paddingBottom: 100,
	},
});
