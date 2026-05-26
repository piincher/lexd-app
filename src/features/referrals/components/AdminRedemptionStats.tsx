import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RedemptionAnalytics } from '../types';
import { createStyles } from './AdminRedemptionStats.styles';

interface AdminRedemptionStatsProps {
  analytics?: RedemptionAnalytics | null;
  isLoading: boolean;
}

export const AdminRedemptionStats: React.FC<AdminRedemptionStatsProps> = ({
  analytics,
  isLoading,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (isLoading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="small" color={colors.primary.main} />
      </View>
    );
  }

  if (!analytics) return null;

  const stats = [
    {
      label: 'Total',
      value: analytics.totals.totalRequests,
      icon: 'ticket-percent-outline',
      color: colors.primary.main,
    },
    {
      label: 'En attente',
      value: analytics.byStatus.PENDING.count,
      icon: 'clock-outline',
      color: colors.status.warning,
    },
    {
      label: 'Approuvées',
      value: analytics.byStatus.APPROVED.count,
      icon: 'check-circle-outline',
      color: colors.status.success,
    },
    {
      label: 'Rejetées',
      value: analytics.byStatus.REJECTED.count,
      icon: 'close-circle-outline',
      color: colors.status.error,
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((item) => (
        <View key={item.label} style={[styles.card, { backgroundColor: item.color + '10' }]}>
          <MaterialCommunityIcons name={item.icon as any} size={18} color={item.color} />
          <Text style={[styles.value, { color: item.color }]}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};
