import { DetailRow } from '@src/components/DetailsRow/DetailsRow';
import { Header } from '@src/components/Header/Header';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { RootStackScreenProps } from '@src/navigations/type';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChatClient } from '../Chat/hooks/useChatClient';
import { useGetOrderDetails } from './hooks/useGetOrderDetail';
import { formatDate } from '@src/utils/formatDate';
import Svg, { Line, Circle } from 'react-native-svg';
import { getTranslation } from '@src/services/translate';
import { routes } from '@src/api/order';

interface StepIndicatorProps {
	steps: Array<{
		id: string;
		title: string;
		time: string;
	}>;
	currentStep: number;
}

const statusData = {
	orderDetail: [
		{
			id: '1',
			status: 'Order arrived at warehouse',
			coordinates: [{ latitude: 23.1291, longitude: 113.2644, location: 'Guangzhou' }],
		},
		{
			id: '2',
			status: 'Order in Processing',
			coordinates: [{ latitude: 23.1291, longitude: 113.2644, location: 'Guangzhou entrepot' }],
		},
		{
			id: '3',
			status: 'Order in Transit',
			coordinates: [
				{
					latitude: 22.5429,
					longitude: 113.9526,
					location: 'Hong Kong',
					note: 'les Colis sont expédiées et transférées vers le port',
				},
				{
					latitude: 22.3193,
					longitude: 114.1694,
					location: 'Hong Kong',
					note: "Les Colis sont transféré à l'entrepôt de Hong Kong",
				},
				{
					latitude: 22.308,
					longitude: 113.9185,
					location: "L'Éthiopie",
					note: "Les colis ont décollé pour L'Éthiopie",
				},
				{
					latitude: 8.97778,
					longitude: 38.7994,
					location: 'Ethiopie',
					note: "Les Colis transféré vers l'aéroport d'Éthiopie",
				},
				{
					latitude: 12.5416,
					longitude: -7.94994,
					location: 'Bamako, Mali',
					note: "Colis arrivé à l'aéroport du Mali et prêt pour dédouanement",
				},
				{
					latitude: 12.5585407,
					longitude: -7.9811036,
					location: 'Bamako, Mali Aeroport',
					note: 'Les marchandises sont arrivées et ont été stockées (Kalaban-Coura, près de FEBAK, précisément à côté du lycée Birgo. +22376696177 / +22350005142)',
				},
			],
		},
		{
			id: '4',
			status: 'Order in Arrived',
			coordinates: [{ latitude: 23.1291, longitude: 113.2644, location: 'Kalaban-Coura pret du lycee birgo' }],
		},
	],
};

// const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
// 	return (
// 		<View style={styles2.container}>
// 			{steps?.map((step, index) => {
// 				const date = new Date(step.time ?? new Date());
// 				const formattedDate = date.toISOString().split('T')[0];
// 				const hours = date.getUTCHours().toString().padStart(2, '0');
// 				const minutes = date.getUTCMinutes().toString().padStart(2, '0');
// 				const formattedDateTime = `${formattedDate} ${hours}:${minutes}`;

// 				return (
// 					<View key={step.id} style={styles2.stepContainer}>
// 						<View style={styles2.stepInnerContainer}>
// 							<View style={[styles2.circle, index <= currentStep && styles2.activeCircle]}>
// 								<Text style={[styles2.stepText, index <= currentStep && styles2.activeStepText]}>{index + 1}</Text>
// 							</View>
// 							<Text style={[styles2.label, index <= currentStep && styles2.activeLabel]} numberOfLines={3}>
// 								{formattedDateTime}
// 							</Text>
// 							<Text style={[styles2.label, index <= currentStep && styles2.activeLabel]} numberOfLines={3}>
// 								{step?.title}
// 							</Text>
// 						</View>
// 						{index < steps.length - 1 && <View style={[styles2.line, index < currentStep && styles2.activeLine]} />}
// 					</View>
// 				);
// 			})}
// 		</View>
// 	);
// };

