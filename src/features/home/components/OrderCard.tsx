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
					<View style={styles.rowWithIcon}>
						<AntDesign name='user' size={24} color='black' />
						<Text style={[styles.textStyle, styles.textWithBlack]} numberOfLines={1}>
							Nom : {name}
						</Text>
					</View>
					<View style={styles.rowWithIcon}>
						<AntDesign name='phone' size={24} color='black' />
						<Text style={[styles.textStyle, { fontFamily: Fonts.black }]} numberOfLines={1}>
							Numero de Telephone : {clientPhone}
						</Text>
					</View>
					<Text style={[styles.textStyle, { fontFamily: Fonts.bold }]} numberOfLines={1}>
						Numero de Suivi: <Text style={{ color: COLORS.blue, fontFamily: Fonts.black }} numberOfLines={1}>{shippingCode}</Text>
					</Text>
					<Text style={[styles.textStyle, styles.textWithBlack]} numberOfLines={1}>Date de reception:{dateOfReception}</Text>
					<Text style={[styles.textStyle, styles.textWithBlack]} numberOfLines={1}>Mode de livraison: {shippingMode}</Text>
					<Text style={[styles.textStyle, styles.textWithBlack]} numberOfLines={1}>Type de colis: {typeOfPackage}</Text>
					<Text style={[styles.textStyle, styles.textWithBlack]} numberOfLines={1}>Position: {currentLocation}</Text>
					<Text style={[styles.textStyle, styles.textWithBlack]} numberOfLines={1}>Nombre de Colis:{quantity}</Text>
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
	rowWithIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 5,
	},
});

export default OrderCard;
