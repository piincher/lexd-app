import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { IMAGES } from '@src/constants/Images';
import { HomeTabScreenProps } from '@src/navigations/type';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from '../components/Banner';
import BlockComponent from '../components/Block';
import { useShippingMode } from '@src/store/shippingMode';

const HomeScreen = ({ navigation }: HomeTabScreenProps<'Home'>) => {
	const setType = useShippingMode((state) => state.setType);
	const handlePressBlockOne = () => {
		const air = 'air';
		setType(air);
		navigation.navigate('UserActiveOrders', { type: air });
	};
	const handlePressBlockTwo = () => {
		const sea = 'sea';
		setType(sea);
		navigation.navigate('UserActiveOrders', { type: sea });
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<ScrollView>
				{/* display the logo on the left side and notification icon on the right  */}
				<View style={styles.headerContainer}>
					<Image source={IMAGES.flat_logo} style={{ width: '100%', height: 70 }} />
				</View>
				{/* <Header /> */}
				<Banner />
				<Text
					style={{ textAlign: 'center', fontFamily: Fonts.black, fontSize: 26, margin: 18, textTransform: 'uppercase' }}
				>
					Voir Plus
				</Text>
				<>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						{/* First row */}
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<BlockComponent
								title='Mes Commandes Aeriennes'
								icon='plane-departure' // Info icon from AntDesign
								backgroundColor={COLORS.blue} // Deep purple, eye-catching
								iconLib='FontAwesome6'
								onPress={handlePressBlockOne}
							/>
							<BlockComponent
								title='Mes Commandes Maritimes'
								icon='sailboat' // Question mark icon from FontAwesome
								backgroundColor='#1ED7B5' // Tomato red for energy
								iconLib='FontAwesome6'
								onPress={handlePressBlockTwo}
							/>
						</View>
					</View>
				</>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
	card: {
		borderWidth: 1,
		borderColor: COLORS.blue,
	},
	title: {
		borderColor: COLORS.blue,
		marginBottom: 20,
		fontFamily: Fonts.bold,
	},
	name: {
		fontSize: 16,
		marginBottom: 10,
		textAlign: 'left',
		marginRight: 50,
		fontFamily: Fonts.black,
	},
	date: {
		fontWeight: '500',
		marginBottom: 10,
	},
	daysRemaining: {
		textAlign: 'left',
		marginRight: 80,
		fontFamily: Fonts.bold,
	},
	headerContainer: {
		borderWidth: 0.5,
		borderColor: COLORS.blue,
	},
	hsCArgoText: { fontFamily: Fonts.bold, fontSize: 20 },
});

// {
// 		steps: [
// 			{
// 				id: '0',
// 				title: 'le client a passé une commande',
// 				coordinates: [
// 					{
// 						latitude: 23.1291,
// 						longitude: 113.2644,
// 						_id: '66bbb4da3f5437942b2c5fbb',
// 					},
// 				],
// 			},
// 			{
// 				id: '1',
// 				title: "Votre colis est arrivé à l'entrepôt",
// 				coordinates: [
// 					{
// 						latitude: 23.1291,
// 						longitude: 113.2644,
// 						_id: '66bbb4da3f5437942b2c5fbd',
// 					},
// 				],
// 				_id: '66bbb4da3f5437942b2c5fbc',
// 			},
// 			{
// 				id: '2',
// 				title: 'les colis sont emballées',
// 				coordinates: [
// 					{
// 						latitude: 23.1291,
// 						longitude: 113.2644,
// 						_id: '66bbb4da3f5437942b2c5fbf',
// 					},
// 				],
// 			},
// 			{
// 				id: '3',
// 				title: 'les Colis sont expédiées et transférées vers le port',
// 				coordinates: [
// 					{
// 						latitude: 22.5429,
// 						longitude: 113.9526,
// 					},
// 				],
// 			},
// 			{
// 				id: '4',
// 				title: "Les Colis sont transféré vers l'entrepôt de Hong Kong",
// 				coordinates: [
// 					{
// 						latitude: 22.3193,
// 						longitude: 114.1694,
// 					},
// 				],
// 				_id: '66bbb4da3f5437942b2c5fc2',
// 			},
// 			{
// 				id: '5',
// 				title: "Les colis ont décollé pour L'Éthiopie",
// 				coordinates: [
// 					{
// 						latitude: 22.308,
// 						longitude: 113.9185,
// 					},
// 				],
// 			},
// 			{
// 				id: '6',
// 				title: "Les Colis sont transférés vers l'aéroport d'Éthiopie",
// 				coordinates: [
// 					{
// 						latitude: 9.145,
// 						longitude: 40.4897,
// 						_id: '66bbb4da3f5437942b2c5fc7',
// 					},
// 				],
// 			},
// 			{
// 				id: '7',
// 				title: "Les Colis sont arrivé à l'aéroport de Bamakko et prêt pour le dédouanement",
// 				coordinates: [
// 					{
// 						latitude: 12.6392,
// 						longitude: -8.0029,
// 					},
// 				],
// 			},
// 			{
// 				id: '8',
// 				title:
// 					'Les marchandises sont arrivées  et ont été stockées (Kalaban-Coura, près de FEBAK, précisément à côté du lycée Birgo. +22376696177 / +22350005142)',
// 				coordinates: [
// 					{
// 						latitude: 12.6392,
// 						longitude: -8.0029,
// 					},
// 				],
// 			},
// 		],
// 	},
