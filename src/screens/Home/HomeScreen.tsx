import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { IMAGES } from '@src/constants/Images';
import { HEIGHTTODP, WIDTHTODP } from '@src/constants/Dimensions';
import { HomeTabScreenProps } from '@src/navigations/type';

const data = [
	{
		id: '0',
		title: 'Ajouter une commande',
		Icons: <MaterialIcons name='add-location' size={34} color={COLORS.blue} />,
		route: 'AddOrder',
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
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<Image source={IMAGES.logo} style={styles.imageStyle} />
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
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	imageStyle: {
		height: HEIGHTTODP(70),
		width: WIDTHTODP(60),
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: HEIGHTTODP(1),
	},
});
