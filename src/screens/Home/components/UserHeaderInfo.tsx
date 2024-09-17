import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigationProps } from '@src/navigations/type';
import { useGetNotification } from '../hooks/useGetNotification';
import { useEffect, useState } from 'react';

interface UserHeaderInfoProps {
	firstName: string;
	lastName: string;
	navigation?: navigationProps;
}

export const UserHeaderInfo = ({ firstName, lastName, navigation }: UserHeaderInfoProps) => {
	const [notificationCount, setNotificationCount] = useState<number>(0);
	const { data: notificationData } = useGetNotification();

	useEffect(() => {
		if (notificationData) {
			const unreadNotifications = notificationData.filter((notification) => !notification.read);
			if (unreadNotifications.length > 0) {
				setNotificationCount(unreadNotifications.length);
			}
		}
	}, [notificationData]);
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.textContent}>
					Salut {firstName} {lastName} 🙌
				</Text>
				<Pressable style={styles.notificationContainer} onPress={() => navigation?.navigate('Notifications')}>
					<Ionicons name='notifications-outline' size={24} color='black' />
					{notificationCount > 0 && <View style={styles.redDot} />}
				</Pressable>
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
	redDot: {
		height: 7,
		width: 7,
		borderRadius: 7,
		backgroundColor: COLORS.redShade,
		position: 'absolute',
		right: 10,
		top: 10,
	},
	textContent: { color: COLORS.blue, fontSize: 18, fontFamily: Fonts.bold },
	activeOrderText: { marginLeft: 20, fontSize: 26, color: COLORS.blue, fontFamily: Fonts.bold, marginVertical: 10 },
});
