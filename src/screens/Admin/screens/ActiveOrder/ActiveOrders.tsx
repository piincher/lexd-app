import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { productType } from '@src/api/order';
import AppButton from '@src/components/AppButton/AppButton';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import * as Clipboard from 'expo-clipboard';
import React, { FC, useEffect, useId } from 'react';
import {
	Alert,
	Dimensions,
	FlatList,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { ActivityIndicator, Button, Card, Paragraph, Snackbar, Text, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetActiveOrdersAdmin, useUpdateOrder, useUpdateStatusDelivery } from '../../hooks/useOrder';
import { useGetRoutes } from '@src/screens/Home/hooks/useRoute';
import { Route } from '@src/api/route';
import Slider from './components/Slider';
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

const steps = [
	{
		id: '0',
		title: 'le client a passé une commande',
	},
	{
		id: '1',
		title: 'les colis sont emballées',
	},
	{
		id: '2',
		title: 'les Colis sont expédiées et transférées vers le port',
	},
	{
		id: '3',
		title: "Les Colis sont transféré à l'entrepôt de Hong Kong",
	},
	{
		id: '4',
		title: "Les colis ont décollé pour L'Éthiopie",
	},
	{
		id: '5',
		title: "Les Colis sont transféré vers l'aéroport d'Ethiopie",
	},
	{
		id: '6',
		title: "Les Colis sont arrivé à l'aéroport de Bamako et prêt pour le dédouanement",
	},
	{
		id: '7',
		title:
			'Les marchandises sont arrivées et ont été stockées (Kalaban-Coura, près de FEBAK, précisément à côté du lycée Birgo. +22376696177 / +22350005142)',
	},
];

const ActiveOrders: FC<Props> = () => {
	const Status = 'Active';
	const { data, fetchNextPage, isError, hasNextPage, isFetchingNextPage, refetch } = useGetActiveOrdersAdmin(Status);
	// prefetch routes
	useGetRoutes();
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
	const loadMore = () => {
		if (hasNextPage) {
			fetchNextPage();
		}
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
			<Text style={styles.textStyle}>Active Orders</Text>
			<FlatList
				onEndReached={loadMore}
				ListEmptyComponent={() => {
					return <Text style={{ textAlign: 'center', fontSize: 26 }}> Aucune commande</Text>;
				}}
				showsVerticalScrollIndicator={false}
				data={data?.pages?.flatMap((page) => page)}
				keyExtractor={(item) => item._id!}
				renderItem={({ item }) => {
					return <RenderOrder item={item} />;
				}}
				ListFooterComponent={renderFooter}
			/>
		</SafeAreaView>
	);
};

const windowWidth = Dimensions.get('window').width;

const RenderOrder = ({ item }: { item: productType }) => {
	const [visible, setVisible] = React.useState(false);
	const currentRoute = item?.route?.[item?.route?.length - 1];
	const [statusChange, setStatusChange] = React.useState(currentRoute?.title ?? '');
	const [coordinates, setCoordinates] = React.useState<Route['coordinates']>(
		currentRoute?.coordinates ?? { latitude: 0, longitude: 0 }
	);
	const { mutate, isPending, isSuccess } = useUpdateOrder();
	const { mutate: updateStatusDelivery } = useUpdateStatusDelivery();
	const id = Math.random().toString(36).substring(7);
	const navigation = useNavigation();

	useEffect(() => {
		if (isSuccess) {
			setVisible(true);
		}
	}, [isSuccess]);
	const currentPosition: {
		id: string;
		title: string;
		time: string;
		coordinates: { latitude: number; longitude: number };
	} = {
		id: id,
		title: statusChange,
		time: new Date().toISOString(),
		coordinates,
	};

	const copyToClipboard = async (text: string) => {
		await Clipboard.setStringAsync(text);
		Alert.alert('Copied to clipboard');
	};

	const updateDeliver = () => {
		updateStatusDelivery({
			...item,
			orderId: item._id,
		});
	};
	const onDismissSnackBar = () => setVisible(false);

	const textContentData = [
		{ label: 'Nom du client', value: item.clientName },
		{ label: 'Numéro du client', value: item.clientPhone },
		{ label: 'Numéro de suivi', value: item.code },
		{ label: "Mode d'expédition", value: item.shippingMode },
		{ label: 'Type de colis', value: item.typeOfPackage },
		{ label: 'Position Actuelle', value: statusChange },
		{ label: 'Nombre de colis', value: item.quantity },
	];
	const handleNavigate = () => {
		navigation.navigate('ActiveOrderDetails', {
			id: item._id!,
		});
	};
	return (
		<SafeAreaView>
			{/* <Snackbar
				visible={visible}
				onDismiss={onDismissSnackBar}
				style={{
					backgroundColor: COLORS.white,
					top: -50,
				}}
				duration={3000}
			>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						alignContent: 'center',
					}}
				>
					<Text style={{ fontFamily: Fonts.black, marginRight: 10 }}>La status a change</Text>
					<AntDesign name='checkcircle' size={24} color='green' />
				</View>
			</Snackbar> */}

			{/* image slider section */}
			<Slider bannerImages={item?.images!} />
			{/* text container section */}
			<>
				{textContentData.map((content, index) => (
					<View key={index} style={styles.textContent}>
						<Text style={styles.propertyStyle}>{content.label}</Text>
						<Text style={styles.textStyle}>{content.value}</Text>
					</View>
				))}
			</>

			{/* Button */}

			<Button mode='contained' style={styles.buttonStyle} onPress={handleNavigate}>
				<Text style={{ fontFamily: Fonts.meduim, color: COLORS.white }}>Update</Text>
			</Button>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderTopWidth: 0.2,
		borderColor: COLORS.grey,
		borderBottomWidth: 0.2,
		marginHorizontal: 10,
		padding: 10,
	},
	propertyStyle: {
		fontFamily: Fonts.regular,
	},
	textStyle: {
		textAlign: 'center',
		fontFamily: Fonts.regular,
		color: COLORS.grey,
	},
	buttonStyle: {
		width: 200,
		alignSelf: 'center',
		backgroundColor: COLORS.blue,
		marginTop: 20,
		height: 40,
		borderRadius: 1,
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
