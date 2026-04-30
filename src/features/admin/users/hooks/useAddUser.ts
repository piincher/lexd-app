import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import * as yup from 'yup';

import { useSignupStore } from '@src/shared/store/signupStore';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useCreateUser } from './useUserManagement';

const signupSchema = yup.object({
	firstName: yup.string().required('Prenom est requis'),
	lastName: yup.string().required('Nom est requis'),
	phoneNumber: yup
		.string()
		.required('Numero de telephone est requis')
		.min(8, 'Numero de telephone doit etre de 8 chiffres'),
});

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
	const [selectedCode, setSelectedCode] = useState<string>('ML  +223');
	const signUpData = useSignupStore((state) => state.updateCode);

	useEffect(() => {
		signUpData(selectedCode.split('+')[1]);
	}, [selectedCode]);

	useEffect(() => {
		if (isSuccess) {
			setVisible(true);
			setTimeout(() => {
				navigation.navigate('HomeTab', { screen: 'Home' });
			}, 900);
		}
	}, [isSuccess]);

	const handleSubmit = async (values: AddUserFormValues) => {
		try {
			Keyboard.dismiss();
			mutate({
				firstName: values.firstName,
				lastName: values.lastName,
				phoneNumber: selectedCode.split('+')[1] + values.phoneNumber,
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
		signUpDataCode: signUpData.code,
	};
};
