/**
 * PaymentOverview
 * SRP: Visual breakdown of payment status with method breakdown from v2 analytics
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { PaymentMetricsResponse } from '../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface PaymentOverviewProps {
  paymentMetrics?: PaymentMetricsResponse;
  paymentSummary: {
    collectionRate: number;
    totalCollected: number;
    totalOutstanding: number;
    completedTransactions: number;
    totalTransactions: number;
  };
  isLoading?: boolean;
}

const formatAmount = (amount: number | undefined | null): string => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('fr-FR').format(Math.round(num));
};

const PAYMENT_METHOD_CONFIG: Record<string, { icon: string; color: string; label: string }> = {
  orange_money: { icon: 'phone-portrait-outline', color: '#FF6B00', label: 'Orange Money' },
  wave: { icon: 'water-outline', color: '#1DC3E1', label: 'Wave' },
  cash: { icon: 'cash-outline', color: '#10B981', label: 'Especes' },
  card: { icon: 'card-outline', color: '#6366F1', label: 'Carte' },
};

export const PaymentOverview: React.FC<PaymentOverviewProps> = ({
  paymentMetrics,
  paymentSummary,
  isLoading,
}) => {
  const { colors } = useAppTheme();
  const { collectionRate, totalCollected, totalOutstanding, completedTransactions, totalTransactions } = paymentSummary;
  const methods = paymentMetrics?.paymentMethods || [];

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
          marginBottom: 16,
        },
        title: {
          fontSize: 15,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.primary,
        },
        headerSubtitle: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.disabled,
          marginTop: 2,
        },
        rateBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 12,
        },
        rateText: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          fontWeight: '700',
        },
        statsRow: {
          flexDirection: 'row',
          gap: 10,
          marginBottom: 14,
        },
        statCard: {
          flex: 1,
          backgroundColor: colors.background.paper,
          borderRadius: 12,
          padding: 14,
          borderLeftWidth: 3,
        },
        statAmount: {
          fontSize: 17,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.primary,
        },
        statCurrency: {
          fontSize: 10,
          fontFamily: Fonts.medium,
          color: colors.text.disabled,
          marginBottom: 6,
        },
        statFooter: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        dot: {
          width: 6,
          height: 6,
          borderRadius: 3,
        },
        statLabel: {
          fontSize: 11,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
        },
        barContainer: {
          marginBottom: 2,
        },
        barBg: {
          flexDirection: 'row',
          height: 5,
          borderRadius: 3,
          overflow: 'hidden',
        },
        barPaid: {
          backgroundColor: '#10B981',
          borderRadius: 3,
        },
        barUnpaid: {
          backgroundColor: '#FCA5A5',
          borderRadius: 3,
        },
        methodsSection: {
          marginTop: 16,
          paddingTop: 14,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        methodsTitle: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.secondary,
          marginBottom: 10,
        },
        methodRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
          gap: 8,
        },
        methodIcon: {
          width: 28,
          height: 28,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        },
        methodLabel: {
          flex: 1,
          fontSize: 12,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
        },
        methodAmount: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.primary,
        },
        methodPercent: {
          fontSize: 11,
          fontFamily: Fonts.medium,
          color: colors.text.disabled,
          minWidth: 30,
          textAlign: 'right',
        },
      }),
    [colors]
  );

  return (
    <Animated.View entering={FadeInUp.delay(250).springify().damping(15)} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Paiements</Text>
          <Text style={styles.headerSubtitle}>
            {completedTransactions}/{totalTransactions} transactions
          </Text>
        </View>
        <View style={[styles.rateBadge, { backgroundColor: collectionRate >= 50 ? colors.feedback.successBg : colors.feedback.errorBg }]}>
          <Ionicons
            name={collectionRate >= 50 ? 'trending-up' : 'trending-down'}
            size={12}
            color={collectionRate >= 50 ? colors.status.success : colors.status.error}
          />
          <Text style={[styles.rateText, { color: collectionRate >= 50 ? colors.status.success : colors.status.error }]}>
            {collectionRate.toFixed(0)}%
          </Text>
        </View>
      </View>

      {/* Collected vs Outstanding cards */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { borderLeftColor: colors.status.success, borderLeftWidth: 3 }]}>
          <Text style={styles.statAmount}>{formatAmount(totalCollected)}</Text>
          <Text style={styles.statCurrency}>FCFA</Text>
          <View style={styles.statFooter}>
            <View style={[styles.dot, { backgroundColor: colors.status.success }]} />
            <Text style={styles.statLabel}>Encaisse</Text>
          </View>
        </View>

        <View style={[styles.statCard, { borderLeftColor: colors.status.error, borderLeftWidth: 3 }]}>
          <Text style={styles.statAmount}>{formatAmount(totalOutstanding)}</Text>
          <Text style={styles.statCurrency}>FCFA</Text>
          <View style={styles.statFooter}>
            <View style={[styles.dot, { backgroundColor: colors.status.error }]} />
            <Text style={styles.statLabel}>En attente</Text>
          </View>
        </View>
      </View>

      {/* Collection bar */}
      <View style={styles.barContainer}>
        <View style={styles.barBg}>
          <View style={[styles.barPaid, { flex: collectionRate || 1 }]} />
          <View style={[styles.barUnpaid, { flex: 100 - collectionRate || 1 }]} />
        </View>
      </View>

      {/* Payment methods breakdown */}
      {isLoading ? (
        <View style={{ marginTop: 16, gap: 10 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <ShimmerBlock width={28} height={28} borderRadius={8} />
              <ShimmerBlock width={'40%'} height={12} borderRadius={3} />
              <View style={{ flex: 1 }} />
              <ShimmerBlock width={60} height={12} borderRadius={3} />
              <ShimmerBlock width={30} height={12} borderRadius={3} />
            </View>
          ))}
        </View>
      ) : methods.length > 0 ? (
        <View style={styles.methodsSection}>
          <Text style={styles.methodsTitle}>Methodes de paiement</Text>
          {methods.map((m) => {
            const config = PAYMENT_METHOD_CONFIG[m.method?.toLowerCase()] || {
              icon: 'card-outline',
              color: Theme.colors.text.secondary,
              label: m.method || 'Autre',
            };
            return (
              <View key={m.method} style={styles.methodRow}>
                <View style={[styles.methodIcon, { backgroundColor: `${config.color}15` }]}>
                  <Ionicons name={config.icon as any} size={14} color={config.color} />
                </View>
                <Text style={styles.methodLabel}>{config.label}</Text>
                <Text style={styles.methodAmount}>{formatAmount(m.totalFCFA)} F</Text>
                <Text style={styles.methodPercent}>{(Number(m.percentage) || 0).toFixed(0)}%</Text>
              </View>
            );
          })}
        </View>
      ) : null}
    </Animated.View>
  );
};
