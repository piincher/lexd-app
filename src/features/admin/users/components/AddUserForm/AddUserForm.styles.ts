import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingHorizontal: 15,
		backgroundColor: colors.background.default,
	},
	formContainer: {
		width: '100%',
	},
	containerStyle: {
		marginBottom: 20,
	},
});
