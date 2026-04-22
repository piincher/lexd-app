import { GoodsStatus } from '../api';

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
		return { label: 'Aérien', icon: 'airplane' as const, color: '#3F51B5' };
	}
	return { label: 'Maritime', icon: 'ferry' as const, color: '#0277BD' };
};

export const getPaymentColors = (status: string) => {
	switch (status) {
		case 'PAID':
			return { text: '#2E7D32', label: 'Payé' };
		case 'PARTIAL':
			return { text: '#E65100', label: 'Partiel' };
		default:
			return { text: '#C62828', label: 'Non payé' };
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
	{ key: 'PACKED', label: 'Colis préparé', icon: 'cube-send' },
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
