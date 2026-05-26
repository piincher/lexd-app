import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardRedemptionStatus } from '../types';
import { createStyles } from './RedemptionStatusBadge.styles';

interface RedemptionStatusBadgeProps {
  status: RewardRedemptionStatus;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<
  RewardRedemptionStatus,
  { label: string; icon: string; colorKey: string }
> = {
  PENDING: { label: 'En attente', icon: 'clock-outline', colorKey: 'warning' },
  APPROVED: { label: 'Approuvée', icon: 'check-circle-outline', colorKey: 'success' },
  REJECTED: { label: 'Rejetée', icon: 'close-circle-outline', colorKey: 'error' },
  CANCELLED: { label: 'Annulée', icon: 'cancel', colorKey: 'neutral' },
};

export const RedemptionStatusBadge: React.FC<RedemptionStatusBadgeProps> = ({
  status,
  size = 'md',
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors, size);
  const config = STATUS_CONFIG[status];
  const statusColor = (colors.status as Record<string, string>)[config.colorKey] || colors.text.secondary;

  return (
    <View style={[styles.badge, { backgroundColor: statusColor + '18' }]}>
      <MaterialCommunityIcons name={config.icon as any} size={size === 'sm' ? 12 : 14} color={statusColor} />
      <Text style={[styles.label, { color: statusColor }]}>{config.label}</Text>
    </View>
  );
};
