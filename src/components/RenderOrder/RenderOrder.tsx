import { productType } from '@src/api/order';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@src/screens/Admin/screens/ActiveOrder/components/Slider';
import { ListItem } from '../ListItem/ListItem';
import { Button, Text } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import React from 'react';
import { useAuth } from '@src/store/Auth';

export const RenderOrder = ({ item }: { item: productType }) => {
	const currentRoute = item?.route?.[item?.route?.length - 1];
	const { role } = useAuth((state) => state.user);

	const navigation = useNavigation();

	const textContentData = [
		{ label: 'Nom du client', value: item.clientName, id: '0' },
		{ label: 'Numéro du client', value: item.clientPhone, id: '1' },
		{ label: 'Numéro de suivi', value: item.code, id: '2' },
		{ label: "Mode d'expédition", value: item.shippingMode, id: '3' },
		{ label: 'Type de colis', value: item.typeOfPackage, id: '4' },
		{ label: 'Position Actuelle', value: currentRoute?.title ?? 'le client a passé une commande', id: '5' },
		{ label: 'Nombre de colis', value: item.quantity, id: '6' },
	];
	const handleNavigate = () => {
		if (role === 'admin') {
			navigation.navigate('ActiveOrderDetails', {
				id: item._id!,
			});
			return;
		} else {
			navigation.navigate('OrderDetail', {
				id: item._id!,
			});
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			{/* image slider section */}

			<Slider bannerImages={item?.images!} handleNavigate={handleNavigate} />
			{/* text container section */}
			<>
				{textContentData.map((content, index) => {
					return (
						<Pressable onPress={handleNavigate} key={content.id}>
							<ListItem label={content.label} value={content.value!} index={content.id} />
							<View style={styles.bottomLine} />
						</Pressable>
					);
				})}
			</>

			{/* Button */}

			{role === 'admin' && (
				<Button mode='contained' style={styles.buttonStyle} onPress={handleNavigate}>
					<Text style={{ fontFamily: Fonts.meduim, color: COLORS.white }}>Next</Text>
				</Button>
			)}
		</SafeAreaView>
	);
};

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	buttonStyle: {
		width: 200,
		alignSelf: 'center',
		backgroundColor: COLORS.blue,
		marginTop: 20,
		height: 40,
		borderRadius: 1,
	},
	bottomLine: {
		borderBottomColor: COLORS.grey,
		borderBottomWidth: 0.2,
		marginHorizontal: 20,
		marginVertical: 5,
	},
});
