import api from '@src/api/client';
import AuthInputField from '@src/components/AuthInput/AuthInput';
import Form from '@src/components/Form/Form';
import SubmitBtn from '@src/components/SubmitBtn/SubmitBtn';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useCheckRoute } from './hooks/UseRoute';
import { IMAGES } from '@src/constants/Images';
import { Fonts } from '@src/constants/Fonts';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
const CheckRouteSchema = yup.object({
	code: yup.string().trim().required('Le numero de suivi est requis'),
});

interface newUser {
	code: string;
}
const initialValues = {
	code: '',
};

interface StepIndicatorProps {
	steps: Array<string>;
	currentStep: number;
	time?: string;
}

const StepIndicator = ({ steps, currentStep, time }: StepIndicatorProps) => {
	return (
		<View style={styles2.container}>
			{steps.map((step, index) => (
				<View key={index} style={styles2.stepContainer}>
					<View style={styles2.stepInnerContainer}>
						<View style={[styles2.circle, index <= currentStep && styles2.activeCircle]}>
							<Text style={[styles2.stepText, index <= currentStep && styles2.activeStepText]}>{index + 1}</Text>
						</View>
						<Text style={[styles2.label, index <= currentStep && styles2.activeLabel]} numberOfLines={3}>
							{time}
						</Text>
						<Text style={[styles2.label, index <= currentStep && styles2.activeLabel]} numberOfLines={3}>
							{step}
						</Text>
					</View>
					{index < steps.length - 1 && <View style={[styles2.line, index < currentStep && styles2.activeLine]} />}
				</View>
			))}
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

const steps = [
	'Commande recue',
	'Commande en cours de traitement',
	'Commande en cours de livraison',
	'Commande livree',
	'Commande annulee',
	'Commande en  de traitement',
	'Commande en cours de livraison',
];
const CheckRoute = () => {
	const [loading, setLoading] = React.useState(false);
	const [currentStep, setCurrentStep] = React.useState(0);
	const { mutate, data, isPending } = useCheckRoute();

	const _handlePressButtonAsync = async (url: string) => {
		let result = await WebBrowser.openBrowserAsync(url);
	};
	const handleSubmit = async (values: newUser) => {
		mutate({
			code: values.code.trim(),
		});
	};
	useEffect(() => {
		setCurrentStep(data?.route.length ?? 0);
	}, [data]);
	0;
	const date = new Date(data?.updatedAt ?? new Date());
	const formattedDate = date.toISOString().split('T')[0];
	const hours = date.getUTCHours().toString().padStart(2, '0');
	const minutes = date.getUTCMinutes().toString().padStart(2, '0');
	const formattedDateTime = `${formattedDate} ${hours}:${minutes}`;

	return (
		<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={CheckRouteSchema}>
				<ScrollView style={{ width: '90%' }} showsVerticalScrollIndicator={false}>
					<Image
						source={require('../../../assets/images/logoYellow.png')}
						style={{ height: 120, width: 120, alignSelf: 'center' }}
					/>
					<Text style={{ textAlign: 'center', fontFamily: Fonts.black, fontSize: 17 }}>
						Verifier le trajet de votre colis en entrant le numero de suivi
					</Text>
					<AuthInputField
						label='Entre Le numero de Suivi'
						placeholder='Entrez le numero de suivi: CLEXXXXXXXX'
						containerStyle={styles.containerStyle}
						name='code'
						rightIcon={<AntDesign name='search1' size={24} color='black' />}
					/>
					{isPending && <ActivityIndicator size='small' color='#0' />}
					{data?.route.length ?? 0 > 0 ? (
						<ScrollView>
							<Text style={{ textAlign: 'center', marginBottom: 25, fontFamily: Fonts.bold, fontSize: 18 }}>
								Le trajet de votre colis{' '}
							</Text>
							<View>
								<StepIndicator steps={data?.route!} currentStep={currentStep} time={formattedDateTime} />
							</View>
						</ScrollView>
					) : (
						<Image source={IMAGES.search} style={{ width: 'auto', height: 250 }} />
					)}

					{/* social media icons such instagram ,facebook and tik tok */}

					{/* About China Link Express   */}
				</ScrollView>
			</Form>
			<Text style={{ textAlign: 'center', fontFamily: Fonts.blackItalic, fontSize: 16 }}>
				China Link Express est une entreprise spécialisée dans l'envoi de colis express, opérant de la Chine vers le
				Mali. Nous offrons un service de qualité, rapide et fiable.
			</Text>
			<View style={styles.iconContainer}>
				<AntDesign
					name='instagram'
					size={24}
					color='black'
					style={styles.iconStyle}
					onPress={() => _handlePressButtonAsync('https://www.instagram.com/chinalinkexpress')}
				/>
				<AntDesign
					name='facebook-square'
					size={24}
					color='black'
					style={styles.iconStyle}
					onPress={() => _handlePressButtonAsync('https://www.facebook.com/profile.php?id=61556519083512')}
				/>
				<FontAwesome5 name='tiktok' size={24} color='black' />
			</View>
			<Text>App version: {Constants.expoConfig?.version}</Text>
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
});

export default CheckRoute;
