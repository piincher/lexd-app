import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { navigationProps } from '@src/navigations/type';
import { NotificationBell } from '@src/shared/ui/NotificationBell';

interface UserHeaderInfoProps {
	firstName: string;
	lastName: string;
	navigation?: navigationProps;
}

export const UserHeaderInfo = ({ firstName, lastName, navigation }: UserHeaderInfoProps) => {
	const { colors } = useAppTheme();
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
			borderColor: colors.border,
		},

		textContent: { color: colors.primary.main, fontSize: 18, fontFamily: Fonts.bold },
		activeOrderText: { marginLeft: 20, fontSize: 26, color: colors.primary.main, fontFamily: Fonts.bold, marginVertical: 10 },
	});

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
						color={colors.text.primary}
					/>
				</View>
			</View>
			<Text style={styles.activeOrderText}>Commande Actifs</Text>
		</>
	);
};
