import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ScanQRLoadingProps {
	onCancel: () => void;
}

export const ScanQRLoading: React.FC<ScanQRLoadingProps> = ({ onCancel }) => {
	const theme = useTheme();
	const { colors } = useAppTheme();

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={onCancel} />
				<Appbar.Content title="Scan QR Code" />
			</Appbar.Header>
			<View style={styles.centerContainer}>
				<ActivityIndicator size="large" color={theme.colors.primary} />
				<Text style={[styles.loadingText, { color: colors.text.secondary }]}>
					Traitement en cours...
				</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingText: {
		marginTop: 16,
		fontFamily: Fonts.meduim,
	},
});
