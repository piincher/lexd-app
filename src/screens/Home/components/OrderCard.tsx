import { imagesType } from '@src/api/order';
import CardView from '@src/components/ImageCaroussel/ImageCaroussel';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppButton from '@src/components/AppButton/AppButton';
import { initMixpanel } from '@src/config/Analytic';
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
	const navigateToDetail = () => {
		mixpanel.track('OrderDetail', { id });
		mixpanel.getDeviceId();
		navigation.navigate('OrderDetail', { id });
	};
	return (
		<Pressable onPress={navigateToDetail}>
			<CardView images={images!} onPress={navigateToDetail} />
			<>
				<View style={{ borderColor: 'blue', borderWidth: 0.4, backgroundColor: '#D1DCFA' }}>
					<Text style={[styles.textStyle, styles.textWithBlack]}>
						<AntDesign name='user' size={24} color='black' />
						Nom : {name}
					</Text>
					<Text style={[styles.textStyle, { fontFamily: Fonts.black }]}>
						<AntDesign name='phone' size={24} color='black' />
						Numero de Telephone : {clientPhone}
					</Text>
					<Text style={[styles.textStyle, { fontFamily: Fonts.bold }]}>
						Numero de Suivi: <Text style={{ color: COLORS.blue, fontFamily: Fonts.black }}>{shippingCode}</Text>
					</Text>
					<Text style={[styles.textStyle, styles.textWithBlack]}>Date de reception:{dateOfReception}</Text>
					<Text style={[styles.textStyle, styles.textWithBlack]}>Mode de livraison: {shippingMode}</Text>
					<Text style={[styles.textStyle, styles.textWithBlack]}>Type de colis: {typeOfPackage}</Text>
					<Text style={[styles.textStyle, styles.textWithBlack]}>Position: {currentLocation}</Text>
					<Text style={[styles.textStyle, styles.textWithBlack]}>Nombre de Colis:{quantity}</Text>
					{/* <Text style={[styles.textStyle, styles.textWithBlack, { fontSize: 28, color: COLORS.Crimson }]}>
						Date de depart :{departureDate}
					</Text> */}

					<View style={styles.rowContainer}>
						<View style={styles.rowContainer}></View>
						<>{/* <Icon name='star' size={20} color={COLORS.black} onPress={() => {}} /> */}</>
					</View>
				</View>
			</>
		</Pressable>
	);
};

// const width = Dimensions.get("screen").width / 2 - 30;
const styles = StyleSheet.create({
	heartstyle: {
		position: 'absolute',
		right: 10,
		top: 10,
		zIndex: 1,
	},
	textStyle: {
		fontSize: 18,
		color: COLORS.black,
		padding: 5,
	},
	textWithBlack: {
		fontFamily: Fonts.bold,
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 1,
		paddingBottom: 20,
	},
});

export default OrderCard;
