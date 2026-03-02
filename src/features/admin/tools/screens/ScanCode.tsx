import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { CameraView, Camera, BarcodeScanningResult } from 'expo-camera';
import { useUpdateStatusDelivery } from '../../orders/hooks/useOrderManagement';
import { CustomModal } from '@src/components/Modal/Modal';
import { RootStackScreenProps } from '@src/navigations/type';

export default function ScanQRCode({ navigation }: RootStackScreenProps<'ScanQRCode'>) {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState(false);
	const [trackingNumber, setTrackingNumber] = useState('');
	const { mutate: updateStatusDelivery, isSuccess } = useUpdateStatusDelivery(trackingNumber);

	useEffect(() => {
		const getCameraPermissions = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getCameraPermissions();
	}, []);

	const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
		setScanned(true);
		setTrackingNumber(data);

		// updateStatusDelivery({ orderId: data });
	};

	const confirmReceipt = () => {
		updateStatusDelivery({
			orderId: trackingNumber,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			setScanned(false);
			navigation.navigate('HomeTab', { screen: 'Home' });
		}
	}, [isSuccess]);

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>S'il vous plait Autorize l'access au camera pour scanner</Text>;
	}

	return (
		<View style={styles.container}>
			<CameraView
				onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
				barcodeScannerSettings={{
					barcodeTypes: ['qr', 'pdf417'],
				}}
				style={StyleSheet.absoluteFillObject}
			/>
			{scanned && (
				<CustomModal
					visible={scanned}
					onClose={() => setScanned(false)}
					onConfirm={confirmReceipt}
					cancelText='cancel'
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
});
