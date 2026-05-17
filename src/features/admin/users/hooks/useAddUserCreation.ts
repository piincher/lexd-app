import { useEffect, useState, useCallback } from 'react';
import { Keyboard } from 'react-native';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useCreateUser } from './useUserManagement';
import { getCountryCode, normalizeNationalPhone } from './useAddUserHelpers';
import type { AddUserFormValues } from './useAddUserHelpers';

export const useAddUserCreation = (
	navigation: RootStackScreenProps<'UserAdd'>['navigation'],
	selectedCode: string,
) => {
	const [visible, setVisible] = useState(false);
	const { mutate, isSuccess, isPending } = useCreateUser();

	useEffect(() => {
		if (isSuccess) {
			setVisible(true);
			setTimeout(() => {
				navigation.navigate('HomeTab', { screen: 'Home' });
			}, 900);
		}
	}, [isSuccess, navigation]);

	const handleSubmit = useCallback(async (values: AddUserFormValues) => {
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
	}, [selectedCode, mutate]);

	const onDismissSnackBar = useCallback(() => setVisible(false), []);

	return {
		visible,
		onDismissSnackBar,
		isPending,
		handleSubmit,
	};
};
