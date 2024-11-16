import { FlashList } from '@shopify/flash-list';
import { productType } from '@src/api/order';
import { COLORS } from '@src/constants/Colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { RenderOrder } from './RenderOrder/RenderOrder';
import { LoadingSpinner } from './LoadingSpinner';

interface ListItemOrdersProps {
	loadMore: () => void;
	data: { pages: productType[][] | undefined };
	isFetchingNextPage: boolean;
	hasNextPage: boolean;
	isLoading: boolean;
}

export const ListItemOrders = ({ loadMore, data, isFetchingNextPage, hasNextPage, isLoading }: ListItemOrdersProps) => {
	const renderFooter = () => {
		if (isFetchingNextPage) {
			return <ActivityIndicator size='small' color={COLORS.blue} animating />;
		} else if (hasNextPage) {
			return (
				<TouchableOpacity onPress={loadMore}>
					<Text>Voir</Text>
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<FlashList
				onEndReached={loadMore}
				ListEmptyComponent={() => {
					return <Text style={{ textAlign: 'center', fontSize: 26 }}> Aucune commande en Cours</Text>;
				}}
				showsVerticalScrollIndicator={false}
				data={data}
				keyExtractor={(item) => item._id!}
				renderItem={({ item }) => {
					return <RenderOrder item={item} />;
				}}
				ListFooterComponent={renderFooter}
				estimatedItemSize={200}
			/>
		</>
	);
};

const styles = StyleSheet.create({});
