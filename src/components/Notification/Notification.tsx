import { View } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';

interface NotificationProps {
	message: string;
	type: 'success' | 'error';
	visible: boolean;
	onDismissSnackBar: () => void;
	Icon?: React.ComponentType<any>;
}
export const Notification = ({ message, type, visible, onDismissSnackBar }: NotificationProps) => {
	return (
		<Snackbar
			visible={visible}
			onDismiss={onDismissSnackBar}
			style={{
				backgroundColor: '#FFF',
			}}
			duration={3000}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Text>{message}</Text>
				<MaterialCommunityIcons
					name={type === 'success' ? 'check-circle' : 'alert-circle'}
					size={24}
					color={type === 'success' ? COLORS.green : COLORS.redShade}
				/>
			</View>
		</Snackbar>
	);
};