// const styles2 = StyleSheet.create({
// 	container: {
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	stepContainer: {
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 		marginBottom: 20,
// 	},
// 	stepInnerContainer: {
// 		alignItems: 'center',
// 		marginBottom: 5, // Space between the circle and the label
// 	},
// 	circle: {
// 		width: 30,
// 		height: 30,
// 		borderRadius: 15,
// 		backgroundColor: '#ccc',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	activeCircle: {
// 		backgroundColor: '#4caf50',
// 	},
// 	stepText: {
// 		color: '#fff',
// 	},
// 	activeStepText: {
// 		color: '#fff',
// 	},
// 	label: {
// 		marginTop: 5,
// 		color: '#ccc',
// 		textAlign: 'center',
// 	},
// 	activeLabel: {
// 		color: '#4caf50',
// 		fontFamily: Fonts.bold,
// 	},
// 	line: {
// 		width: 2,
// 		height: 30,
// 		backgroundColor: '#ccc',
// 	},
// 	activeLine: {
// 		backgroundColor: '#4caf50',
// 	},
// });

interface Coordinate {
	_id: string;
	latitude: number;
	longitude: number;
	location: string;
}

// Define the type for the status
interface Status {
	statusData: {
		coordinates: Coordinate[];
		id: string;
		note: string;
		time: string; // ISO date string
		title: string;
		status: string;
	}[];
}
const StatusTimeline = ({ statusData }: Status) => {
	if (!statusData || statusData.length === 0) {
		return (
			<View>
				<Text style={styles3.noShippingText}>Les données logistiques ne sont pas encore disponibles."</Text>
			</View>
		);
	}
	const determineCurrentStatus = (orderDetails) => {
		// Assuming the current status is the last one in the array
		// return orderDetails ? orderDetails[orderDetails?.length - 1] : 0;
		return orderDetails.length > 0 ? orderDetails.length - 1 : -1;
	};

	const currentStatusIndex = determineCurrentStatus(statusData);
	return (
		<View style={styles3.container}>
			<Svg height={(statusData?.length + 1) * 60} width='50'>
				<Line x1='25' y1='0' x2='25' y2={(statusData.length + 1) * 200} stroke='gray' strokeWidth='1' />
				{statusData?.map((item, index) => (
					<Circle
						key={item.id}
						cx='25'
						cy={(index + 1) * 59}
						r='10'
						fill={index <= currentStatusIndex ? COLORS.blue : 'white'}
						stroke={COLORS.blue}
						strokeWidth='1'
					/>
				))}
			</Svg>
			<View style={styles3.statusContainer}>
				{statusData?.map((item, index) => {
					return (
						<>
							<View key={item.id} style={styles3.statusItem}>
								<Text style={styles3.statusText}>{item.title}</Text>
								<Text style={styles3.locationText}>{item.note}</Text>
							</View>
						</>
					);
				})}
			</View>
		</View>
	);
};

const styles3 = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	statusContainer: {},
	noShippingText: {
		fontFamily: Fonts.bold,
		fontSize: 22,
		color: COLORS.redShade,
		textAlign: 'center',
		marginTop: 30,
	},
	statusItem: {
		top: '9%',
	},
	statusText: {
		fontSize: 14,
		color: COLORS.blue,
		marginTop: 21,
		marginBottom: 9,
		fontFamily: Fonts.bold,
	},
	locationText: { fontSize: 12, color: COLORS.grey },
});

