/**
 * FinancialSummaryCards
 * Total Spent / Paid / Due metric cards with payment health progress bar.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { FinancialSummary } from '../hooks/useProfileCharts';

interface FinancialSummaryCardsProps {
  data: FinancialSummary | null;
}

const formatFCFA = (amount: number): string => {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M FCFA`;
  if (amount >= 1_000) return `${Math.round(amount / 1_000)}K FCFA`;
  return `${amount} FCFA`;
};

export const FinancialSummaryCards: React.FC<FinancialSummaryCardsProps> = ({ data }) => {
  const { colors, isDark } = useAppTheme();

  if (!data) {
    return (
      <Animated.View entering={FadeInDown.delay(300).duration(400)} style={[styles.card, { backgroundColor: colors.background.card }]}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Resume Financier</Text>
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>Aucune donnee financiere</Text>
        </View>
      </Animated.View>
    );
  }

  const { totalCost, totalPaid, totalDue, paymentHealth } = data;

  const metrics = [
    { label: 'Total', value: totalCost, color: '#3B82F6', icon: '💰' },
    { label: 'Paye', value: totalPaid, color: '#22C55E', icon: '✅' },
    { label: 'Restant', value: totalDue, color: totalDue > 0 ? '#EF4444' : '#10B981', icon: totalDue > 0 ? '⚠️' : '✅' },
  ];

  return (
    <Animated.View entering={FadeInDown.delay(300).duration(400)} style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Resume Financier</Text>

      <View style={styles.metricsRow}>
        {metrics.map((m) => (
          <View key={m.label} style={styles.metricCard}>
            <Text style={styles.metricIcon}>{m.icon}</Text>
            <Text style={[styles.metricValue, { color: colors.text.primary }]}>{formatFCFA(m.value)}</Text>
            <Text style={[styles.metricLabel, { color: colors.text.secondary }]}>{m.label}</Text>
          </View>
        ))}
      </View>

      {/* Payment Health Progress Bar */}
      <View style={styles.healthContainer}>
        <View style={styles.healthHeader}>
          <Text style={[styles.healthLabel, { color: colors.text.secondary }]}>Sante des paiements</Text>
          <Text style={[styles.healthValue, { color: paymentHealth >= 80 ? '#22C55E' : paymentHealth >= 50 ? '#F59E0B' : '#EF4444' }]}>
            {paymentHealth}%
          </Text>
        </View>
        <View style={[styles.track, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
          <View
            style={[
              styles.fill,
              {
                width: `${paymentHealth}%`,
                backgroundColor:
                  paymentHealth >= 80 ? '#22C55E' : paymentHealth >= 50 ? '#F59E0B' : '#EF4444',
              },
            ]}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginBottom: 14,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  metricIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  metricValue: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    textAlign: 'center',
  },
  metricLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: 2,
  },
  healthContainer: {
    marginTop: 16,
    gap: 6,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
  healthValue: {
    fontFamily: Fonts.bold,
    fontSize: 13,
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  emptyState: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
});
