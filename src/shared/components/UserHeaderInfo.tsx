import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import type { navigationProps } from '@src/navigations/type';

interface UserHeaderInfoProps {
	firstName: string;
	lastName: string;
	navigation?: navigationProps;
	onNotificationPress?: () => void;
}

export const UserHeaderInfo = ({
	firstName,
	lastName,
	navigation,
	onNotificationPress,
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
				<NotificationBell
					onPress={handleNotificationPress}
					size={24}
					color={colors.text.primary}
				/>
			</View>
			<Text style={styles.activeOrderText}>Commande Actifs</Text>
		</>
	);
};
