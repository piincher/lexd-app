import AuthFormContainer from '@src/components/AuthFormContainer/AuthFormContainer';
import SubmitBtn from '@src/components/SubmitBtn/SubmitBtn';
import Form from '@src/components/Form/Form';
import AuthInputField from '@src/components/AuthInput/AuthInput';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { RootStackScreenProps } from '@src/navigations/type';
import React, { useEffect, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Snackbar, Text } from 'react-native-paper';
import * as yup from 'yup';
import { useLogin, useLoginApple } from './hook/useLogin';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IMAGES } from '@src/constants/Images';
import { useSignupStore } from './hook/useSignInData';
import { Notification } from '@src/components/Notification/Notification';
import ComppanyLogo from '@src/components/CompanyLogo/ComppanyLogo';
import SocialMedia from '@src/components/SocialMedia/SocialMedia';
import CopyrightText from '@src/components/CopyrightText/CopyrightText';
import { initMixpanel } from '@src/config/Analytic';
interface newUser {
	phone: string;
}

const signupSchema = yup.object({
	// phone number should require and should not exceed 8 digit
	phone: yup.string().required('Numero de telephone est requis').max(8, 'Numero de telephone doit etre de 8 chiffres'),
});
const initialValues = {
	phone: '',
};

//Todo: properly type the navigation prop
const Login = ({ navigation }: RootStackScreenProps<'Login'>) => {
	const [visible, setVisible] = React.useState(false);
	const [selectedCode, setSelectedCode] = useState<string>('ML  +223');
	const [phone, setPhone] = React.useState('');
	const { mutate, isSuccess, isPending } = useLogin();
	const { mutate: appleLogin, isPending: ApplePending } = useLoginApple();
	const SignUpData = useSignupStore((state) => state.updateCode);
	const mixpanel = initMixpanel();
	const handleSubmit = async (values: newUser) => {
		mixpanel.track('Login', { phone: values.phone });
		const phone = selectedCode.split('+')[1] + values.phone;

		if (phone === '22376696177') {
			console.log('apple login');
			appleLogin({
				phone: phone,
			});
			return;
		} else if (phone === '22317865673') {
			appleLogin({
				phone: phone,
			});
			return;
		} else {
			setPhone(phone);
			mutate(phone);
		}
		// setEmail(values.email);
	};

	useEffect(() => {
		if (isSuccess) {
			setVisible(true);
			setTimeout(() => {
				setVisible(false);
				navigation.navigate('Verification', { phoneNumber: phone });
			}, 1000);
		}
	}, [isSuccess]);
	const onDismissSnackBar = () => setVisible(false);

	return (
		<Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signupSchema}>
			<>
				<ImageBackground
					source={require('../../../../assets/images/CLEX.png')}
					imageStyle={{
						resizeMode: 'cover', // works only here!
					}}
					style={{
						flex: 1,
						height: '100%',
						width: '100%',
						justifyContent: 'center',
					}}
				>
					<View style={{ alignSelf: 'center', marginTop: 40 }}>
						<ComppanyLogo img={require('../../../../assets/images/log.png')} style={{ height: 110 }} />
					</View>
					<Notification
						message='Un code de verification a ete envoye a votre numero de telephone'
						type='success'
						visible={visible}
						onDismissSnackBar={onDismissSnackBar}
						Icon={MaterialCommunityIcons}
					/>
					<View style={styles.formContainer}>
						<AuthInputField
							label='Numero de telephone'
							placeholder='Numero de telephone'
							autoCapitalize='none'
							containerStyle={styles.containerStyle}
							name='phone'
							selectedCode={selectedCode}
							setSelectedCode={setSelectedCode}
							code={SignUpData.code}
							maxLength={8}
							keyboardType='number-pad'
						/>

						<SubmitBtn title='Continue' busy={isPending || ApplePending} />
					</View>
					<View></View>
					<View style={styles.socialMedia}>
						<SocialMedia color={COLORS.white} _handlePressButtonAsync={() => {}} />
					</View>
					{/* <CopyrightText /> */}
				</ImageBackground>
			</>
		</Form>
	);
};
const styles = StyleSheet.create({
	formContainer: { width: '100%', padding: 20 },

	containerStyle: {
		marginBottom: 20,
	},
	link: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	socialMedia: {
		position: 'absolute',
		top: '80%',
		left: '20%',
	},
});

export default Login;
