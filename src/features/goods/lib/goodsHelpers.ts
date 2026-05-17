import { GoodsStatus } from '../api';
import { Theme } from '@src/constants/Theme';

export const formatCurrency = (amount?: number): string => {
	return `${(amount ?? 0).toLocaleString('fr-FR')} FCFA`;
};

export const formatDate = (dateString?: string): string => {
	if (!dateString) return 'N/A';
	const date = new Date(dateString);
	return date.toLocaleDateString('fr-FR', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
};

export const formatDateTime = (dateString?: string): string => {
	if (!dateString) return 'N/A';
	const date = new Date(dateString);
	return date.toLocaleDateString('fr-FR', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

export const getShippingModeConfig = (mode?: string) => {
	if (mode === 'AIR') {
		return { label: 'Aérien', icon: 'airplane' as const, color: Theme.status.info };
	}
	return { label: 'Maritime', icon: 'ferry' as const, color: Theme.status.info };
};

export const getPaymentColors = (status: string) => {
	switch (status) {
		case 'PAID':
			return { text: Theme.status.success, label: 'Payé' };
		case 'PARTIAL':
			return { text: Theme.status.warning, label: 'Partiel' };
		default:
			return { text: Theme.status.error, label: 'Non payé' };
	}
};

export const SEA_STATUS_STEPS: { key: GoodsStatus; label: string; icon: string }[] = [
	{ key: 'RECEIVED_AT_WAREHOUSE', label: 'Reçu', icon: 'package-variant' },
	{ key: 'ASSIGNED_TO_CONTAINER', label: 'Assigné', icon: 'clipboard-check' },
	{ key: 'LOADED_IN_CONTAINER', label: 'Chargé', icon: 'package-up' },
	{ key: 'IN_TRANSIT', label: 'En Transit', icon: 'truck-delivery' },
	{ key: 'ARRIVED_DESTINATION', label: 'Arrivé', icon: 'flag-checkered' },
	{ key: 'READY_FOR_PICKUP', label: 'Prêt', icon: 'hand-wave' },
	{ key: 'DELIVERED', label: 'Livré', icon: 'check-circle' },
];

export const AIR_STATUS_STEPS: { key: GoodsStatus; label: string; icon: string }[] = [
	{ key: 'RECEIVED_AT_WAREHOUSE', label: 'Reçu', icon: 'package-variant' },
	{ key: 'PACKED', label: 'Colis préparé', icon: 'cube-outline' },
	{ key: 'IN_TRANSIT', label: 'En Transit', icon: 'airplane' },
	{ key: 'ARRIVED_DESTINATION', label: 'Arrivé', icon: 'flag-checkered' },
	{ key: 'READY_FOR_PICKUP', label: 'Prêt', icon: 'hand-wave' },
	{ key: 'DELIVERED', label: 'Livré', icon: 'check-circle' },
];

export const getStatusSteps = (mode: 'AIR' | 'SEA') => {
	return mode === 'AIR' ? AIR_STATUS_STEPS : SEA_STATUS_STEPS;
};

export const getStatusIndex = (status: GoodsStatus, mode: 'AIR' | 'SEA'): number => {
	return getStatusSteps(mode).findIndex((s) => s.key === status);
};
