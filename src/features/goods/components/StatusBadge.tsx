// Goods Feature - StatusBadge Component
// Pure presentational component for displaying goods status

import React, { useMemo } from 'react';
import { Chip } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsStatus } from '../api';

interface StatusBadgeProps {
	status: GoodsStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
	const { colors } = useAppTheme();

	const statusConfig = useMemo(() => ({
		RECEIVED_AT_WAREHOUSE: { label: 'En Entrepôt', color: colors.status.info },
		PACKED: { label: 'Préparé', color: colors.primary.main },
		ASSIGNED_TO_CONTAINER: { label: 'Assigné', color: colors.status.warning },
		LOADED_IN_CONTAINER: { label: 'Chargé', color: colors.status.error },
		IN_TRANSIT: { label: 'En Transit', color: colors.status.info },
		ARRIVED_DESTINATION: { label: 'Arrivé', color: colors.status.success },
		READY_FOR_PICKUP: { label: 'Prêt', color: colors.status.success },
		DELIVERED: { label: 'Livré', color: colors.text.disabled },
	}), [colors]);

	const config = statusConfig[status] || {
		label: status,
		color: colors.text.muted,
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
