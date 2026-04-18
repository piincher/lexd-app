import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { navigationProps } from '@src/navigations/type';
import { NotificationBell } from '@src/features/notifications';

interface UserHeaderInfoProps {
	firstName: string;
	lastName: string;
	navigation?: navigationProps;
}

export const UserHeaderInfo = ({ firstName, lastName, navigation }: UserHeaderInfoProps) => {
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.textContent}>
					Salut {firstName} {lastName} 🙌
				</Text>
				<View style={styles.notificationContainer}>
					<NotificationBell
						onPress={() => navigation?.navigate('Notifications')}
						size={24}
						color={COLORS.black}
					/>
				</View>
			</View>
			<Text style={styles.activeOrderText}>Commande Actifs</Text>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignContent: 'center',
		marginHorizontal: 20,
	},
	notificationContainer: {
		width: 40,
		height: 40,
		borderWidth: 0.2,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: COLORS.grey,
	},

	textContent: { color: COLORS.blue, fontSize: 18, fontFamily: Fonts.bold },
	activeOrderText: { marginLeft: 20, fontSize: 26, color: COLORS.blue, fontFamily: Fonts.bold, marginVertical: 10 },
});
