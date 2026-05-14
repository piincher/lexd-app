// Local StatusBadge - Copied from features/goods to avoid cross-feature import
// Pure presentational component for displaying goods status

import React from 'react';
import { Chip } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsStatus } from '../../../types';

interface StatusBadgeProps {
  status: GoodsStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { colors } = useAppTheme();

  const STATUS_CONFIG: Record<GoodsStatus, { label: string; color: string; bgColor: string }> = {
    RECEIVED_AT_WAREHOUSE: { label: 'En Entrepôt', color: colors.status.info, bgColor: colors.background.paper },
    PACKED: { label: 'Colis préparé', color: colors.primary.main, bgColor: colors.background.paper },
    ASSIGNED_TO_CONTAINER: { label: 'Assigné', color: colors.status.warning, bgColor: colors.background.paper },
    LOADED_IN_CONTAINER: { label: 'Chargé', color: colors.status.warning, bgColor: colors.background.paper },
    IN_TRANSIT: { label: 'En Transit', color: colors.status.info, bgColor: colors.background.paper },
    ARRIVED_DESTINATION: { label: 'Arrivé', color: colors.status.success, bgColor: colors.background.paper },
    READY_FOR_PICKUP: { label: 'Prêt', color: colors.status.success, bgColor: colors.background.paper },
    DELIVERED: { label: 'Livré', color: colors.text.disabled, bgColor: colors.background.paper },
  };

  const config = STATUS_CONFIG[status] || { 
    label: status, 
    color: colors.text.muted, 
    bgColor: colors.background.paper 
  };
  
  return (
    <Chip 
      style={{ 
        backgroundColor: config.bgColor,
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
