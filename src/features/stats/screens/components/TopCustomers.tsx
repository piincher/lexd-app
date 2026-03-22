/**
 * TopCustomers
 * SRP: Displays top customers ranked by revenue
 */

import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { TopCustomer } from '../../types';

interface TopCustomersProps {
  customers: TopCustomer[];
  isLoading?: boolean;
}

const RANK_COLORS = ['#F59E0B', '#9CA3AF', '#CD7F32', '#6B7280', '#6B7280'];

const formatAmount = (amount: number | undefined | null): string => {
  const num = Number(amount) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toFixed(0);
};

const CustomerRow: React.FC<{ customer: TopCustomer; rank: number }> = ({ customer, rank }) => {
  const rankColor = RANK_COLORS[rank] || '#6B7280';
  const isTopThree = rank < 3;

  return (
    <Animated.View
      entering={FadeInDown.delay(rank * 60).springify().damping(15)}
      style={[styles.row, rank < 4 && styles.rowBorder]}
    >
      <View style={[styles.rankBadge, isTopThree && { backgroundColor: `${rankColor}20` }]}>
        {isTopThree ? (
          <Ionicons name="trophy" size={14} color={rankColor} />
        ) : (
          <Text style={styles.rankText}>{rank + 1}</Text>
        )}
      </View>

      <View style={styles.customerInfo}>
        <Text style={styles.customerName} numberOfLines={1}>
          {customer.name || 'Client inconnu'}
        </Text>
        <Text style={styles.customerMeta}>
          {customer.transactionCount || 0} transactions · {customer.goodsStats?.totalGoods || 0} colis
        </Text>
      </View>

      <View style={styles.revenueContainer}>
        <Text style={styles.revenueAmount}>{formatAmount(customer.totalRevenueFCFA)} F</Text>
      </View>
    </Animated.View>
  );
};

export const TopCustomers: React.FC<TopCustomersProps> = ({ customers, isLoading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Top Clients</Text>
          <Text style={styles.subtitle}>Par revenu</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="trophy-outline" size={18} color="#F59E0B" />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" color={Theme.primary[500]} style={styles.loader} />
      ) : customers.length > 0 ? (
        customers.map((customer, index) => (
          <CustomerRow key={customer.userId} customer={customer} rank={index} />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={28} color={Theme.neutral[300]} />
          <Text style={styles.emptyText}>Aucune donnee disponible</Text>
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
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[50],
  },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Theme.neutral[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[500],
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  customerMeta: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 2,
  },
  revenueContainer: {
    alignItems: 'flex-end',
  },
  revenueAmount: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  loader: {
    paddingVertical: 24,
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
