import { FlashList } from '@shopify/flash-list';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { OrderListSkeleton } from '@src/features/orders/components/OrderListSkeleton';

import { COLORS } from '@src/constants/Colors';

export interface OrderItem {
	_id?: string;
	clientName: string;
	clientPhone: string;
	code?: string;
	quantity?: number;
	shippingMode?: string;
	typeOfPackage?: string;
	dateOfReception?: string;
	departureDate?: string;
	images?: unknown;
	route: Array<{ title: string }>;
}

interface OrderListProps {
	/** Status filter for orders */
	Status: string;
	/** Order data to display */
	data?: {
		pages?: OrderItem[][];
	};
	/** Loading state */
	isLoading: boolean;
	/** Error state */
	isError: boolean;
	/** Whether there's more data to fetch */
	hasNextPage?: boolean;
	/** Whether next page is being fetched */
	isFetchingNextPage: boolean;
	/** Callback to fetch next page */
	fetchNextPage: () => void;
	/** Callback to refetch data */
	refetch?: () => void;
	/** Custom render item component */
	renderItem: (item: OrderItem) => React.ReactElement;
	/** Empty list message */
	emptyMessage?: string;
}

export const OrderList: React.FC<OrderListProps> = ({
	data,
	isLoading,
	isError,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	renderItem,
	emptyMessage = 'Aucune commande',
}) => {
	const loadMore = () => {
		if (hasNextPage) {
			fetchNextPage();
		}
	};

	const renderFooter = () => {
		if (isFetchingNextPage) {
			return <ActivityIndicator size='small' color={COLORS.blue} animating />;
		} else if (hasNextPage) {
			return (
				<TouchableOpacity style={styles.buttonContainer} onPress={loadMore}>
					<Text style={styles.buttonText}>Voir</Text>
				</TouchableOpacity>
			);
		}
		return null;
	};

	if (isLoading) {
		return <OrderListSkeleton count={4} />;
	}

	return (
		<FlashList
			onEndReached={loadMore}
			ListEmptyComponent={() => (
				<Text style={{ textAlign: 'center', fontSize: 26 }}>{emptyMessage}</Text>
			)}
			showsVerticalScrollIndicator={false}
			data={data?.pages?.flatMap((page) => page) || []}
			keyExtractor={(item) => item._id!}
			renderItem={({ item }) => renderItem(item)}

			ListFooterComponent={renderFooter}
		/>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 16,
		elevation: 2,
	},
	buttonText: {
		fontSize: 16,
		color: '#000000',
		fontWeight: 'bold',
	},
});

export default OrderList;
