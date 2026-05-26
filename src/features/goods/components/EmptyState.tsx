// Goods Feature - EmptyState Component
// Pure presentational component for empty state with optional refresh action

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface EmptyStateProps {
	icon?: string;
	title?: string;
	message?: string;
	onRefresh?: () => void;
	refreshLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
	icon = 'package-variant',
	title = 'Aucune marchandise',
	message = 'Vous n\'avez pas encore de marchandises enregistrées.\nContactez-nous pour expédier vos colis.',
	onRefresh,
	refreshLabel = 'Actualiser',
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
		refreshButton: {
			marginTop: 24,
		},
	});

	return (
		<View style={styles.container}>
			<MaterialCommunityIcons
				name={icon as any}
				size={80}
				color={colors.status.success}
			/>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.message}>{message}</Text>
			{onRefresh && (
				<Button 
					mode="outlined" 
					onPress={onRefresh}
					style={styles.refreshButton}
				>
					{refreshLabel}
				</Button>
			)}
		</View>
	);
};

EmptyState.displayName = 'EmptyState';
