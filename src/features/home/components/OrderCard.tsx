import { imagesType } from '@src/api/order';
import CardView from '@src/components/ImageCaroussel/ImageCaroussel';
import { Fonts } from '@src/constants/Fonts';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppButton from '@src/components/AppButton/AppButton';
import { initMixpanel } from '@src/config/Analytic';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useMemo } from 'react';

interface props {
	clientPhone: string;
	shippingCode: string;
	quantity: number;
	shippingMode: string;
	typeOfPackage: string;
	name: string;
	navigation: any;
	id: string;
	dateOfReception?: string;
	images?: imagesType;
	currentLocation?: string;
	departureDate?: string;
}
const OrderCard = ({
	name,
	shippingCode,
	quantity,
	shippingMode,
	typeOfPackage,
	clientPhone,
	navigation,
	id,
	dateOfReception,
	images,
	currentLocation,
	departureDate,
}: props) => {
	const mixpanel = initMixpanel();
	const { colors } = useAppTheme();

	const styles = useMemo(
		() =>
			StyleSheet.create({
				card: {
					borderColor: colors.border,
					borderWidth: 0.4,
					backgroundColor: colors.background.card,
				},
				textStyle: {
					fontSize: 18,
					color: colors.text.primary,
					padding: 5,
				},
				textBold: {
					fontFamily: Fonts.bold,
				},
				codeText: {
					color: colors.primary.main,
					fontFamily: Fonts.black,
				},
				rowContainer: {
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingTop: 1,
					paddingBottom: 20,
				},
				rowWithIcon: {
					flexDirection: 'row',
					alignItems: 'center',
					paddingHorizontal: 5,
				},
			}),
		[colors]
	);

	const navigateToDetail = () => {
		mixpanel.track('OrderDetail', { id });
		mixpanel.getDeviceId();
		navigation.navigate('OrderDetail', { id });
	};
	return (
		<Pressable onPress={navigateToDetail}>
			<CardView images={images!} onPress={navigateToDetail} />
			<>
				<View style={styles.card}>
					<View style={styles.rowWithIcon}>
						<AntDesign name='user' size={24} color={colors.text.primary} />
						<Text style={[styles.textStyle, styles.textBold]} numberOfLines={1}>
							Nom : {name}
						</Text>
					</View>
					<View style={styles.rowWithIcon}>
						<AntDesign name='phone' size={24} color={colors.text.primary} />
						<Text style={[styles.textStyle, { fontFamily: Fonts.black }]} numberOfLines={1}>
							Numero de Telephone : {clientPhone}
						</Text>
					</View>
					<Text style={[styles.textStyle, { fontFamily: Fonts.bold }]} numberOfLines={1}>
						Numero de Suivi: <Text style={styles.codeText} numberOfLines={1}>{shippingCode}</Text>
					</Text>
					<Text style={[styles.textStyle, styles.textBold]} numberOfLines={1}>Date de reception:{dateOfReception}</Text>
					<Text style={[styles.textStyle, styles.textBold]} numberOfLines={1}>Mode de livraison: {shippingMode}</Text>
					<Text style={[styles.textStyle, styles.textBold]} numberOfLines={1}>Type de colis: {typeOfPackage}</Text>
					<Text style={[styles.textStyle, styles.textBold]} numberOfLines={1}>Position: {currentLocation}</Text>
					<Text style={[styles.textStyle, styles.textBold]} numberOfLines={1}>Nombre de Colis:{quantity}</Text>

					<View style={styles.rowContainer}>
						<View style={styles.rowContainer}></View>
					</View>
				</View>
			</>
		</Pressable>
	);
};

export default OrderCard;
