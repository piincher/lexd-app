/**
 * PaymentOverview
 * SRP: Visual breakdown of payment status with method breakdown from v2 analytics
 */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { PaymentMetricsResponse } from '../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPaymentOverviewStyles } from './PaymentOverview.styles';
import { PaymentMethodRow } from './PaymentMethodRow';
import { PaymentMethodSkeleton } from './PaymentMethodSkeleton';
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
export const PaymentOverview: React.FC<PaymentOverviewProps> = ({
  paymentMetrics,
  paymentSummary,
  isLoading,
}) => {
  const { colors } = useAppTheme();
  const PAYMENT_METHOD_CONFIG: Record<string, { icon: React.ComponentProps<typeof Ionicons>['name']; color: string; label: string }> = {
    orange_money: { icon: 'phone-portrait-outline', color: colors.status.warning, label: 'Orange Money' },
    wave: { icon: 'water-outline', color: colors.status.info, label: 'Wave' },
    cash: { icon: 'cash-outline', color: colors.status.success, label: 'Especes' },
    card: { icon: 'card-outline', color: colors.status.info, label: 'Carte' },
  };
  const styles = createPaymentOverviewStyles(colors);
  const { collectionRate, totalCollected, totalOutstanding, completedTransactions, totalTransactions } = paymentSummary;
  const methods = paymentMetrics?.paymentMethods || [];
  const isSuccess = collectionRate >= 50;
  return (
    <Animated.View entering={FadeInUp.delay(250).springify().damping(15)} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Paiements</Text>
          <Text style={styles.headerSubtitle}>
            {completedTransactions}/{totalTransactions} transactions
          </Text>
        </View>
        <View style={[styles.rateBadge, { backgroundColor: isSuccess ? colors.feedback.successBg : colors.feedback.errorBg }]}>
          <Ionicons
            name={isSuccess ? 'trending-up' : 'trending-down'}
            size={12}
            color={isSuccess ? colors.status.success : colors.status.error}
          />
          <Text style={[styles.rateText, { color: isSuccess ? colors.status.success : colors.status.error }]}>
            {collectionRate.toFixed(0)}%
          </Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { borderLeftColor: colors.status.success }]}>
          <Text style={styles.statAmount}>{formatAmount(totalCollected)}</Text>
          <Text style={styles.statCurrency}>FCFA</Text>
          <View style={styles.statFooter}>
            <View style={[styles.dot, { backgroundColor: colors.status.success }]} />
            <Text style={styles.statLabel}>Encaisse</Text>
          </View>
        </View>

        <View style={[styles.statCard, { borderLeftColor: colors.status.error }]}>
          <Text style={styles.statAmount}>{formatAmount(totalOutstanding)}</Text>
          <Text style={styles.statCurrency}>FCFA</Text>
          <View style={styles.statFooter}>
            <View style={[styles.dot, { backgroundColor: colors.status.error }]} />
            <Text style={styles.statLabel}>En attente</Text>
          </View>
        </View>
      </View>
      <View style={styles.barContainer}>
        <View style={styles.barBg}>
          <View style={[styles.barPaid, { flex: collectionRate || 1 }]} />
          <View style={[styles.barUnpaid, { flex: 100 - collectionRate || 1 }]} />
        </View>
      </View>
      {isLoading ? (
        <PaymentMethodSkeleton />
      ) : methods.length > 0 ? (
        <View style={styles.methodsSection}>
          <Text style={styles.methodsTitle}>Methodes de paiement</Text>
          {methods.map((m) => {
            const config = PAYMENT_METHOD_CONFIG[m.method?.toLowerCase()] || {
              icon: 'card-outline',
              color: colors.text.secondary,
              label: m.method || 'Autre',
            };
            return (
              <PaymentMethodRow
                key={m.method}
                icon={config.icon}
                iconColor={config.color}
                label={config.label}
                amount={m.totalFCFA}
                percentage={m.percentage}
              />
            );
          })}
        </View>
      ) : null}
    </Animated.View>
  );
};
