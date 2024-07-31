import { useNavigation } from '@react-navigation/native';
import { productType } from '@src/api/order';
import AppButton from '@src/components/AppButton/AppButton';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { useGetRoutes } from '@src/screens/Home/hooks/useRoute';
import * as Clipboard from 'expo-clipboard';
import React, { FC, useEffect } from 'react';
import { Alert, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetActiveOrdersAdmin, useUpdateOrder, useUpdateStatusDelivery } from '../../hooks/useOrder';
import { Category } from './components/Category';
import Slider from './components/Slider';
import { ListItem } from '@src/components/ListItem/ListItem';
import { FlashList } from '@shopify/flash-list';
import { ListItemOrders } from '@src/components/ListItemOrders';
interface Order {
	id: string;
	clientName: string;
	phoneNumber: string;
	trackingCode: string;
	typeOfGoods: string;
	weight: string;
	partner: string;
	image: string;
}

interface Props {}

const ActiveOrders: FC<Props> = () => {
	const [statusChange, setStatusChange] = React.useState('Active');
	const { data, fetchNextPage, isError, hasNextPage, isFetchingNextPage, refetch } =
		useGetActiveOrdersAdmin(statusChange);
	// prefetch routes
	useGetRoutes();

	console.log('fetch next page', hasNextPage);
	const loadMore = () => {
		if (hasNextPage) {
			fetchNextPage();
		}
	};

	useEffect(() => {
		refetch();
	}, [statusChange]);

	const onStatusChange = (itemValue: string) => {
		setStatusChange(itemValue);
	};

	if (isError) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Erreur lors du chargement des commandes actives</Text>
				<AppButton title='Actualiser' onPress={refetch} />
			</View>
		);
	}
	return (
		<SafeAreaView style={styles.container}>
			<Category onStatusChange={onStatusChange} statusChange={statusChange} setStatusChange={setStatusChange} />
			<ListItemOrders
				data={data!}
				loadMore={loadMore}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default ActiveOrders;

// const steps = [
// 	{
// 		id: '0',
// 		title: 'le client a passé une commande',
// 		coordinates: { latitude: 23.1291, longitude: 113.2644 },
// 	},
// 	{
// 		id: '1',
// 		title: 'les colis sont emballées',
// 		coordinates: { latitude: 23.1291, longitude: 113.2644 },
// 	},
// 	{
// 		id: '2',
// 		title: 'les Colis sont expédiées et transférées vers le port',
// 		coordinates: { latitude: 22.5429, longitude: 113.9526 },
// 	},
// 	{
// 		id: '3',
// 		title: "Colis transféré à l'entrepôt de Hong Kong",
// 		coordinates: { latitude: 22.3193, longitude: 114.1694 },
// 	},
// 	{
// 		id: '4',
// 		title: "Le colis a décollé pour L'Éthiopie",
// 		coordinates: { latitude: 22.308, longitude: 113.9185 },
// 	},
// 	{
// 		id: '5',
// 		title: "Colis transféré vers l'aéroport d'Éthiopie",
// 		coordinates: { latitude: 9.145, longitude: 40.4897 },
// 	},
// 	{
// 		id: '6',
// 		title: "Colis arrivé à l'aéroport du Mali et prêt pour dédouanement",
// 		coordinates: { latitude: 12.6392, longitude: -8.0029 },
// 	},
// 	{
// 		id: '7',
// 		title: 'marchandises sont arrivées au port et ont été stockées',
// 		coordinates: { latitude: 12.6392, longitude: -8.0029 },
// 	},
// ];

// // Extract coordinates from steps
// const coordinates = steps.map((step) => step.coordinates);

// <Polyline
// 	coordinates={coordinates}
// 	strokeColor='#000' // fallback for when `strokeColors` is not supported by the map-provider
// 	strokeColors={[
// 		'#7F0000',
// 		'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
// 		'#B24112',
// 		'#E5845C',
// 		'#238C23',
// 		'#7F0000',
// 	]}
// 	strokeWidth={6}
// />;
