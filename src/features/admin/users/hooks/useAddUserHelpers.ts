import * as yup from 'yup';

export const PHONE_COUNTRIES = [
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

export const getCountryCode = (pickerValue: string) => pickerValue.split('+')[1] || '223';

export const getCountry = (pickerValue: string) =>
	PHONE_COUNTRIES.find((country) => country.code === getCountryCode(pickerValue)) || PHONE_COUNTRIES[0];

export const normalizeNationalPhone = (phoneNumber: string, countryCode: string) => {
	const digits = phoneNumber.replace(/[^0-9]/g, '');
	if (['33', '233'].includes(countryCode) && digits.startsWith('0')) {
		return digits.replace(/^0+/, '');
	}
	return digits;
};

export interface AddUserFormValues {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	referralCode: string;
}

export const initialValues: AddUserFormValues = {
	firstName: '',
	lastName: '',
	phoneNumber: '',
	referralCode: '',
};

export const buildSignupSchema = (selectedCountry: typeof PHONE_COUNTRIES[0]) =>
	yup.object({
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
		referralCode: yup.string().trim().max(20, 'Code trop long'),
	});
