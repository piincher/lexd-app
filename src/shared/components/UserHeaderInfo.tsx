import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigationProps } from '@src/navigations/type';

interface UserHeaderInfoProps {
	firstName: string;
	lastName: string;
	navigation?: navigationProps;
	onNotificationPress?: () => void;
	notificationCount?: number;
}

export const UserHeaderInfo = ({
	firstName,
	lastName,
	navigation,
	onNotificationPress,
	notificationCount = 0,
}: UserHeaderInfoProps) => {
	const { colors } = useAppTheme();

	const styles = useMemo(
		() =>
			StyleSheet.create({
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
					borderColor: colors.border,
				},
				redDot: {
					height: 7,
					width: 7,
					borderRadius: 7,
					backgroundColor: colors.status.error,
					position: 'absolute',
					right: 10,
					top: 10,
				},
				textContent: { color: colors.primary.main, fontSize: 18, fontFamily: Fonts.bold },
				activeOrderText: { marginLeft: 20, fontSize: 26, color: colors.primary.main, fontFamily: Fonts.bold, marginVertical: 10 },
			}),
		[colors]
	);

	const handleNotificationPress = () => {
		if (onNotificationPress) {
			onNotificationPress();
		} else if (navigation) {
			navigation.navigate('Notifications');
		}
	};

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.textContent}>
					Salut {firstName} {lastName} 🙌
				</Text>
				<Pressable style={styles.notificationContainer} onPress={handleNotificationPress}>
					<Ionicons name='notifications-outline' size={24} color={colors.text.primary} />
					{notificationCount > 0 && <View style={styles.redDot} />}
				</Pressable>
			</View>
			<Text style={styles.activeOrderText}>Commande Actifs</Text>
		</>
	);
};
