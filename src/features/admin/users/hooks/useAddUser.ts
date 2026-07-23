import type { RootStackScreenProps } from '@src/navigations/type';
import { useAddUserForm } from './useAddUserForm';
import { useAddUserCreation } from './useAddUserCreation';

export const useAddUser = (navigation: RootStackScreenProps<'UserAdd'>['navigation']) => {
	const {
		selectedCode,
		setSelectedCode,
		phoneMaxLength,
		signupSchema,
		signUpDataCode,
		initialValues,
	} = useAddUserForm();

	const {
		visible,
		onDismissSnackBar,
		isPending,
		handleSubmit,
		createdUser,
		handleCreateAnother,
		handleViewCreatedClient,
		handleShareCreatedClient,
	} = useAddUserCreation(navigation, selectedCode);

	return {
		visible,
		onDismissSnackBar,
		selectedCode,
		setSelectedCode,
		isPending,
		handleSubmit,
		createdUser,
		handleCreateAnother,
		handleViewCreatedClient,
		handleShareCreatedClient,
		initialValues,
		signupSchema,
		signUpDataCode,
		phoneMaxLength,
	};
};
