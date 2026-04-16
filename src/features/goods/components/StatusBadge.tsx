// Goods Feature - StatusBadge Component
// Pure presentational component for displaying goods status

import React from 'react';
import { Chip } from 'react-native-paper';
import { GoodsStatus } from '../api';

interface StatusBadgeProps {
	status: GoodsStatus;
}

const STATUS_CONFIG: Record<GoodsStatus, { label: string; color: string }> = {
	RECEIVED_AT_WAREHOUSE: { label: 'En Entrepôt', color: '#2196F3' },
	ASSIGNED_TO_CONTAINER: { label: 'Assigné', color: '#FF9800' },
	LOADED_IN_CONTAINER: { label: 'Chargé', color: '#9C27B0' },
	IN_TRANSIT: { label: 'En Transit', color: '#3F51B5' },
	ARRIVED_DESTINATION: { label: 'Arrivé', color: '#009688' },
	READY_FOR_PICKUP: { label: 'Prêt', color: '#4CAF50' },
	DELIVERED: { label: 'Livré', color: '#757575' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
	const config = STATUS_CONFIG[status] || {
		label: status,
		color: '#666666',
	};

	return (
		<Chip
			style={{
				backgroundColor: config.color + '20',
				height: 28,
			}}
			textStyle={{
				color: config.color,
				fontSize: 12,
			}}
			compact
		>
			{config.label}
		</Chip>
	);
};

StatusBadge.displayName = 'StatusBadge';
