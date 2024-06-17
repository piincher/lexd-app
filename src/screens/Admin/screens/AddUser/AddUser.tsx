import AuthInputField from '@src/components/AuthInput/AuthInput';
import Form from '@src/components/Form/Form';
import { Notification } from '@src/components/Notification/Notification';
import SubmitBtn from '@src/components/SubmitBtn/SubmitBtn';
import { COLORS } from '@src/constants/Colors';
import { RootStackScreenProps } from '@src/navigations/type';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import { useCreateUser } from './hooks/useAddUser';

import { Keyboard } from 'react-native';
const signupSchema = yup.object({
	firstName: yup.string().required('Prenom est requis'),
	lastName: yup.string().required('Nom est requis'),
	phoneNumber: yup.number().required('Numero de telephone est requis'),
});

interface order {
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

// 'le client a passé une commande',
// 'les colis sont emballées',
// 'les Colis sont expédiées et transférées vers le port',
// "Colis transféré à l'entrepôt de Hong Kong",
// "Le colis a décollé pour L'Éthiopie",
// "Colis transféré vers l'aéroport d'Ethiopie",
// "Colis arrivé à l'aéroport du Mali et prêt pour dédouanement",
// 'marchandises sont arrivées au port et ont été stockées.(Kalaban-Coura pres de FEBAK +22376696177/+22350005142',

const AddUser = ({ navigation }: RootStackScreenProps<'UserAdd'>) => {
	const [visible, setVisible] = useState(false);
	const { mutate, isSuccess, isPending } = useCreateUser();

	const handleSubmit = async (values: order) => {
		try {
			Keyboard.dismiss();
			mutate({
				...values,
			});
		} catch (error) {
			console.log(error);
		}
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

	const initialValues = {
		firstName: '',
		lastName: '',
		phoneNumber: '223',
	};

	return (
		<Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signupSchema}>
			<>
				<ScrollView
					contentContainerStyle={styles.container}
					keyboardShouldPersistTaps='always'
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.formContainer}>
						<AuthInputField
							label='Prenom'
							placeholder='Prenom'
							containerStyle={styles.containerStyle}
							name='firstName'
						/>
						<AuthInputField
							label='Nom'
							placeholder='Nom de famille'
							containerStyle={styles.containerStyle}
							name='lastName'
						/>
						<AuthInputField
							label='Poids du Colis'
							placeholder='Phone Number'
							autoCapitalize='none'
							containerStyle={styles.containerStyle}
							name='phoneNumber'
							keyboardType='numeric'
						/>

						<SubmitBtn title='Ajouter un utilisateur' busy={isPending} />
					</View>
					<Notification
						message='Utilisateur creer avec success'
						type='success'
						visible={visible}
						onDismissSnackBar={onDismissSnackBar}
					/>
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

export default AddUser;
