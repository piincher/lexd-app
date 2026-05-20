import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { EmptyState } from '@src/shared/ui';

interface GoodsDetailErrorProps {
	error?: Error | null;
	onRetry: () => void;
	onBack: () => void;
}

export const GoodsDetailError: React.FC<GoodsDetailErrorProps> = ({ error, onRetry, onBack }) => {
	const { colors } = useAppTheme();

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
			<Appbar.Header>
				<Appbar.BackAction onPress={onBack} />
				<Appbar.Content title="Détails" />
			</Appbar.Header>
			<EmptyState
				icon="alert-circle"
				iconColor={colors.status.error}
				title="Erreur de chargement"
				message={error?.message || 'Impossible de charger les détails de cette marchandise.'}
				actionLabel="Réessayer"
				onAction={onRetry}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
