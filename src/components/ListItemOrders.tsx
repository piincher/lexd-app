import { FlashList } from '@shopify/flash-list';
import { productType } from '@src/api/order';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { RenderOrder } from './RenderOrder/RenderOrder';
import { LoadingSpinner } from './LoadingSpinner';
import { Fonts } from '@src/constants/Fonts';

interface ListItemOrdersProps {
	loadMore: () => void;
	data: productType[] | undefined;
	isFetchingNextPage: boolean;
	hasNextPage: boolean;
	isLoading: boolean;
}

export const ListItemOrders = ({ loadMore, data, isFetchingNextPage, hasNextPage, isLoading }: ListItemOrdersProps) => {
	const { colors } = useAppTheme();

	const renderFooter = () => {
		if (isFetchingNextPage) {
			return <ActivityIndicator size='small' color={colors.primary.main} animating />;
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
					return (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
							<Text style={{ textAlign: 'center', fontSize: 18, color: colors.text.secondary, fontFamily: Fonts.meduim }}>
								Aucune commande trouvée
							</Text>
						</View>
					);
				}}
				showsVerticalScrollIndicator={false}
				data={data || []}
				keyExtractor={(item) => item._id!}
				renderItem={({ item }) => {
					return <RenderOrder item={item} />;
				}}
				ListFooterComponent={renderFooter}

			/>
		</>
	);
};

const styles = StyleSheet.create({});
