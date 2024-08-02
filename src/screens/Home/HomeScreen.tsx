import { ListItemOrders } from '@src/components/ListItemOrders';
import { COLORS } from '@src/constants/Colors';
import { HomeTabScreenProps, RootStackParamList } from '@src/navigations/type';
import { useAuth } from '@src/store/Auth';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ItemList } from './components/ItemList';
import { RowDetails } from './components/RowDetails';
import { UserHeaderInfo } from './components/UserHeaderInfo';
import { useGetActiveOrder, useViewSmsBalance } from './hooks/useGetActiveOrders';

type dataType = {
	id: string;
	title: string;
	route: keyof RootStackParamList;
}[];
const list: dataType = [
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
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetActiveOrder('In Transit');

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

						<ItemList data={list} navigation={navigation} />
					</ScrollView>
				</>
			) : (
				<>
					<UserHeaderInfo firstName={firstName} lastName={lastName} />
					{/* <View
						style={{
							backgroundColor: COLORS.white,
							borderWidth: 0.5,
							borderColor: COLORS.blue,
							flexDirection: 'row',
							marginHorizontal: 20,
							justifyContent: 'space-between',
							padding: 10,
						}}
					>
						<TextInput placeholder='Entrez le Numero de suivi' />
						<Button mode='contained' style={{ backgroundColor: COLORS.blue, width: 97, borderRadius: 0 }}>
							Trackez
						</Button>
					</View> */}
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
