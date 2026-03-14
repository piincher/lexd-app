/**
 * DashboardStatsGrid
 * Grid of stat cards for dashboard metrics
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatCard } from './StatCard';
import { DashboardStats } from '../types';

export interface DashboardStatsGridProps {
  stats: DashboardStats;
  onPayBalance?: () => void;
}

const STAT_GRADIENTS = {
  goods: ['#8B5CF6', '#7C3AED', '#6D28D9'] as const,
  containers: ['#0EA5E9', '#0284C7', '#0369A1'] as const,
  spent: ['#10B981', '#059669', '#047857'] as const,
  balance: ['#F59E0B', '#D97706', '#B45309'] as const,
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const DashboardStatsGrid: React.FC<DashboardStatsGridProps> = ({
  stats,
  onPayBalance,
}) => {
  return (
    <View style={styles.statsGrid}>
      <StatCard
        icon="package-variant"
        value={formatNumber(stats.totalGoods)}
        label="Total Marchandises"
        gradientColors={STAT_GRADIENTS.goods}
        testID="stat-goods"
      />
      <StatCard
        icon="ferry"
        value={formatNumber(stats.activeContainers)}
        label="En Transit"
        gradientColors={STAT_GRADIENTS.containers}
        testID="stat-containers"
      />
      <StatCard
        icon="cash-multiple"
        value={formatCurrency(stats.totalSpent)}
        label="Total Dépensé"
        gradientColors={STAT_GRADIENTS.spent}
        testID="stat-spent"
      />
      <StatCard
        icon="credit-card-clock"
        value={formatCurrency(stats.balanceDue)}
        label="Solde Dû"
        gradientColors={STAT_GRADIENTS.balance}
        onPress={stats.balanceDue > 0 ? onPayBalance : undefined}
        testID="stat-balance"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
});

import { Theme } from '@src/constants/Theme';
export default DashboardStatsGrid;
