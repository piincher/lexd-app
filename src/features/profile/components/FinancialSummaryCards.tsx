/**
 * FinancialSummaryCards
 * Total Spent / Paid / Due metric cards with payment health progress bar.
 */

import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { FinancialSummary } from '../hooks/useProfileCharts';
import { MetricCard } from './MetricCard';
import { PaymentHealthBar } from './PaymentHealthBar';
import { createStyles } from './FinancialSummaryCards.styles';

interface FinancialSummaryCardsProps {
  data: FinancialSummary | null;
}

const formatFCFA = (amount: number): string => {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M FCFA`;
  if (amount >= 1_000) return `${Math.round(amount / 1_000)}K FCFA`;
  return `${amount} FCFA`;
};

export const FinancialSummaryCards: React.FC<FinancialSummaryCardsProps> = ({ data }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (!data) {
    return (
      <Animated.View
        entering={FadeInDown.delay(300).duration(400)}
        style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}
      >
        <Text style={[styles.title, { color: colors.text.primary }]}>Résumé financier</Text>
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            Aucune donnée financière
          </Text>
        </View>
      </Animated.View>
    );
  }

  const { totalCost, totalPaid, totalDue, paymentHealth } = data;

  const metrics = [
    { label: 'Total', value: totalCost, icon: 'cash-multiple' },
    { label: 'Payé', value: totalPaid, icon: 'check-circle-outline' },
    { label: 'Restant', value: totalDue, icon: totalDue > 0 ? 'alert-circle-outline' : 'check-circle-outline' },
  ] as const;

  return (
    <Animated.View
      entering={FadeInDown.delay(300).duration(400)}
      style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}
    >
      <Text style={[styles.title, { color: colors.text.primary }]}>Résumé financier</Text>

      <View style={styles.metricsRow}>
        {metrics.map((m) => (
          <MetricCard key={m.label} icon={m.icon} value={formatFCFA(m.value)} label={m.label} />
        ))}
      </View>

      <PaymentHealthBar paymentHealth={paymentHealth} />
    </Animated.View>
  );
};
