/**
 * StatusBreakdown
 * SRP: Visual breakdown of order statuses with animated progress bars
 */

import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { StatusCounts } from '../../types';
import { StatusRow } from './StatusRow';
import { createStatusBreakdownStyles } from './StatusBreakdown.styles';

interface StatusBreakdownProps {
  statusCounts: StatusCounts;
  total: number;
}

export const StatusBreakdown: React.FC<StatusBreakdownProps> = ({ statusCounts, total }) => {
  const { colors } = useAppTheme();
  const styles = createStatusBreakdownStyles(colors);
  const STATUS_CONFIG = [
    { key: 'active' as const, label: 'Charge', color: colors.status.warning, icon: 'ellipse' },
    { key: 'inTransit' as const, label: 'En Transit', color: colors.status.info, icon: 'airplane' },
    { key: 'delivered' as const, label: 'Livre', color: colors.status.success, icon: 'checkmark-circle' },
    { key: 'inactive' as const, label: 'Inactif', color: colors.text.secondary, icon: 'pause-circle' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background.card }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text.primary }]}>Statut des commandes</Text>
          <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>Repartition actuelle</Text>
        </View>
        <View style={[styles.totalBadgeContainer, { backgroundColor: colors.primary[50] }]}>
          <Text style={[styles.totalBadge, { color: colors.primary[600] }]}>{total}</Text>
          <Text style={[styles.totalBadgeLabel, { color: colors.primary[400] }]}>total</Text>
        </View>
      </View>
      {STATUS_CONFIG.map((config, index) => (
        <StatusRow
          key={config.key}
          label={config.label}
          count={statusCounts[config.key]}
          total={total}
          color={config.color}
          icon={config.icon}
          index={index}
        />
      ))}
    </View>
  );
};
