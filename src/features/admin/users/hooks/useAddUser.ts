import { useEffect, useMemo, useState } from 'react';
import { Keyboard } from 'react-native';
import * as yup from 'yup';

import { useSignupStore } from '@src/shared/store/signupStore';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useCreateUser } from './useUserManagement';

const PHONE_COUNTRIES = [
	{ code: '223', pickerValue: '🇲🇱  +223', country: 'Mali', minLength: 8, maxLength: 8 },
	{ code: '225', pickerValue: '🇨🇮  +225', country: "Côte d'Ivoire", minLength: 8, maxLength: 10 },
	{ code: '221', pickerValue: '🇸🇳  +221', country: 'Sénégal', minLength: 9, maxLength: 9 },
	{ code: '226', pickerValue: '🇧🇫  +226', country: 'Burkina Faso', minLength: 8, maxLength: 8 },
	{ code: '224', pickerValue: '🇬🇳  +224', country: 'Guinée', minLength: 9, maxLength: 9 },
	{ code: '228', pickerValue: '🇹🇬  +228', country: 'Togo', minLength: 8, maxLength: 8 },
	{ code: '229', pickerValue: '🇧🇯  +229', country: 'Bénin', minLength: 8, maxLength: 10 },
	{ code: '233', pickerValue: '🇬🇭  +233', country: 'Ghana', minLength: 9, maxLength: 9, inputMaxLength: 10 },
	{ code: '86', pickerValue: '🇨🇳  +86', country: 'Chine', minLength: 11, maxLength: 11 },
	{ code: '33', pickerValue: '🇫🇷  +33', country: 'France', minLength: 9, maxLength: 9, inputMaxLength: 10 },
];

const getCountryCode = (pickerValue: string) => pickerValue.split('+')[1] || '223';

const getCountry = (pickerValue: string) =>
	PHONE_COUNTRIES.find((country) => country.code === getCountryCode(pickerValue)) || PHONE_COUNTRIES[0];

const normalizeNationalPhone = (phoneNumber: string, countryCode: string) => {
	const digits = phoneNumber.replace(/[^0-9]/g, '');
	if (['33', '233'].includes(countryCode) && digits.startsWith('0')) {
		return digits.replace(/^0+/, '');
	}
	return digits;
};

interface AddUserFormValues {
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

const initialValues = {
	firstName: '',
	lastName: '',
	phoneNumber: '',
};

export const useAddUser = (navigation: RootStackScreenProps<'UserAdd'>['navigation']) => {
	const [visible, setVisible] = useState(false);
	const { mutate, isSuccess, isPending } = useCreateUser();
	const [selectedCode, setSelectedCode] = useState<string>('🇲🇱  +223');
	const signUpData = useSignupStore((state) => state.updateCode);
	const signUpDataCode = useSignupStore((state) => state.signupState?.code || []);
	const selectedCountry = useMemo(() => getCountry(selectedCode), [selectedCode]);
	const phoneMaxLength = selectedCountry.inputMaxLength || selectedCountry.maxLength;
	const signupSchema = useMemo(() => yup.object({
			firstName: yup.string().required('Prénom requis'),
			lastName: yup.string().required('Nom requis'),
			phoneNumber: yup
				.string()
				.required('Numéro de téléphone requis')
				.test('valid-country-phone', `Le numéro ${selectedCountry.country} doit contenir ${selectedCountry.minLength === selectedCountry.maxLength ? selectedCountry.minLength : `${selectedCountry.minLength} à ${selectedCountry.maxLength}`} chiffres.`, (value) => {
					const normalized = normalizeNationalPhone(value || '', selectedCountry.code);
					return normalized.length >= selectedCountry.minLength && normalized.length <= selectedCountry.maxLength;
				})
				.test('valid-china-phone', 'Le numéro Chine doit commencer par 1.', (value) => {
					if (selectedCountry.code !== '86') return true;
					return normalizeNationalPhone(value || '', selectedCountry.code).startsWith('1');
				}),
		}), [selectedCountry]);

	useEffect(() => {
		signUpData(getCountryCode(selectedCode));
	}, [selectedCode, signUpData]);

	useEffect(() => {
		if (isSuccess) {
			setVisible(true);
			setTimeout(() => {
				navigation.navigate('HomeTab', { screen: 'Home' });
			}, 900);
		}
	}, [isSuccess, navigation]);

	const handleSubmit = async (values: AddUserFormValues) => {
		try {
			Keyboard.dismiss();
			const countryCode = getCountryCode(selectedCode);
			const nationalPhone = normalizeNationalPhone(values.phoneNumber, countryCode);
			mutate({
				firstName: values.firstName,
				lastName: values.lastName,
				phoneNumber: countryCode + nationalPhone,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const onDismissSnackBar = () => setVisible(false);

	return {
		visible,
		onDismissSnackBar,
		selectedCode,
		setSelectedCode,
		isPending,
		handleSubmit,
		initialValues,
		signupSchema,
		signUpDataCode,
		phoneMaxLength,
	};
};
