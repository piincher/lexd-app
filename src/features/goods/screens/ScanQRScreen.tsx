// Goods Feature - ScanQRScreen
// Screen for scanning QR codes to identify goods or containers

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {
	Text,
	Appbar,
	TextInput,
	Button,
	useTheme,
	ActivityIndicator,
	Snackbar,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useScanQR } from '../hooks';
import { ScanQRResponse } from '../api';

// QR Scanner component is lazy loaded to handle missing dependency gracefully
let QRScannerComponent: React.ComponentType<any> | null = null;

try {
	const qrModule = require('../components/QRScanner');
	QRScannerComponent = qrModule.QRScanner;
} catch (e) {
	// QRScanner component not available
}

type ScanMode = 'camera' | 'manual';

const ScanQRScreen = ({ navigation }: RootStackScreenProps<'ScanQR'>) => {
	const theme = useTheme();
	const { colors } = useAppTheme();
	const [scanMode, setScanMode] = useState<ScanMode>('camera');
	const [manualCode, setManualCode] = useState('');
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const { mutate: scanQR, isPending } = useScanQR();

	const styles = useMemo(() => StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background.default,
		},
		headerTitle: {
			fontFamily: Fonts.bold,
		},
		centerContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		loadingText: {
			marginTop: 16,
			fontFamily: Fonts.meduim,
			color: colors.text.secondary,
		},
		manualContainer: {
			flex: 1,
			backgroundColor: colors.background.default,
		},
		manualContent: {
			flexGrow: 1,
			paddingHorizontal: 24,
			paddingTop: 40,
			paddingBottom: 24,
			alignItems: 'center',
		},
		manualIcon: {
			marginBottom: 24,
		},
		manualTitle: {
			fontSize: 24,
			fontFamily: Fonts.bold,
			color: colors.text.primary,
			marginBottom: 8,
		},
		manualDescription: {
			fontSize: 14,
			fontFamily: Fonts.regular,
			color: colors.text.secondary,
			textAlign: 'center',
			marginBottom: 32,
			lineHeight: 20,
		},
		input: {
			width: '100%',
			marginBottom: 24,
			backgroundColor: colors.background.card,
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
	}), [colors]);

	const handleScan = (data: string) => {
		processQRCode(data);
	};

	const handleManualSubmit = () => {
		if (!manualCode.trim()) {
			showMessage('Veuillez entrer un code valide');
			return;
		}
		processQRCode(manualCode.trim());
	};

	const processQRCode = (qrData: string) => {
		scanQR(qrData, {
			onSuccess: (response) => {
				const result = response.data.data as ScanQRResponse;
				const { type, data } = result;

				if (type === 'goods') {
					navigation.replace('GoodsDetail', { goodsId: (data as any).goodsId });
				} else if (type === 'container') {
					showMessage('Navigation vers le conteneur... (à implémenter)');
				} else {
					showMessage('Type de QR code non reconnu');
				}
			},
			onError: (error: any) => {
				showMessage(error?.response?.data?.message || 'QR code invalide ou expiré');
			},
		});
	};

	const showMessage = (message: string) => {
		setSnackbarMessage(message);
		setSnackbarVisible(true);
	};

	const handleCancel = () => {
		navigation.goBack();
	};

	const toggleMode = () => {
		setScanMode(scanMode === 'camera' ? 'manual' : 'camera');
	};

	// Show loading overlay when processing
	if (isPending) {
		return (
			<SafeAreaView style={styles.container}>
				<Appbar.Header>
					<Appbar.BackAction onPress={handleCancel} />
					<Appbar.Content title="Scan QR Code" />
				</Appbar.Header>
				<View style={styles.centerContainer}>
					<ActivityIndicator size="large" color={theme.colors.primary} />
					<Text style={styles.loadingText}>Traitement en cours...</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={handleCancel} />
				<Appbar.Content title="Scan QR Code" titleStyle={styles.headerTitle} />
				<Appbar.Action
					icon={scanMode === 'camera' ? 'keyboard' : 'camera'}
					onPress={toggleMode}
				/>
			</Appbar.Header>

			{scanMode === 'camera' && QRScannerComponent ? (
				<QRScannerComponent onScan={handleScan} onCancel={handleCancel} />
			) : (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.manualContainer}
				>
					<ScrollView contentContainerStyle={styles.manualContent}>
						<MaterialCommunityIcons
							name="qrcode-scan"
							size={80}
							color={theme.colors.primary}
							style={styles.manualIcon}
						/>

						<Text style={styles.manualTitle}>Saisie manuelle</Text>
						<Text style={styles.manualDescription}>
							Entrez le numéro de marchandise ou le code QR manuellement
						</Text>

						<TextInput
							mode="outlined"
							label="Code marchandise"
							value={manualCode}
							onChangeText={setManualCode}
							style={styles.input}
							autoCapitalize="characters"
							placeholder="Ex: G-2411-0001"
						/>

						<Button
							mode="contained"
							onPress={handleManualSubmit}
							style={styles.submitButton}
							icon="magnify"
							disabled={!manualCode.trim()}
						>
							Rechercher
						</Button>

						{QRScannerComponent && (
							<Button
								mode="outlined"
								onPress={toggleMode}
								style={styles.switchButton}
								icon="camera"
							>
								Utiliser la caméra
							</Button>
						)}
					</ScrollView>
				</KeyboardAvoidingView>
			)}

			<Snackbar
				visible={snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
				duration={3000}
				action={{
					label: 'OK',
					onPress: () => setSnackbarVisible(false),
				}}
			>
				{snackbarMessage}
			</Snackbar>
		</SafeAreaView>
	);
};

export default ScanQRScreen;
