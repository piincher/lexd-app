import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsDetailSkeleton } from '../GoodsDetailSkeleton';

interface GoodsDetailLoadingProps {
	onBack: () => void;
}

export const GoodsDetailLoading: React.FC<GoodsDetailLoadingProps> = ({ onBack }) => {
	const { colors } = useAppTheme();

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
			<Appbar.Header>
				<Appbar.BackAction onPress={onBack} />
				<Appbar.Content title="Détails" />
			</Appbar.Header>
			<GoodsDetailSkeleton />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
