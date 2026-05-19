// Shared UI - StatusBadge Component
// Pure presentational component for displaying goods status

import React from 'react';
import { Chip } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsStatus } from '../types';

interface StatusBadgeProps {
  status: GoodsStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { colors } = useAppTheme();

  const STATUS_CONFIG: Record<GoodsStatus, { label: string; color: string }> = {
    RECEIVED_AT_WAREHOUSE: { label: 'En Entrepôt', color: colors.status.info },
    ASSIGNED_TO_CONTAINER: { label: 'Assigné', color: colors.status.warning },
    LOADED_IN_CONTAINER: { label: 'Chargé', color: colors.accent.rose },
    IN_TRANSIT: { label: 'En Transit', color: colors.accent.sky },
    ARRIVED_DESTINATION: { label: 'Arrivé', color: colors.accent.mint },
    READY_FOR_PICKUP: { label: 'Prêt', color: colors.status.success },
    DELIVERED: { label: 'Livré', color: colors.text.disabled },
  };

  const config = STATUS_CONFIG[status] || {
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
