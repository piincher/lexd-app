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
	const { mutate, data, isSuccess, isPending, reset } = useCreateUser();
	const createdUser = data?.user;

	useEffect(() => {
		if (isSuccess) {
			setVisible(true);
		}
	}, [isSuccess]);

	const handleSubmit = useCallback(async (values: AddUserFormValues) => {
		try {
			Keyboard.dismiss();
			const countryCode = getCountryCode(selectedCode);
			const nationalPhone = normalizeNationalPhone(values.phoneNumber, countryCode);
			mutate({
				firstName: values.firstName,
				lastName: values.lastName,
				phoneNumber: countryCode + nationalPhone,
				referralCode: values.referralCode.trim() || undefined,
			});
		} catch (error) {
			console.log(error);
		}
	}, [selectedCode, mutate]);

	const onDismissSnackBar = useCallback(() => setVisible(false), []);
	const handleCreateAnother = useCallback(() => {
		reset();
		setVisible(false);
	}, [reset]);
	const handleViewCreatedClient = useCallback(() => {
		if (createdUser?._id) {
			navigation.navigate('ClientDetails', { id: createdUser._id });
		}
	}, [createdUser?._id, navigation]);
	const handleShareCreatedClient = useCallback(() => {
		if (!createdUser?._id || !createdUser.shippingClientId) return;
		const clientName = [createdUser.firstName, createdUser.lastName].filter(Boolean).join(' ');
		navigation.navigate('ShippingMarksAdmin', {
			q: createdUser.shippingClientId,
			supplierShare: {
				userId: createdUser._id,
				clientId: createdUser.shippingClientId,
				clientName,
				phoneNumber: createdUser.phoneNumber,
			},
		});
	}, [createdUser, navigation]);

	return {
		visible,
		onDismissSnackBar,
		isPending,
		handleSubmit,
		createdUser,
		handleCreateAnother,
		handleViewCreatedClient,
		handleShareCreatedClient,
	};
};
