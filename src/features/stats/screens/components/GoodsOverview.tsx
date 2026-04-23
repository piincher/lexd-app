/**
 * GoodsOverview
 * SRP: Visual breakdown of goods by status and payment from v2 analytics
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { GoodsVolumeResponse } from '../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors } = useAppTheme();
  const summary = goodsVolume?.summary;
  const byStatus = goodsVolume?.byStatus || [];
  const totalGoods = Number(summary?.totalGoods) || 0;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginHorizontal: 20,
          backgroundColor: colors.background.card,
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
          color: colors.text.primary,
        },
        subtitle: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.disabled,
          marginTop: 2,
        },
        summaryBadge: {
          alignItems: 'center',
          backgroundColor: colors.primary[50],
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderRadius: 12,
        },
        summaryValue: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.primary.main,
        },
        summaryLabel: {
          fontSize: 9,
          fontFamily: Fonts.regular,
          color: colors.primary.light,
        },
        loader: {
          paddingVertical: 24,
        },
        quickStats: {
          flexDirection: 'row',
          backgroundColor: colors.background.paper,
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
          color: colors.text.primary,
        },
        quickStatLabel: {
          fontSize: 10,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
        },
        quickStatDivider: {
          width: 1,
          backgroundColor: colors.border,
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
          color: colors.text.primary,
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
          color: colors.text.primary,
        },
        statusPercent: {
          fontSize: 10,
          fontFamily: Fonts.medium,
          color: colors.text.disabled,
          minWidth: 28,
          textAlign: 'right',
        },
        barBg: {
          height: 4,
          backgroundColor: colors.border,
          borderRadius: 2,
          overflow: 'hidden',
        },
        barFill: {
          height: '100%',
          borderRadius: 2,
        },
      }),
    [colors]
  );

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
        <View style={{ gap: 12, paddingVertical: 8 }}>
          <ShimmerBlock width={'100%'} height={50} borderRadius={12} />
          {Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={{ gap: 6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <ShimmerBlock width={8} height={8} borderRadius={4} />
                  <ShimmerBlock width={80} height={12} borderRadius={3} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <ShimmerBlock width={30} height={12} borderRadius={3} />
                  <ShimmerBlock width={28} height={10} borderRadius={3} />
                </View>
              </View>
              <ShimmerBlock width={'100%'} height={4} borderRadius={2} />
            </View>
          ))}
        </View>
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
                const color = STATUS_COLORS[statusKey] || Theme.colors.text.secondary;
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
