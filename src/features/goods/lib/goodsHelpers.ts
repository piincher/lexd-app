import { GoodsStatus } from '../api';
import { Theme } from '@src/constants/Theme';
import { CUSTOMER_GOODS_STEP_LABELS } from '@src/shared/lib/customerStatus';

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
	{ key: 'RECEIVED_AT_WAREHOUSE', label: CUSTOMER_GOODS_STEP_LABELS.RECEIVED_AT_WAREHOUSE, icon: 'package-variant' },
	{ key: 'ASSIGNED_TO_CONTAINER', label: CUSTOMER_GOODS_STEP_LABELS.ASSIGNED_TO_CONTAINER, icon: 'clipboard-check' },
	{ key: 'LOADED_IN_CONTAINER', label: CUSTOMER_GOODS_STEP_LABELS.LOADED_IN_CONTAINER, icon: 'package-up' },
	{ key: 'IN_TRANSIT', label: CUSTOMER_GOODS_STEP_LABELS.IN_TRANSIT, icon: 'truck-delivery' },
	{ key: 'ARRIVED_DESTINATION', label: CUSTOMER_GOODS_STEP_LABELS.ARRIVED_DESTINATION, icon: 'flag-checkered' },
	{ key: 'READY_FOR_PICKUP', label: CUSTOMER_GOODS_STEP_LABELS.READY_FOR_PICKUP, icon: 'hand-wave' },
	{ key: 'DELIVERED', label: CUSTOMER_GOODS_STEP_LABELS.DELIVERED, icon: 'check-circle' },
];

export const AIR_STATUS_STEPS: { key: GoodsStatus; label: string; icon: string }[] = [
	{ key: 'RECEIVED_AT_WAREHOUSE', label: CUSTOMER_GOODS_STEP_LABELS.RECEIVED_AT_WAREHOUSE, icon: 'package-variant' },
	{ key: 'PACKED', label: CUSTOMER_GOODS_STEP_LABELS.PACKED, icon: 'cube-outline' },
	{ key: 'IN_TRANSIT', label: CUSTOMER_GOODS_STEP_LABELS.IN_TRANSIT, icon: 'airplane' },
	{ key: 'ARRIVED_DESTINATION', label: CUSTOMER_GOODS_STEP_LABELS.ARRIVED_DESTINATION, icon: 'flag-checkered' },
	{ key: 'READY_FOR_PICKUP', label: CUSTOMER_GOODS_STEP_LABELS.READY_FOR_PICKUP, icon: 'hand-wave' },
	{ key: 'DELIVERED', label: CUSTOMER_GOODS_STEP_LABELS.DELIVERED, icon: 'check-circle' },
];

export const getStatusSteps = (mode: 'AIR' | 'SEA') => {
	return mode === 'AIR' ? AIR_STATUS_STEPS : SEA_STATUS_STEPS;
};

export const getStatusIndex = (status: GoodsStatus, mode: 'AIR' | 'SEA'): number => {
	return getStatusSteps(mode).findIndex((s) => s.key === status);
};
