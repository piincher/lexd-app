import AuthInputField from '@src/components/AuthInput/AuthInput';
import Form from '@src/components/Form/Form';
import SubmitBtn from '@src/components/SubmitBtn/SubmitBtn';
import { useAppTheme } from '@src/providers/ThemeProvider';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { createStyles } from './AddUserForm.styles';

interface AddUserFormValues {
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

interface AddUserFormProps {
	initialValues: AddUserFormValues;
	onSubmit: (values: AddUserFormValues) => void;
	validationSchema: any;
	selectedCode: string;
	setSelectedCode: (code: string) => void;
	isPending: boolean;
	signUpDataCode: string;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({
	initialValues,
	onSubmit,
	validationSchema,
	selectedCode,
	setSelectedCode,
	isPending,
	signUpDataCode,
}) => {
	const { colors } = useAppTheme();
	const styles = createStyles(colors);

	return (
		<Form initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			<ScrollView
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps='always'
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.formContainer}>
					<AuthInputField label='Prenom' containerStyle={styles.containerStyle} name='firstName' />
					<AuthInputField label='Nom' containerStyle={styles.containerStyle} name='lastName' />
					<AuthInputField
						label='Numero de téléphone'
						autoCapitalize='none'
						containerStyle={styles.containerStyle}
						name='phoneNumber'
						selectedCode={selectedCode}
						setSelectedCode={setSelectedCode}
						code={signUpDataCode}
						maxLength={8}
						keyboardType='number-pad'
						phone={true}
					/>
					<SubmitBtn title='Ajouter un utilisateur' busy={isPending} />
				</View>
			</ScrollView>
		</Form>
	);
};
