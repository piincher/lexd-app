import AppButton from '@src/components/AppButton/AppButton';
import AppLink from '@src/components/AppLink/Applink';
import AuthFormContainer from '@src/components/AuthFormContainer/AuthFormContainer';
import { Notification } from '@src/components/Notification/Notification';
import { COLORS } from '@src/constants/Colors';
import { RootStackScreenProps } from '@src/navigations/type';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native-paper';
import OTPField from '../components/OTPField';
import { useVerification } from '../hooks/useVerification';
import { Fonts } from '@src/constants/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import SocialMedia from '@src/components/SocialMedia/SocialMedia';

interface Props {}

const otpFields = new Array(4).fill('');

const Verification = ({ route, navigation }: RootStackScreenProps<'Verification'>) => {
	const [otp, setOtp] = useState<string[]>([...otpFields]);
	const [countdown, setCountdown] = useState<number>(30);
	const [canSendOtp, setCanSendOtp] = useState<boolean>(false);
	const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
	const [visible, setVisible] = useState<boolean>(false);
	const inputRef = React.useRef<TextInput>(null);
	const { mutate, isPending } = useVerification();

	console.log('route.params.phoneNumber', route.params.phoneNumber);
	const confirm = async () => {
		if (!isValidOtp) return;
		const otpCode = otp.join('');

		console.log('otpCode', otpCode);
		try {
			mutate({
				phone: route.params.phoneNumber,
				otp: otpCode,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = (value: string, index: number) => {
		const newOtp = [...otp];

		if (value === 'Backspace' && index !== 0) {
			if (!newOtp[index]) {
				setActiveOtpIndex(index - 1);
			}
			newOtp[index] = '';
		} else if (value !== 'Backspace') {
			setActiveOtpIndex(index + 1);
			newOtp[index] = value;
		}

		setOtp(newOtp);
	};

	const handlePaste = (value: string) => {
		if (value.length === 6) {
			Keyboard.dismiss();
			const newOtp = value.split('');
			setOtp([...newOtp]);
		}
	};
	const isValidOtp = otp.every((value) => {
		return value.trim();
	});

	useEffect(() => {
		inputRef.current?.focus();
	}, [activeOtpIndex]);

	useEffect(() => {
		if (canSendOtp) return;
		const interval = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 0) {
					setCanSendOtp(true);
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [canSendOtp]);

	const requestForOtp = async () => {
		setCountdown(30);
		setCanSendOtp(false);
		try {
			mutate({
				phone: route.params.phoneNumber,
				otp: otp.join(''),
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleDismiss = () => {
		setVisible(false);
	};

	const date = new Date();

	return (
		<AuthFormContainer title='Verification' subTitle='Entre le code de verification '>
			<Notification
				type='success'
				visible={visible}
				onDismissSnackBar={handleDismiss}
				message='Otp sent successfully'
			/>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps='handled'
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
					{otpFields.map((_, index) => {
						return (
							<OTPField
								keyboardType='numeric'
								key={index}
								ref={activeOtpIndex === index ? inputRef : null}
								onKeyPress={({ nativeEvent }) => {
									handleChange(nativeEvent.key, index);
								}}
								value={otp[index] || ''}
								onChangeText={handlePaste}
							/>
						);
					})}
				</View>

				<AppButton title='Validez' onPress={confirm} busy={isPending} />

				<View style={styles.linkContainer}>
					{countdown > 0 ? <Text style={styles.countDown}>{countdown} sec</Text> : null}
					<AppLink title='Renvoyez' onPress={requestForOtp} active={canSendOtp} />
				</View>
				<Text style={{ textAlign: 'center', color: COLORS.black, fontFamily: Fonts.black, marginTop: 20 }}>
					© {date.getFullYear()} ChinaLink Express. Tout droits reserves
				</Text>
			</View>
				<View>
					<SocialMedia _handlePressButtonAsync={() => {}} />
				</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</AuthFormContainer>
	);
};

const styles = StyleSheet.create({
	formContainer: { width: '100%', padding: 20 },

	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginBottom: 20,
	},
	linkContainer: {
		marginTop: 20,
		width: '100%',
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	countDown: {
		color: COLORS.black,
		marginRight: 10,
		fontFamily: Fonts.bold,
	},
});

export default Verification;
