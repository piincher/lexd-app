import { StyleSheet, View } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { useMemo } from 'react';

interface NotificationProps {
	message: string;
	type: 'success' | 'error';
	visible: boolean;
	onDismissSnackBar: () => void;
	Icon?: React.ComponentType<any>;
}
export const Notification = ({ message, type, visible, onDismissSnackBar }: NotificationProps) => {
	const { colors } = useAppTheme();
	const styles = useMemo(
		() =>
			StyleSheet.create({
				text: {
					fontFamily: Fonts.black,
					fontSize: 16,
					color: colors.text.primary,
				},
			}),
		[colors],
	);
	return (
		<Snackbar
			visible={visible}
			onDismiss={onDismissSnackBar}
			style={{
				backgroundColor: colors.background.card,
			}}
			duration={3000}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Text style={styles.text}>{message}</Text>
				<MaterialCommunityIcons
					name={type === 'success' ? 'check-circle' : 'alert-circle'}
					size={24}
					color={type === 'success' ? colors.status.success : colors.status.error}
				/>
			</View>
		</Snackbar>
	);
};
