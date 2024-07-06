import SocialMedia from '@src/components/SocialMedia/SocialMedia';
import { Fonts } from '@src/constants/Fonts';
import { IMAGES } from '@src/constants/Images';
import { RootStackScreenProps } from '@src/navigations/type';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetOrderDetails } from './hooks/useGetOrderDetail';
import CardView from '@src/components/ImageCaroussel/ImageCaroussel';
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import AppButton from '@src/components/AppButton/AppButton';
import { MaterialIcons } from '@expo/vector-icons';
import { useChatClient } from '../Chat/hooks/useChatClient';

interface StepIndicatorProps {
	steps: Array<{
		id: string;
		title: string;
		time: string;
	}>;
	currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
	return (
		<View style={styles2.container}>
			{steps?.map((step, index) => {
				const date = new Date(step.time ?? new Date());
				const formattedDate = date.toISOString().split('T')[0];
				const hours = date.getUTCHours().toString().padStart(2, '0');
				const minutes = date.getUTCMinutes().toString().padStart(2, '0');
				const formattedDateTime = `${formattedDate} ${hours}:${minutes}`;

				return (
					<View key={step.id} style={styles2.stepContainer}>
						<View style={styles2.stepInnerContainer}>
							<View style={[styles2.circle, index <= currentStep && styles2.activeCircle]}>
								<Text style={[styles2.stepText, index <= currentStep && styles2.activeStepText]}>{index + 1}</Text>
							</View>
							<Text style={[styles2.label, index <= currentStep && styles2.activeLabel]} numberOfLines={3}>
								{formattedDateTime}
							</Text>
							<Text style={[styles2.label, index <= currentStep && styles2.activeLabel]} numberOfLines={3}>
								{step?.title}
							</Text>
						</View>
						{index < steps.length - 1 && <View style={[styles2.line, index < currentStep && styles2.activeLine]} />}
					</View>
				);
			})}
		</View>
	);
};

const styles2 = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	stepContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: 20,
	},
	stepInnerContainer: {
		alignItems: 'center',
		marginBottom: 5, // Space between the circle and the label
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#ccc',
		alignItems: 'center',
		justifyContent: 'center',
	},
	activeCircle: {
		backgroundColor: '#4caf50',
	},
	stepText: {
		color: '#fff',
	},
	activeStepText: {
		color: '#fff',
	},
	label: {
		marginTop: 5,
		color: '#ccc',
		textAlign: 'center',
	},
	activeLabel: {
		color: '#4caf50',
		fontFamily: Fonts.bold,
	},
	line: {
		width: 2,
		height: 30,
		backgroundColor: '#ccc',
	},
	activeLine: {
		backgroundColor: '#4caf50',
	},
});

const OrderDetails = ({ route, navigation }: RootStackScreenProps<'OrderDetail'>) => {
	const [modalVisible, setModalVisible] = useState(false);
	useChatClient();

	const showModal = () => {
		setModalVisible(true);
	};

	const hideModal = () => setModalVisible(false);

	const [currentStep, setCurrentStep] = React.useState(0);
	const id = route.params.id;
	const { data, isPending } = useGetOrderDetails(id);

	useEffect(() => {
		setCurrentStep(data?.route.length ?? 0);
	}, [data]);
	const handleChat = () => {
		navigation.navigate('SelectAdminToChatWith');
	};

	const handleNavigateToMap = () => {
		navigation.navigate('Map', { id });
	};

	return (
		<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<>
				<ScrollView style={{ width: '90%' }} showsVerticalScrollIndicator={false}>
					<CardView images={data?.images} />

					<View style={styles.shadowStyle}>
						{/* first row */}
						<View style={[styles.rowContainer]}>
							<View style={styles.rowContainer}>
								<Avatar.Image size={16} source={{ uri: 'https://picsum.photos/700' }} />
								<Text style={{ color: 'black', marginLeft: 10 }}>Nom : {data?.clientName}</Text>
							</View>
							<View style={styles.rowContainer}>
								<Text style={{ color: 'black' }}>Nbre de colis : {data?.quantity}</Text>
							</View>
						</View>
						{/* second row  */}
						<Text style={{ color: 'black' }}>{data?.clientPhone}</Text>
						{/* third row  */}
						<View style={[styles.rowContainer]}>
							<View style={[styles.rowContainer]}>
								<MaterialCommunityIcons name='arrow-left-circle' size={16} color='black' />
								<Text style={{ color: 'black' }}>{data?.code}</Text>
							</View>
						</View>
					</View>

					{isPending && <ActivityIndicator size='small' color='#0' />}
					{data?.route.length ?? 0 > 0 ? (
						<ScrollView>
							<Text style={{ textAlign: 'center', marginBottom: 25, fontFamily: Fonts.bold, fontSize: 18 }}>
								Le trajet de votre colis
							</Text>
							<View>
								<StepIndicator steps={data?.route!} currentStep={currentStep} />
							</View>
						</ScrollView>
					) : (
						<>
							<Image source={IMAGES.search} style={{ width: 'auto', height: 250 }} />
							<Text style={{ textAlign: 'center', fontFamily: Fonts.black, fontSize: 17 }}>En Attente</Text>
						</>
					)}

					{/* social media icons such instagram ,facebook and tik tok */}

					{/* About China Link Express   */}
				</ScrollView>
			</>
			<>
				<Modal
					animationType='fade'
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Colis recu?</Text>
							<Text style={{ fontFamily: Fonts.regular }}>Êtes-vous sûr(e) que vous avez reçu le colis ?</Text>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
								<Pressable
									onPress={() => {
										setModalVisible(!modalVisible);
									}}
								>
									<Text style={styles.cancelText}> Annuler</Text>
								</Pressable>
								<Pressable
									onPress={() => {
										setModalVisible(false);
									}}
								>
									<Text style={styles.deleteText}>Confirmer</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</Modal>
			</>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					alignContent: 'center',
					borderTopWidth: 0.5,
					padding: 10,
				}}
			>
				<View style={{ width: '60%', marginRight: 10 }}>
					<AppButton title='Voir sur le map' onPress={handleNavigateToMap} />
				</View>

				<Pressable onPress={handleChat}>
					<MaterialIcons name='chat' size={24} color='black' />
				</Pressable>
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	formContainer: { width: '100%', alignItems: 'center', justifyContent: 'center' },

	containerStyle: {
		marginBottom: 20,
		marginTop: 10,
	},
	iconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 10,
		marginBottom: 10,
	},
	iconStyle: {
		marginRight: 50,
	},
	rowContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 3,
	},
	shadowStyle: {
		borderRadius: 8,
		borderWidth: 0.1,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},

	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 30,
		alignItems: 'center',
		shadowColor: '#000',
		width: '70%',
		height: '20%',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		marginBottom: 15,
		fontSize: 16,
		marginRight: '70%',
		fontFamily: Fonts.bold,
	},
	cancelText: { alignSelf: 'flex-start', fontFamily: Fonts.bold },
	deleteText: { color: COLORS.green, alignSelf: 'flex-end', marginLeft: '69%', fontFamily: Fonts.bold },
});

export default OrderDetails;
