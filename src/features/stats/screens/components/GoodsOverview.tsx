/**
 * GoodsOverview
 * SRP: Visual breakdown of goods by status and payment from v2 analytics
 */

import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { GoodsVolumeResponse } from '../../types';

interface GoodsOverviewProps {
  goodsVolume?: GoodsVolumeResponse;
  isLoading?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  'in_warehouse': '#F59E0B',
  'in_transit': '#3B82F6',
  'delivered': '#10B981',
  'pending': '#8B5CF6',
  'ready_for_pickup': '#06B6D4',
};

const STATUS_LABELS: Record<string, string> = {
  'in_warehouse': 'En entrepot',
  'in_transit': 'En transit',
  'delivered': 'Livre',
  'pending': 'En attente',
  'ready_for_pickup': 'Pret au retrait',
};

const formatNumber = (num: number | undefined | null): string => {
  const n = Number(num) || 0;
  return new Intl.NumberFormat('fr-FR').format(Math.round(n));
};

export const GoodsOverview: React.FC<GoodsOverviewProps> = ({ goodsVolume, isLoading }) => {
  const summary = goodsVolume?.summary;
  const byStatus = goodsVolume?.byStatus || [];
  const totalGoods = Number(summary?.totalGoods) || 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Marchandises</Text>
          <Text style={styles.subtitle}>Volume et repartition</Text>
        </View>
        <View style={styles.summaryBadge}>
          <Text style={styles.summaryValue}>{formatNumber(totalGoods)}</Text>
          <Text style={styles.summaryLabel}>colis</Text>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" color={Theme.primary[500]} style={styles.loader} />
      ) : (
        <>
          {/* Quick stats row */}
          <View style={styles.quickStats}>
            <View style={styles.quickStat}>
              <Ionicons name="cube-outline" size={16} color="#3B82F6" />
              <Text style={styles.quickStatValue}>{Number(summary?.totalCBM || 0).toFixed(1)}</Text>
              <Text style={styles.quickStatLabel}>CBM</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStat}>
              <Ionicons name="cash-outline" size={16} color="#10B981" />
              <Text style={styles.quickStatValue}>{formatNumber(summary?.totalValueFCFA)}</Text>
              <Text style={styles.quickStatLabel}>FCFA</Text>
            </View>
          </View>

          {/* Status breakdown */}
          {byStatus.length > 0 && (
            <View style={styles.statusSection}>
              {byStatus.map((item, index) => {
                const statusKey = item.status?.toLowerCase().replace(/\s+/g, '_');
                const color = STATUS_COLORS[statusKey] || '#6B7280';
                const label = STATUS_LABELS[statusKey] || item.status || 'Autre';
                const percentage = totalGoods > 0 ? (item.count / totalGoods) * 100 : 0;

                return (
                  <Animated.View
                    key={statusKey}
                    entering={FadeInRight.delay(index * 60).springify().damping(15)}
                    style={styles.statusRow}
                  >
                    <View style={styles.statusHeader}>
                      <View style={styles.statusLeft}>
                        <View style={[styles.statusDot, { backgroundColor: color }]} />
                        <Text style={styles.statusLabel}>{label}</Text>
                      </View>
                      <View style={styles.statusRight}>
                        <Text style={styles.statusCount}>{item.count}</Text>
                        <Text style={styles.statusPercent}>{percentage.toFixed(0)}%</Text>
                      </View>
                    </View>
                    <View style={styles.barBg}>
                      <View style={[styles.barFill, { width: `${Math.max(percentage, 2)}%`, backgroundColor: color }]} />
                    </View>
                  </Animated.View>
                );
              })}
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    ...Theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  subtitle: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 2,
  },
  summaryBadge: {
    alignItems: 'center',
    backgroundColor: Theme.primary[50],
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  summaryLabel: {
    fontSize: 9,
    fontFamily: Fonts.regular,
    color: Theme.primary[400],
  },
  loader: {
    paddingVertical: 24,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: Theme.neutral[50],
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  quickStat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  quickStatValue: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  quickStatLabel: {
    fontSize: 10,
    fontFamily: Fonts.medium,
    color: Theme.neutral[500],
  },
  quickStatDivider: {
    width: 1,
    backgroundColor: Theme.neutral[200],
    marginHorizontal: 8,
  },
  statusSection: {
    gap: 2,
  },
  statusRow: {
    marginBottom: 10,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Theme.neutral[700],
  },
  statusRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusCount: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  statusPercent: {
    fontSize: 10,
    fontFamily: Fonts.medium,
    color: Theme.neutral[400],
    minWidth: 28,
    textAlign: 'right',
  },
  barBg: {
    height: 4,
    backgroundColor: Theme.neutral[100],
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
});
