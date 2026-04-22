// Goods Feature - QRScanner Component
// Pure presentational component for scanning QR codes

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

// Try to import expo-barcode-scanner, fallback to mock if not available
let BarCodeScanner: any;
let BarCodeScannerType: any;

try {
	const barcodeModule = require('expo-barcode-scanner');
	BarCodeScanner = barcodeModule.BarCodeScanner;
	BarCodeScannerType = barcodeModule.BarCodeScanner.Constants?.BarCodeType;
} catch (e) {
	// expo-barcode-scanner not available
	BarCodeScanner = null;
}

const { width } = Dimensions.get('window');
const SCANNER_SIZE = width * 0.7;

interface QRScannerProps {
	onScan: (data: string) => void;
	onCancel?: () => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onCancel }) => {
	const theme = useTheme();
	const { colors } = useAppTheme();
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState(false);
	const [torchEnabled, setTorchEnabled] = useState(false);

	useEffect(() => {
		if (!BarCodeScanner) return;

		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getBarCodeScannerPermissions();
	}, []);

	const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
		if (scanned) return;
		setScanned(true);
		onScan(data);
	};

	const toggleTorch = () => {
		setTorchEnabled(!torchEnabled);
	};

	// Fallback if expo-barcode-scanner is not available
	if (!BarCodeScanner) {
		return (
			<View style={styles.container}>
				<View style={styles.unavailableContainer}>
					<MaterialCommunityIcons
						name="qrcode-scan"
						size={80}
						color={theme.colors.primary}
					/>
					<Text style={[styles.unavailableTitle, { color: colors.text.primary }]}>Scanner non disponible</Text>
					<Text style={[styles.unavailableText, { color: colors.text.secondary }]}>
						Le scanner QR code nécessite l'installation de expo-barcode-scanner.
					</Text>
					<Button mode="contained" onPress={onCancel} style={styles.button}>
						Retour
					</Button>
				</View>
			</View>
		);
	}

	if (hasPermission === null) {
		return (
			<View style={styles.container}>
				<Text style={styles.messageText}>Demande d'autorisation de caméra...</Text>
			</View>
		);
	}

	if (hasPermission === false) {
		return (
			<View style={styles.container}>
				<MaterialCommunityIcons name="camera-off" size={64} color="#666" />
				<Text style={[styles.permissionTitle, { color: colors.text.primary }]}>Accès caméra refusé</Text>
				<Text style={[styles.permissionText, { color: colors.text.secondary }]}>
					Veuillez autoriser l'accès à la caméra dans les paramètres de l'application pour scanner les QR codes.
				</Text>
				<Button mode="contained" onPress={onCancel} style={styles.button}>
					Retour
				</Button>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<BarCodeScanner
				style={[StyleSheet.absoluteFillObject, styles.scanner]}
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				barCodeTypes={[BarCodeScannerType?.QR || 'qr']}
				flashMode={torchEnabled ? 'torch' : 'off'}
			/>

			{/* Overlay */}
			<View style={styles.overlay}>
				{/* Top overlay */}
				<View style={styles.overlayTop} />

				{/* Middle section with scan area */}
				<View style={styles.middleSection}>
					<View style={styles.overlaySide} />

					{/* Scan area */}
					<View style={[styles.scanArea, { width: SCANNER_SIZE, height: SCANNER_SIZE }]}>
						<View style={[styles.corner, styles.cornerTopLeft]} />
						<View style={[styles.corner, styles.cornerTopRight]} />
						<View style={[styles.corner, styles.cornerBottomLeft]} />
						<View style={[styles.corner, styles.cornerBottomRight]} />

						{scanned && (
							<View style={styles.scannedOverlay}>
								<Text style={styles.scannedText}>QR Code détecté!</Text>
							</View>
						)}
					</View>

					<View style={styles.overlaySide} />
				</View>

				{/* Bottom overlay */}
				<View style={styles.overlayBottom}>
					<Text style={styles.instructionText}>
						Placez le QR code dans le cadre pour scanner
					</Text>

					{/* Controls */}
					<View style={styles.controls}>
						<Pressable
							style={[styles.controlButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
							onPress={toggleTorch}
						>
							<MaterialCommunityIcons
								name={torchEnabled ? 'flashlight-off' : 'flashlight'}
								size={24}
								color="white"
							/>
						</Pressable>

						<Pressable
							style={[styles.controlButton, { backgroundColor: theme.colors.error }]}
							onPress={onCancel}
						>
							<MaterialCommunityIcons name="close" size={24} color="white" />
						</Pressable>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
	},
	scanner: {
		flex: 1,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	},
	overlayTop: {
		flex: 1,
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.6)',
	},
	middleSection: {
		flexDirection: 'row',
		width: '100%',
	},
	overlaySide: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.6)',
	},
	scanArea: {
		position: 'relative',
		borderRadius: 12,
		overflow: 'hidden',
	},
	corner: {
		position: 'absolute',
		width: 20,
		height: 20,
		borderColor: '#4CAF50',
		borderWidth: 4,
	},
	cornerTopLeft: {
		top: 0,
		left: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderTopLeftRadius: 12,
	},
	cornerTopRight: {
		top: 0,
		right: 0,
		borderLeftWidth: 0,
		borderBottomWidth: 0,
		borderTopRightRadius: 12,
	},
	cornerBottomLeft: {
		bottom: 0,
		left: 0,
		borderRightWidth: 0,
		borderTopWidth: 0,
		borderBottomLeftRadius: 12,
	},
	cornerBottomRight: {
		bottom: 0,
		right: 0,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		borderBottomRightRadius: 12,
	},
	overlayBottom: {
		flex: 1,
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.6)',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 32,
	},
	instructionText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
		fontFamily: Fonts.meduim,
		marginBottom: 24,
	},
	controls: {
		flexDirection: 'row',
		gap: 20,
	},
	controlButton: {
		width: 56,
		height: 56,
		borderRadius: 28,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scannedOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(76, 175, 80, 0.3)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
	},
	scannedText: {
		color: 'white',
		fontSize: 18,
		fontFamily: Fonts.bold,
		backgroundColor: 'rgba(0,0,0,0.7)',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
	messageText: {
		color: 'white',
		fontSize: 16,
		fontFamily: Fonts.meduim,
	},
	permissionTitle: {
		fontSize: 20,
		fontFamily: Fonts.bold,
		marginTop: 16,
	},
	permissionText: {
		fontSize: 14,
		fontFamily: Fonts.regular,
		textAlign: 'center',
		marginTop: 8,
		marginHorizontal: 32,
	},
	button: {
		marginTop: 24,
	},
	unavailableContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 32,
		backgroundColor: Theme.colors.background.card,
		width: '100%',
	},
	unavailableTitle: {
		fontSize: 20,
		fontFamily: Fonts.bold,
		marginTop: 16,
	},
	unavailableText: {
		fontSize: 14,
		fontFamily: Fonts.regular,
		textAlign: 'center',
		marginTop: 8,
	},
});