const OrderDetails = ({ route, navigation }: RootStackScreenProps<'OrderDetail'>) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [actualLocation, setActualLocation] = useState('');
	useChatClient();

	const showModal = () => {
		setModalVisible(true);
	};

	const hideModal = () => setModalVisible(false);

	const [currentStep, setCurrentStep] = React.useState(0);
	const id = route.params.id;
	const { data: item, isPending } = useGetOrderDetails(id);

	useEffect(() => {
		// setCurrentStep(item?.route.length ?? 0);
	}, [item]);
	useEffect(() => {
		const datad = item?.route?.[item.route?.length - 1] ?? [];
		const coordinateArr = datad?.coordinates || [];
		const lastItem = coordinateArr[coordinateArr?.length - 1];
		setActualLocation(lastItem?.location);
	}, [item]);
	const handleChat = () => {
		navigation.navigate('SelectAdminToChatWith');
	};

	const handleNavigateToMap = () => {
		navigation.navigate('Map', { id });
	};

	console.log('item data', item?.route);

	const formattedDateTime = formatDate(item?.departureDate!);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>
				<Header title='Détails de suivi' navigation={navigation} />
				<View
					style={{
						flexDirection: 'row',
						padding: 20,
						marginHorizontal: 10,
						alignItems: 'center',
					}}
				>
					<Image source={{ uri: item?.images[0]?.url }} style={{ width: 50, height: 50 }} />
					<View style={{ marginLeft: 12 }}>
						<Text style={styles.category}>{item?.typeOfPackage}</Text>
						<Text style={styles.trackingNumber}>Numero de Suivi:{item?.code}</Text>
					</View>
				</View>
				<View style={styles.detailContainer}>
					{/* Logistics details */}
					<DetailRow label1="Pays d'envoie" value1='Chine' label2='Pays de reception' value2='Bamako, Mali' />
					{/* Goods information */}
					<DetailRow
						label1='Client'
						value1={item?.clientName!}
						label2='Nombre de Kilo'
						value2={String(item?.packageWeight!)}
					/>
					{/* Status and type */}
					<DetailRow
						label1='Status'
						value1={item?.currentStatus! || 'le client a passe la commande'}
						label2='Type de colis'
						value2={item?.typeOfPackage!}
					/>
					<DetailRow
						label1='Position actuelle'
						value1={actualLocation || 'En attente'}
						label2='Date de depart'
						value2={formattedDateTime}
					/>
				</View>
				<StatusTimeline statusData={item?.route} />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	detailContainer: {
		borderWidth: 0.2,
		padding: 20,
		margin: 20,
		borderColor: COLORS.grey,
		borderRadius: 5,
	},
	category: {
		fontFamily: Fonts.bold,
		fontSize: 18,
	},
	trackingNumber: {
		fontFamily: Fonts.regular,
		fontSize: 16,
		color: COLORS.grey,
	},
});
// const styles = StyleSheet.create({
// 	formContainer: { width: '100%', alignItems: 'center', justifyContent: 'center' },

// 	containerStyle: {
// 		marginBottom: 20,
// 		marginTop: 10,
// 	},
// 	iconContainer: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'space-between',
// 		marginTop: 10,
// 		marginBottom: 10,
// 	},
// 	iconStyle: {
// 		marginRight: 50,
// 	},
// 	rowContainer: {
// 		alignItems: 'center',
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		marginBottom: 3,
// 	},
// 	shadowStyle: {
// 		borderRadius: 8,
// 		borderWidth: 0.1,
// 		padding: 10,
// 		shadowColor: '#000',
// 		shadowOffset: {
// 			width: 0,
// 			height: 1,
// 		},
// 		shadowOpacity: 0.2,
// 		shadowRadius: 1.41,

// 		elevation: 2,
// 	},

// 	centeredView: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		marginTop: 22,
// 	},
// 	modalView: {
// 		margin: 20,
// 		backgroundColor: 'white',
// 		borderRadius: 20,
// 		padding: 30,
// 		alignItems: 'center',
// 		shadowColor: '#000',
// 		width: '70%',
// 		height: '20%',
// 		shadowOffset: {
// 			width: 0,
// 			height: 2,
// 		},
// 		shadowOpacity: 0.25,
// 		shadowRadius: 4,
// 		elevation: 5,
// 	},
// 	modalText: {
// 		marginBottom: 15,
// 		fontSize: 16,
// 		marginRight: '70%',
// 		fontFamily: Fonts.bold,
// 	},
// 	cancelText: { alignSelf: 'flex-start', fontFamily: Fonts.bold },
// 	deleteText: { color: COLORS.green, alignSelf: 'flex-end', marginLeft: '69%', fontFamily: Fonts.bold },
// });

