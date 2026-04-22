/**
 * StatusBreakdown
 * SRP: Visual breakdown of order statuses with animated progress bars
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { StatusCounts } from '../../types';

interface StatusBreakdownProps {
  statusCounts: StatusCounts;
  total: number;
}

const STATUS_CONFIG = [
  { key: 'active' as const, label: 'Charge', color: '#F59E0B', icon: 'ellipse' },
  { key: 'inTransit' as const, label: 'En Transit', color: '#3B82F6', icon: 'airplane' },
  { key: 'delivered' as const, label: 'Livre', color: '#10B981', icon: 'checkmark-circle' },
  { key: 'inactive' as const, label: 'Inactif', color: '#6B7280', icon: 'pause-circle' },
];

const StatusRow: React.FC<{
  label: string;
  count: number;
  total: number;
  color: string;
  icon: string;
  index: number;
}> = ({ label, count, total, color, icon, index }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 60).springify().damping(15)}
      style={styles.row}
    >
      <View style={styles.rowHeader}>
        <View style={styles.rowLeft}>
          <View style={[styles.statusDot, { backgroundColor: color }]}>
            <Ionicons name={icon as any} size={11} color="#FFF" />
          </View>
          <Text style={styles.statusLabel}>{label}</Text>
        </View>
        <View style={styles.rowRight}>
          <Text style={styles.statusCount}>{count}</Text>
          <Text style={styles.statusPercentage}>{percentage.toFixed(0)}%</Text>
        </View>
      </View>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${Math.max(percentage, 2)}%`, backgroundColor: color }]} />
      </View>
    </Animated.View>
  );
};

export const StatusBreakdown: React.FC<StatusBreakdownProps> = ({ statusCounts, total }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Statut des commandes</Text>
          <Text style={styles.headerSubtitle}>Repartition actuelle</Text>
        </View>
        <View style={styles.totalBadgeContainer}>
          <Text style={styles.totalBadge}>{total}</Text>
          <Text style={styles.totalBadgeLabel}>total</Text>
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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 18,
    ...Theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 2,
  },
  totalBadgeContainer: {
    alignItems: 'center',
    backgroundColor: Theme.primary[50],
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  totalBadge: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  totalBadgeLabel: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: Theme.primary[400],
  },
  row: {
    marginBottom: 12,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 22,
    height: 22,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Theme.neutral[700],
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusCount: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  statusPercentage: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: Theme.neutral[400],
    minWidth: 30,
    textAlign: 'right',
  },
  barBg: {
    height: 5,
    backgroundColor: Theme.neutral[100],
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
});
