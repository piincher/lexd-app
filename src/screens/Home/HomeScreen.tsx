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
import { useViewSmsBalance } from './hooks/useGetActiveOrders';
import { RowDetails } from './components/RowDetails';
import { ItemList } from './components/ItemList';

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
];

const HomeScreen = ({ navigation }: HomeTabScreenProps<'Home'>) => {
	const { role } = useAuth((state) => state.user);
	const logout = useAuth((state) => state.logOut);

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
					<View
						style={{
							backgroundColor: COLORS.blue,
							flexDirection: 'row',
							justifyContent: 'space-around',
							alignItems: 'center',
							padding: 10,
						}}
					>
						<Pressable onPress={() => _handlePressButtonAsync('https://wa.me/8618851725957')}>
							<MaterialCommunityIcons name='whatsapp' size={34} color={COLORS.green} />
						</Pressable>
						<Text style={{ fontSize: 24, textAlign: 'center', fontFamily: Fonts.boldItalic, color: COLORS.white }}>
							ChinaLink Express
						</Text>
						<Pressable onPress={() => logout()}>
							<MaterialCommunityIcons name='logout' size={34} color={COLORS.white} />
						</Pressable>
					</View>
					<View style={{ flex: 1, paddingTop: 40, paddingHorizontal: 21 }}>
						<ListingList Status='Active' />
					</View>
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
