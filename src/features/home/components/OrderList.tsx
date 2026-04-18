import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
// import { LoadingSpinner } from '@src/components/common/LoadingSpinner';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { COLORS } from '@src/constants/Colors';
// import RetryButton from '@src/components/common/Error';
import { useGetActiveOrder } from '@src/shared/hooks/useOrders';
import OrderCard from './OrderCard';

interface Props {
	Status: string;
}
const ListingList = ({ Status }: Props) => {
	const navigation = useNavigation();
	const { data, isLoading, isError, fetchNextPage, refetch, hasNextPage, isFetchingNextPage } = useGetActiveOrder();
	const renderFooter = () => {
		if (isFetchingNextPage) {
			return <ActivityIndicator size='small' color={COLORS.blue} animating />;
		} else if (hasNextPage) {
			return (
				<TouchableOpacity style={styles.buttonContainer} onPress={loadMore}>
					<Text style={styles.buttonText}>Voir</Text>
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	};
	const loadMore = () => {
		if (hasNextPage) {
			fetchNextPage();
		}
	};

	if (isError) {
		// return <RetryButton isError={isError} refetch={refetch} />;
	}

	if (isLoading) {
		return <ActivityIndicator size='large' color={COLORS.blue} animating />;
	}

	return (
		<>
			<FlashList
				onEndReached={loadMore}
				ListEmptyComponent={() => {
					return <Text style={{ textAlign: 'center', fontSize: 26 }}> Aucune commande</Text>;
				}}
				showsVerticalScrollIndicator={false}
				data={data?.pages?.flatMap((page) => page)}
				keyExtractor={(item) => item._id!}
				renderItem={({ item }) => {
					return (
						<>
							<OrderCard
								navigation={navigation}
								id={item._id!}
								images={item.images!}
								name={item.clientName}
								clientPhone={item.clientPhone}
								shippingCode={item.code!}
								quantity={item.quantity!}
								shippingMode={item.shippingMode!}
								typeOfPackage={item.typeOfPackage!}
								dateOfReception={item?.dateOfReception!}
								currentLocation={item.route[item.route.length - 1].title}
								departureDate={item?.departureDate}
							/>
						</>
					);
				}}

				ListFooterComponent={renderFooter}
			/>
		</>
	);
};

export default ListingList;
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