export default OrderDetails;

// <>
// 			<ScrollView style={{ width: '90%' }} showsVerticalScrollIndicator={false}>
// 				<CardView images={data?.images} />

// 				<View style={styles.shadowStyle}>
// 					{/* first row */}
// 					<View style={[styles.rowContainer]}>
// 						<View style={styles.rowContainer}>
// 							<Avatar.Image size={16} source={{ uri: 'https://picsum.photos/700' }} />
// 							<Text style={{ color: 'black', marginLeft: 10 }}>Nom : {data?.clientName}</Text>
// 						</View>
// 						<View style={styles.rowContainer}>
// 							<Text style={{ color: 'black' }}>Nbre de colis : {data?.quantity}</Text>
// 						</View>
// 					</View>
// 					{/* second row  */}
// 					<Text style={{ color: 'black' }}>{data?.clientPhone}</Text>
// 					{/* third row  */}
// 					<View style={[styles.rowContainer]}>
// 						<View style={[styles.rowContainer]}>
// 							<MaterialCommunityIcons name='arrow-left-circle' size={16} color='black' />
// 							<Text style={{ color: 'black' }}>{data?.code}</Text>
// 						</View>
// 					</View>
// 				</View>

// 				{isPending && <ActivityIndicator size='small' color='#0' />}
// 				{data?.route.length ?? 0 > 0 ? (
// 					<ScrollView>
// 						<Text style={{ textAlign: 'center', marginBottom: 25, fontFamily: Fonts.bold, fontSize: 18 }}>
// 							Le trajet de votre colis
// 						</Text>
// 						<View>
// 							<StepIndicator steps={data?.route!} currentStep={currentStep} />
// 						</View>
// 					</ScrollView>
// 				) : (
// 					<>
// 						<Image source={IMAGES.search} style={{ width: 'auto', height: 250 }} />
// 						<Text style={{ textAlign: 'center', fontFamily: Fonts.black, fontSize: 17 }}>En Attente</Text>
// 					</>
// 				)}

// 				{/* social media icons such instagram ,facebook and tik tok */}

// 				{/* About China Link Express   */}
// 			</ScrollView>
// 		</>
// 		<>
// 			<Modal
// 				animationType='fade'
// 				transparent={true}
// 				visible={modalVisible}
// 				onRequestClose={() => {
// 					setModalVisible(!modalVisible);
// 				}}
// 			>
// 				<View style={styles.centeredView}>
// 					<View style={styles.modalView}>
// 						<Text style={styles.modalText}>Colis recu?</Text>
// 						<Text style={{ fontFamily: Fonts.regular }}>Êtes-vous sûr(e) que vous avez reçu le colis ?</Text>
// 						<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
// 							<Pressable
// 								onPress={() => {
// 									setModalVisible(!modalVisible);
// 								}}
// 							>
// 								<Text style={styles.cancelText}> Annuler</Text>
// 							</Pressable>
// 							<Pressable
// 								onPress={() => {
// 									setModalVisible(false);
// 								}}
// 							>
// 								<Text style={styles.deleteText}>Confirmer</Text>
// 							</Pressable>
// 						</View>
// 					</View>
// 				</View>
// 			</Modal>
// 		</>
// 		<View
// 			style={{
// 				flexDirection: 'row',
// 				justifyContent: 'space-between',
// 				alignItems: 'center',
// 				alignContent: 'center',
// 				borderTopWidth: 0.5,
// 				padding: 10,
// 			}}
// 		>
// 			<View style={{ width: '60%', marginRight: 10 }}>
// 				<AppButton title='Voir sur le map' onPress={handleNavigateToMap} />
// 			</View>

// 			<Pressable onPress={handleChat}>
// 				<MaterialIcons name='chat' size={24} color='black' />
// 			</Pressable>
// 		</View>
