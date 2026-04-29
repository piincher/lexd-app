// Goods Feature - ScanQRScreen
// Screen for scanning QR codes to identify goods or containers
// Thin composition-only wrapper

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Snackbar } from 'react-native-paper';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useScanQRScreen } from './hooks';
import { styles } from './ScanQRScreen.styles';
import { ScanQRLoading, ScanQRManualInput } from './components';

// QR Scanner component is lazy loaded to handle missing dependency gracefully
let QRScannerComponent: React.ComponentType<any> | null = null;

try {
	const qrModule = require('../components/QRScanner');
	QRScannerComponent = qrModule.QRScanner;
} catch (e) {
	// QRScanner component not available
}

export const ScanQRScreen: React.FC<RootStackScreenProps<'ScanQR'>> = ({ navigation }) => {
	const {
		scanMode,
		manualCode,
		snackbarVisible,
		snackbarMessage,
		isPending,
		setManualCode,
		handleScan,
		handleManualSubmit,
		handleCancel,
		toggleMode,
		hideSnackbar,
	} = useScanQRScreen(navigation);

	if (isPending) {
		return <ScanQRLoading onCancel={handleCancel} />;
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
				<ScanQRManualInput
					manualCode={manualCode}
					onChangeCode={setManualCode}
					onSubmit={handleManualSubmit}
					onToggleMode={toggleMode}
					hasCamera={!!QRScannerComponent}
				/>
			)}

			<Snackbar
				visible={snackbarVisible}
				onDismiss={hideSnackbar}
				duration={3000}
				action={{
					label: 'OK',
					onPress: hideSnackbar,
				}}
			>
				{snackbarMessage}
			</Snackbar>
		</SafeAreaView>
	);
};

export default ScanQRScreen;
