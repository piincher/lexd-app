import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axiosInstance from '@src/api/client';
import { imagesType } from '@src/api/order';
import AuthInputField from '@src/components/AuthInput/AuthInput';
import Form from '@src/components/Form/Form';
import SubmitBtn from '@src/components/SubmitBtn/SubmitBtn';
import { COLORS } from '@src/constants/Colors';
import { SCREEN_WIDTH } from '@src/constants/Dimensions';
import { Fonts } from '@src/constants/Fonts';
import { RootStackScreenProps } from '@src/navigations/type';
import * as ImagePicker from 'expo-image-picker';
import { FormikHelpers } from 'formik';
import React, { useEffect, useId, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Avatar, Snackbar, Text } from 'react-native-paper';
import * as yup from 'yup';
import { usePlaceOrder } from '../hooks/useOrder';
const signupSchema = yup.object({
	clientName: yup.string().required('Nom du client est requis'),
	clientPhone: yup.string().required('Numero de telephone est requis'),
	packageWeight: yup.number(),
	priceTotal: yup.number(),
	typeOfPackage: yup.string().required('Type de colis est requis'),
	quantity: yup.number().required('Nombre de colis est requis'),
});

interface order {
	clientName: string;
	clientPhone: string;
	packageWeight?: number;
	priceTotal?: number;
	partenaire: string;
	images?: imagesType;
	status?: string;
	quantity?: number;
	shippingMode?: string;
	createdAt?: string;
	typeOfPackage?: string;
	currentPosition?: {
		id: string;
		title: string;
	};
	orderId?: string;
}
const initialValues = {
	clientName: '',
	clientPhone: '',
	packageWeight: '1',
	priceTotal: 0,
	partenaire: '',
	quantity: '1',
	shippingMode: 'air',
	typeOfPackage: 'electronic',
	currentPosition: {
		id: '',
		title: '',
		time: '',
	},
};
// 'le client a passé une commande',
// 'les colis sont emballées',
// 'les Colis sont expédiées et transférées vers le port',
// "Colis transféré à l'entrepôt de Hong Kong",
// "Le colis a décollé pour L'Éthiopie",
// "Colis transféré vers l'aéroport d'Ethiopie",
// "Colis arrivé à l'aéroport du Mali et prêt pour dédouanement",
// 'marchandises sont arrivées au port et ont été stockées.(Kalaban-Coura pres de FEBAK +22376696177/+22350005142',

const steps = [
	{
		id: '0',
		title: 'le client a passé une commande',
	},
	{
		id: '1',
		title: 'les colis sont emballées',
	},
	{
		id: '2',
		title: 'les Colis sont expédiées et transférées vers le port',
	},
	{
		id: '3',
		title: "Colis transféré à l'entrepôt de Hong Kong",
	},
	{
		id: '4',
		title: "Le colis a décollé pour L'Éthiopie",
	},
	{
		id: '5',
		title: "Colis transféré vers l'aéroport d'Ethiopie",
	},
	{
		id: '6',
		title: "Colis arrivé à l'aéroport du Mali et prêt pour dédouanement",
	},
	{
		id: '7',
		title:
			'marchandises sont arrivées au port et ont été stockées.(Kalaban-Coura pres de FEBAK +22376696177/+22350005142',
	},
];

