import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createJourneyMapStyles } from './JourneyMap.styles';

export const JourneyEmptyState: React.FC = () => {
	const { colors } = useAppTheme();
	const styles = createJourneyMapStyles(colors);

	return (
		<View style={[styles.emptyState, { backgroundColor: colors.background.card }]}>
			<Ionicons name="cube-outline" size={40} color={colors.text.disabled} />
			<Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
				Aucune marchandise
			</Text>
			<Text style={[styles.emptyText, { color: colors.text.secondary }]}>
				Vos marchandises apparaîtront ici une fois enregistrées.
			</Text>
		</View>
	);
};
