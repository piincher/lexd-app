import { useEffect, useMemo, useState } from 'react';
import { useSignupStore } from '@src/shared/store/signupStore';
import { getCountry, getCountryCode, buildSignupSchema, initialValues } from './useAddUserHelpers';

export const useAddUserForm = () => {
	const [selectedCode, setSelectedCode] = useState<string>('🇲🇱  +223');
	const signUpData = useSignupStore((state) => state.updateCode);
	const signUpDataCode = useSignupStore((state) => state.signupState?.code || []);
	const selectedCountry = useMemo(() => getCountry(selectedCode), [selectedCode]);
	const phoneMaxLength = selectedCountry.inputMaxLength || selectedCountry.maxLength;
	const signupSchema = useMemo(() => buildSignupSchema(selectedCountry), [selectedCountry]);

	useEffect(() => {
		signUpData(getCountryCode(selectedCode));
	}, [selectedCode, signUpData]);

	return {
		selectedCode,
		setSelectedCode,
		selectedCountry,
		phoneMaxLength,
		signupSchema,
		signUpDataCode,
		initialValues,
	};
};