const AddOrder = ({ navigation, route }: RootStackScreenProps<'AddOrder'>) => {
	const data = useId();

	const [visible, setVisible] = useState(false);
	const [pickerValue, setPickerValue] = useState<string | null>(null);
	const { mutate, isSuccess, isPending } = usePlaceOrder();
	const [isLoading, setIsLoading] = useState(false);
	const categories = steps;
	const [category, setCategory] = useState<string>('');
	const [selectedImages, setSelectedImages] = useState<
		{
			url: string;
			public_id: string;
		}[]
	>([]);

	const process = {
		id: data,
		title: category || 'le client a passé une commande',
		time: new Date().toISOString(),
	};
	console.log('process', process);
	const handleSubmit = async (values: order) => {
		try {
			mutate({ ...values, images: selectedImages, currentPosition: process });
			console.log('values', values);
		} catch (error) {
			console.log(error);
		}
	};
	const pickImage = async () => {
		let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert('Camera access is required');
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsMultipleSelection: true,
			selectionLimit: 4 - selectedImages.length, // Limit based on already selected images
			base64: true,
			quality: 0.5,
		});

		if (pickerResult.canceled === true) {
			return;
		}

		const images = pickerResult.assets.map((data) => data.base64);
		setIsLoading(true);
		for (let image of images) {
			try {
				let base64Image = `data:image/jpg;base64,${image}`;

				// Perform your upload logic here
				// Replace the axiosInstance.post with your actual upload logic
				const { data } = await axiosInstance.post('/order/upload', {
					image: base64Image,
				});

				setSelectedImages((prevImages) => [...prevImages, data]);
			} catch (error) {
				console.log('Upload error:', error);
			}
		}
		setIsLoading(false);
	};
	useEffect(() => {
		if (isSuccess) {
			setVisible(true);
			setTimeout(() => {
				navigation.navigate('HomeTab', { screen: 'Home' });
			}, 900);
		}
	}, [isSuccess]);
	const onDismissSnackBar = () => setVisible(false);

	return (
		<Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signupSchema}>
			<>
				<ScrollView
					contentContainerStyle={styles.container}
					keyboardShouldPersistTaps='always'
					showsVerticalScrollIndicator={false}
				>
					<Snackbar
						visible={visible}
						onDismiss={onDismissSnackBar}
						style={{
							backgroundColor: COLORS.white,
							top: -50,
						}}
						duration={3000}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								alignContent: 'center',
							}}
						>
							<Text style={{ fontFamily: Fonts.black, marginRight: 10 }}>Woah Product is Added !</Text>
							<AntDesign name='checkcircle' size={24} color='green' />
						</View>
					</Snackbar>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							source={{
								uri:
									selectedImages.length > 0
										? selectedImages[0].url
										: 'https://res.cloudinary.com/piincher/image/upload/v1676795950/s6mxvpjvd3ytguh7se8p.jpg',
							}}
						/>
						<Pressable onPress={() => pickImage()} style={styles.imagePicker}>
							<AntDesign name='camera' size={24} color='black' />
						</Pressable>
					</View>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{isLoading ? (
							<ActivityIndicator size='large' color={COLORS.blue} />
						) : (
							selectedImages?.map((image) => (
								<Pressable
									style={{
										alignContent: 'center',
										marginHorizontal: SCREEN_WIDTH * 0.02,
									}}
									key={image.public_id}
								>
									<Avatar.Image
										size={SCREEN_WIDTH * 0.13}
										source={{
											uri: image.url
												? image.url
												: 'https://res.cloudinary.com/piincher/image/upload/v1676795950/s6mxvpjvd3ytguh7se8p.jpg',
										}}
									/>
								</Pressable>
							))
						)}
					</ScrollView>

					<View style={styles.formContainer}>
						<AuthInputField
							label='Nom du Client'
							placeholder='Nom du client'
							containerStyle={styles.containerStyle}
							name='clientName'
						/>
						<AuthInputField
							label='Numero de Telephone du Client'
							placeholder='Numero de Telephone du Client'
							containerStyle={styles.containerStyle}
							name='clientPhone'
							keyboardType='numeric'
							maxLength={8}
						/>
						{/* <AuthInputField label='Country' placeholder='Name' containerStyle={styles.containerStyle} name='country' /> */}
						<AuthInputField
							label='Poids du Colis'
							placeholder='Poids du Colis'
							autoCapitalize='none'
							keyboardType='numeric'
							containerStyle={styles.containerStyle}
							name='packageWeight'
						/>
						<AuthInputField
							label='Type de Colis'
							placeholder='Type de Colis'
							autoCapitalize='none'
							containerStyle={styles.containerStyle}
							name='typeOfPackage'
						/>

						<AuthInputField
							label='nombre de colis'
							placeholder='nombre de colis'
							autoCapitalize='none'
							keyboardType='numeric'
							containerStyle={styles.containerStyle}
							name='quantity'
						/>
						<AuthInputField
							label="Mode d'expedition"
							placeholder='Mode d expedition'
							autoCapitalize='none'
							containerStyle={styles.containerStyle}
							name='shippingMode'
						/>

						<Picker
							mode='dialog'
							placeholder='Choisir Categorie'
							style={{ width: 190, borderColor: 'red', borderWidth: 21 }}
							selectedValue={pickerValue}
							onValueChange={(e) => [setPickerValue(e), setCategory(e!)]}
						>
							{categories?.map((c) => {
								return <Picker.Item key={c.id} label={c.title} value={c.title} />;
							})}
						</Picker>

						<SubmitBtn title='Add' busy={isPending} />
					</View>
				</ScrollView>
			</>
		</Form>
	);
};
const styles = StyleSheet.create({
	formContainer: { width: '100%' },

	containerStyle: {
		marginBottom: 20,
	},
	link: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	container: {
		alignItems: 'center',
		paddingHorizontal: 15,
		backgroundColor: COLORS.white,
	},
	imageContainer: {
		width: 200,
		height: 200,
		borderStyle: 'solid',
		borderWidth: 8,
		padding: 0,
		justifyContent: 'center',
		borderRadius: 100,
		borderColor: '#E0E0E0',
		elevation: 10,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 100,
	},
	imagePicker: {
		position: 'absolute',
		right: 5,
		bottom: 5,
		backgroundColor: 'grey',
		padding: 8,
		borderRadius: 100,
		elevation: 20,
	},
});

export default AddOrder;
