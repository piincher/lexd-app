/**
 * PaymentInsights Component
 * Shows payment progress and outstanding balance summary for the customer
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

export interface PaymentInsightsProps {
  totalSpent: number;
  totalPaid: number;
  balanceDue: number;
}

const formatCurrency = (amount: number): string => {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M FCFA`;
  if (amount >= 1_000) return `${Math.round(amount / 1_000)}K FCFA`;
  return `${Math.round(amount)} FCFA`;
};

export const PaymentInsights: React.FC<PaymentInsightsProps> = ({
  totalSpent,
  totalPaid,
  balanceDue,
}) => {
  const paymentRate = totalSpent > 0 ? (totalPaid / totalSpent) * 100 : 0;
  const isFullyPaid = balanceDue <= 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Apercu Paiements</Text>
        {isFullyPaid && (
          <View style={styles.paidBadge}>
            <Ionicons name="checkmark-circle" size={12} color="#059669" />
            <Text style={styles.paidBadgeText}>A jour</Text>
          </View>
        )}
      </View>

      {/* Progress bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(paymentRate, 100)}%`,
                backgroundColor: isFullyPaid ? '#059669' : '#0EA5E9',
              },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {paymentRate.toFixed(0)}% paye
        </Text>
      </View>

      {/* Amount breakdown */}
      <View style={styles.amountRow}>
        <View style={styles.amountItem}>
          <View style={[styles.amountDot, { backgroundColor: '#0EA5E9' }]} />
          <View>
            <Text style={styles.amountLabel}>Total Paye</Text>
            <Text style={styles.amountValue}>{formatCurrency(totalPaid)}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.amountItem}>
          <View style={[
            styles.amountDot,
            { backgroundColor: balanceDue > 0 ? '#F59E0B' : '#059669' },
          ]} />
          <View>
            <Text style={styles.amountLabel}>Solde Du</Text>
            <Text style={[
              styles.amountValue,
              balanceDue > 0 && styles.amountWarning,
            ]}>
              {formatCurrency(balanceDue)}
            </Text>
          </View>
        </View>
      </View>

      {/* Total cost footer */}
      <View style={styles.footer}>
        <Ionicons name="receipt-outline" size={14} color={Theme.neutral[400]} />
        <Text style={styles.footerText}>
          Cout total: {formatCurrency(totalSpent)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    ...Theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  paidBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
  },
  progressSection: {
    gap: 6,
    marginBottom: 16,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Theme.neutral[100],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Theme.neutral[400],
    textAlign: 'right',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amountDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  amountLabel: {
    fontSize: 11,
    color: Theme.neutral[400],
  },
  amountValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: 1,
  },
  amountWarning: {
    color: '#F59E0B',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: Theme.neutral[100],
    marginHorizontal: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  footerText: {
    fontSize: 12,
    color: Theme.neutral[400],
  },
});

export default PaymentInsights;
