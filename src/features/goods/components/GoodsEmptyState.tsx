// Goods Feature - GoodsEmptyState Component
// Pure presentational component for empty state

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface GoodsEmptyStateProps {
	icon?: MaterialIconName;
	title?: string;
	message?: string;
}

export const GoodsEmptyState: React.FC<GoodsEmptyStateProps> = ({
	icon = 'package-variant',
	title = 'Aucune marchandise',
	message = 'Vos marchandises apparaîtront ici dès leur réception à l’entrepôt.\nContactez-nous pour organiser un envoi.',
}) => {
	const { colors } = useAppTheme();
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 32,
			paddingTop: 100,
		},
		title: {
			fontSize: 20,
			fontFamily: Fonts.bold,
			color: colors.text.primary,
			marginTop: 16,
		},
		message: {
			fontSize: 14,
			fontFamily: Fonts.regular,
			color: colors.text.secondary,
			textAlign: 'center',
			marginTop: 8,
			lineHeight: 20,
		},
	});

	return (
		<View style={styles.container}>
			<MaterialCommunityIcons
				name={icon}
				size={80}
				color={colors.status.success}
			/>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.message}>{message}</Text>
		</View>
	);
};
