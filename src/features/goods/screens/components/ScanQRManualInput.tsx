import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ScanQRManualInputProps {
	manualCode: string;
	onChangeCode: (code: string) => void;
	onSubmit: () => void;
	onToggleMode: () => void;
	hasCamera: boolean;
}

export const ScanQRManualInput: React.FC<ScanQRManualInputProps> = ({
	manualCode,
	onChangeCode,
	onSubmit,
	onToggleMode,
	hasCamera,
}) => {
	const theme = useTheme();
	const { colors } = useAppTheme();

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
				<MaterialCommunityIcons
					name="qrcode-scan"
					size={80}
					color={theme.colors.primary}
					style={styles.icon}
				/>

				<Text style={[styles.title, { color: colors.text.primary }]}>Saisie manuelle</Text>
				<Text style={[styles.description, { color: colors.text.secondary }]}>
					Entrez le numéro de marchandise ou le code QR manuellement
				</Text>

				<TextInput
					mode="outlined"
					label="Code marchandise"
					value={manualCode}
					onChangeText={onChangeCode}
					style={[styles.input, { backgroundColor: colors.background.card }]}
					autoCapitalize="characters"
					placeholder="Ex: G-2411-0001"
				/>

				<Button
					mode="contained"
					onPress={onSubmit}
					style={styles.submitButton}
					icon="magnify"
					disabled={!manualCode.trim()}
				>
					Rechercher
				</Button>

				{hasCamera && (
					<Button
						mode="outlined"
						onPress={onToggleMode}
						style={styles.switchButton}
						icon="camera"
					>
						Utiliser la caméra
					</Button>
				)}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flexGrow: 1,
		paddingHorizontal: 24,
		paddingTop: 40,
		paddingBottom: 24,
		alignItems: 'center',
	},
	icon: {
		marginBottom: 24,
	},
	title: {
		fontSize: 24,
		fontFamily: Fonts.bold,
		marginBottom: 8,
	},
	description: {
		fontSize: 14,
		fontFamily: Fonts.regular,
		textAlign: 'center',
		marginBottom: 32,
		lineHeight: 20,
	},
	input: {
		width: '100%',
		marginBottom: 24,
	},
	submitButton: {
		width: '100%',
		paddingVertical: 8,
		marginBottom: 16,
	},
	switchButton: {
		width: '100%',
		paddingVertical: 8,
	},
});
