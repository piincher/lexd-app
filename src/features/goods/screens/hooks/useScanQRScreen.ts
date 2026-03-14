// Goods Feature - ScanQRScreen Hook
// Encapsulates all logic for the ScanQRScreen

import { useState } from 'react';
import { RootStackScreenProps } from '@src/navigations/type';
import { useScanQR } from '../../hooks';
import { ScanQRResponse } from '../../api';

type ScanMode = 'camera' | 'manual';

type UseScanQRScreenReturn = {
	scanMode: ScanMode;
	manualCode: string;
	snackbarVisible: boolean;
	snackbarMessage: string;
	isPending: boolean;
	setManualCode: (code: string) => void;
	handleScan: (data: string) => void;
	handleManualSubmit: () => void;
	handleCancel: () => void;
	toggleMode: () => void;
	hideSnackbar: () => void;
};

export const useScanQRScreen = (
	navigation: RootStackScreenProps<'ScanQR'>['navigation']
): UseScanQRScreenReturn => {
	const [scanMode, setScanMode] = useState<ScanMode>('camera');
	const [manualCode, setManualCode] = useState('');
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const { mutate: scanQR, isPending } = useScanQR();

	const showMessage = (message: string) => {
		setSnackbarMessage(message);
		setSnackbarVisible(true);
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

	const handleCancel = () => {
		navigation.goBack();
	};

	const toggleMode = () => {
		setScanMode(scanMode === 'camera' ? 'manual' : 'camera');
	};

	const hideSnackbar = () => {
		setSnackbarVisible(false);
	};

	return {
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
	};
};
