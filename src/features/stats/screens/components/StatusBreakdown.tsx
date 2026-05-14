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
import { useAppTheme } from '@src/providers/ThemeProvider';
import { StatusCounts } from '../../types';

interface StatusBreakdownProps {
  statusCounts: StatusCounts;
  total: number;
}

const StatusRow: React.FC<{
  label: string;
  count: number;
  total: number;
  color: string;
  icon: string;
  index: number;
}> = ({ label, count, total, color, icon, index }) => {
  const { colors } = useAppTheme();
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 60).springify().damping(15)}
      style={styles.row}
    >
      <View style={styles.rowHeader}>
        <View style={styles.rowLeft}>
          <View style={[styles.statusDot, { backgroundColor: color }]}>
            <Ionicons name={icon as any} size={11} color={colors.text.inverse} />
          </View>
          <Text style={[styles.statusLabel, { color: colors.text.primary }]}>{label}</Text>
        </View>
        <View style={styles.rowRight}>
          <Text style={[styles.statusCount, { color: colors.text.primary }]}>{count}</Text>
          <Text style={[styles.statusPercentage, { color: colors.text.secondary }]}>{percentage.toFixed(0)}%</Text>
        </View>
      </View>
      <View style={[styles.barBg, { backgroundColor: colors.border }]}>
        <View style={[styles.barFill, { width: `${Math.max(percentage, 2)}%`, backgroundColor: color }]} />
      </View>
    </Animated.View>
  );
};

export const StatusBreakdown: React.FC<StatusBreakdownProps> = ({ statusCounts, total }) => {
  const { colors } = useAppTheme();
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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
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
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
  totalBadgeContainer: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  totalBadge: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  totalBadgeLabel: {
    fontSize: 10,
    fontFamily: Fonts.regular,
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
  },
  statusPercentage: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    minWidth: 30,
    textAlign: 'right',
  },
  barBg: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
});
