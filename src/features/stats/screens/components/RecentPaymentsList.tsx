/**
 * RecentPaymentsList
 * SRP: Displays recent payments from the v2 dashboard endpoint
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { RecentPayment } from '../../types';

interface RecentPaymentsListProps {
  payments: RecentPayment[];
}

const METHOD_CONFIG: Record<string, { icon: string; color: string; bg: string }> = {
  orange_money: { icon: 'phone-portrait-outline', color: '#FF6B00', bg: '#FFF7ED' },
  wave: { icon: 'water-outline', color: '#1DC3E1', bg: '#ECFEFF' },
  cash: { icon: 'cash-outline', color: '#10B981', bg: '#F0FDF4' },
  card: { icon: 'card-outline', color: '#6366F1', bg: '#EEF2FF' },
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

const formatAmount = (amount: number | undefined | null): string => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('fr-FR').format(Math.round(num));
};

const PaymentRow: React.FC<{ payment: RecentPayment; index: number; isLast: boolean }> = ({
  payment,
  index,
  isLast,
}) => {
  const method = METHOD_CONFIG[payment.paymentMethod?.toLowerCase()] || METHOD_CONFIG.cash;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify().damping(15)}
      style={[styles.row, !isLast && styles.rowBorder]}
    >
      <View style={[styles.methodIcon, { backgroundColor: method.bg }]}>
        <Ionicons name={method.icon as any} size={16} color={method.color} />
      </View>
      <View style={styles.info}>
        <Text style={styles.customerName} numberOfLines={1}>
          {payment.customer?.name || 'Client'}
        </Text>
        <Text style={styles.date}>{formatDate(payment.paidAt)}</Text>
      </View>
      <Text style={styles.amount}>+{formatAmount(payment.amountFCFA)} F</Text>
    </Animated.View>
  );
};

export const RecentPaymentsList: React.FC<RecentPaymentsListProps> = ({ payments }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Paiements recents</Text>
          <Text style={styles.subtitle}>Dernieres transactions</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{payments.length}</Text>
        </View>
      </View>

      {payments.length > 0 ? (
        payments.map((payment, index) => (
          <PaymentRow
            key={payment.paymentId || index}
            payment={payment}
            index={index}
            isLast={index === payments.length - 1}
          />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={28} color={Theme.neutral[300]} />
          <Text style={styles.emptyText}>Aucun paiement recent</Text>
        </View>
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
    marginBottom: 12,
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
  countBadge: {
    backgroundColor: Theme.primary[50],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  countText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[50],
  },
  methodIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  customerName: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  date: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 2,
  },
  amount: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#10B981',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 6,
  },
  emptyText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
  },
});
