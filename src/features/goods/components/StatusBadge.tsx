// Goods Feature - StatusBadge Component
// Pure presentational component for displaying goods status

import React, { useMemo } from 'react';
import { Chip } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsStatus } from '../api';
import { CUSTOMER_GOODS_STATUS_LABELS } from '@src/shared/lib/customerStatus';

interface StatusBadgeProps {
	status: GoodsStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
	const { colors } = useAppTheme();

	const statusConfig = useMemo(() => ({
		RECEIVED_AT_WAREHOUSE: { label: CUSTOMER_GOODS_STATUS_LABELS.RECEIVED_AT_WAREHOUSE, color: colors.status.info },
		PACKED: { label: CUSTOMER_GOODS_STATUS_LABELS.PACKED, color: colors.primary.main },
		ASSIGNED_TO_CONTAINER: { label: CUSTOMER_GOODS_STATUS_LABELS.ASSIGNED_TO_CONTAINER, color: colors.status.warning },
		LOADED_IN_CONTAINER: { label: CUSTOMER_GOODS_STATUS_LABELS.LOADED_IN_CONTAINER, color: colors.status.error },
		IN_TRANSIT: { label: CUSTOMER_GOODS_STATUS_LABELS.IN_TRANSIT, color: colors.status.info },
		ARRIVED_DESTINATION: { label: CUSTOMER_GOODS_STATUS_LABELS.ARRIVED_DESTINATION, color: colors.status.success },
		READY_FOR_PICKUP: { label: CUSTOMER_GOODS_STATUS_LABELS.READY_FOR_PICKUP, color: colors.status.success },
		DELIVERED: { label: CUSTOMER_GOODS_STATUS_LABELS.DELIVERED, color: colors.text.disabled },
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
