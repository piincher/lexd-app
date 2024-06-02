import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { IMAGES } from '@src/constants/Images';
import { HEIGHTTODP, WIDTHTODP } from '@src/constants/Dimensions';
import { HomeTabScreenProps } from '@src/navigations/type';
import ListingList from './components/OrderList';
import { Fonts } from '@src/constants/Fonts';
import { useAuth } from '@src/store/Auth';
import * as WebBrowser from 'expo-web-browser';

const data = [
	{
		id: '0',
		title: 'Ajouter une commande',
		Icons: <MaterialIcons name='add-location' size={34} color={COLORS.blue} />,
		route: 'SelectUser',
	},
	{
		id: '1',
		title: 'Voir les commandes actives',
		Icons: <MaterialIcons name='remove-red-eye' size={34} color={COLORS.blue} />,
		route: 'ActiveOrder',
	},
	{
		id: '2',
		title: 'Voir les commandes passées',
		Icons: <MaterialCommunityIcons name='order-bool-ascending-variant' size={34} color={COLORS.blue} />,
		route: 'PastOrder',
	},
];
const HomeScreen = ({ navigation }: HomeTabScreenProps<'Home'>) => {
	const { role } = useAuth((state) => state.user);
	const logout = useAuth((state) => state.logOut);

	const isAdmin = role === 'admin';

	const _handlePressButtonAsync = async (url: string) => {
		let result = await WebBrowser.openBrowserAsync(url);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			{isAdmin ? (
				<>
					<ScrollView>
						<View
							style={{
								flex: 1,
							}}
						>
							{data.map((item) => {
								return (
									<Pressable
										key={item.id}
										style={{
											flexDirection: 'row',
											justifyContent: 'space-around',
											alignItems: 'center',
											borderColor: COLORS.black,
											borderWidth: 0.2,
											margin: 5,
											padding: 10,
										}}
										onPress={() => navigation.navigate(item.route)}
									>
										<Pressable>{item.Icons}</Pressable>
										<Text>{item.title}</Text>
										<MaterialIcons name='navigate-next' size={24} color='black' />
									</Pressable>
								);
							})}
						</View>
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
});
