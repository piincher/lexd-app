import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { IMAGES } from '@src/constants/Images';
import { HEIGHTTODP, WIDTHTODP } from '@src/constants/Dimensions';
import { HomeTabScreenProps, RootStackParamList } from '@src/navigations/type';
import ListingList from './components/OrderList';
import { Fonts } from '@src/constants/Fonts';
import { useAuth } from '@src/store/Auth';
import * as WebBrowser from 'expo-web-browser';
import { useGetActiveOrder, useViewSmsBalance } from './hooks/useGetActiveOrders';
import { RowDetails } from './components/RowDetails';
import { ItemList } from './components/ItemList';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ListItemOrders } from '@src/components/ListItemOrders';
import { UserHeaderInfo } from './components/UserHeaderInfo';

type dataType = {
	id: string;
	title: string;
	route: keyof RootStackParamList;
}[];
const data: dataType = [
	{
		id: '0',
		title: 'Ajouter une commande',
		route: 'SelectUser',
	},
	{
		id: '1',
		title: 'Voir les commandes actives',
		route: 'ActiveOrder',
	},
	{
		id: '2',
		title: 'Ajouter un utilisateur',
		route: 'UserAdd',
	},

	{
		id: '3',
		title: 'Voir les commandes passées',
		route: 'AdmninPastOrders',
	},
	{
		id: '4',
		title: 'Envoyer un sms de rappel',
		route: 'SendSms',
	},
	{
		id: '5',
		title: 'Scannez pour confirmer la reception',
		route: 'ScanQRCode',
	},
];

const HomeScreen = ({ navigation }: HomeTabScreenProps<'Home'>) => {
	const { role, firstName, lastName } = useAuth((state) => state.user);
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetActiveOrder('Active');

	const loadMore = () => {
		if (hasNextPage) {
			fetchNextPage();
		}
	};

	const isAdmin = role === 'admin';
	const { data: smsData } = useViewSmsBalance(isAdmin);

	const _handlePressButtonAsync = async (url: string) => {
		let result = await WebBrowser.openBrowserAsync(url);
	};

	const date = smsData && smsData[0]?.expirationDate ? new Date(smsData[0].expirationDate) : new Date();
	const formattedDateTime = date.toISOString().replace('T', ' ').slice(0, -5);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			{isAdmin ? (
				<>
					<ScrollView>
						<RowDetails label='Le nombre de SMS restant' value={smsData?.[0]?.availableUnits ?? 0} />
						<RowDetails label="la date d'expiration de sms" value={formattedDateTime} />

						<ItemList data={data} navigation={navigation} />
					</ScrollView>
				</>
			) : (
				<>
					<UserHeaderInfo firstName={firstName} lastName={lastName} />

					<ListItemOrders
						data={data!}
						loadMore={loadMore}
						isFetchingNextPage={isFetchingNextPage}
						hasNextPage={hasNextPage}
					/>
				</>
			)}
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	imageStyle: {
		height: HEIGHTTODP(70),
		width: WIDTHTODP(70),
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: HEIGHTTODP(1),
	},
	smsText: {
		fontSize: 24,
		fontFamily: Fonts.black,
		color: COLORS.blue,
		textAlign: 'center',
		marginTop: 10,
	},
	container: {
		flex: 1,
	},
});
