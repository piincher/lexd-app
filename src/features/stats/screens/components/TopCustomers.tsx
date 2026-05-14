/**
 * TopCustomers
 * SRP: Displays top customers ranked by revenue
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { TopCustomer } from '../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface TopCustomersProps {
  customers: TopCustomer[];
  isLoading?: boolean;
}

const formatAmount = (amount: number | undefined | null): string => {
  const num = Number(amount) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toFixed(0);
};

const CustomerRow: React.FC<{ customer: TopCustomer; rank: number; colors: any }> = ({ customer, rank, colors }) => {
  const RANK_COLORS = [colors.status.warning, colors.text.muted, colors.accent.gold, colors.text.secondary, colors.text.secondary];
  const rankColor = RANK_COLORS[rank] || colors.text.secondary;
  const isTopThree = rank < 3;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          gap: 10,
        },
        rowBorder: {
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        rankBadge: {
          width: 30,
          height: 30,
          borderRadius: 10,
          backgroundColor: colors.background.paper,
          justifyContent: 'center',
          alignItems: 'center',
        },
        rankText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.secondary,
        },
        customerInfo: {
          flex: 1,
        },
        customerName: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          fontWeight: '600',
          color: colors.text.primary,
        },
        customerMeta: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: colors.text.disabled,
          marginTop: 2,
        },
        revenueContainer: {
          alignItems: 'flex-end',
        },
        revenueAmount: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.primary,
        },
      }),
    [colors]
  );

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
  const { colors } = useAppTheme();

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
        iconContainer: {
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: colors.feedback.warningBg,
          justifyContent: 'center',
          alignItems: 'center',
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
          color: colors.text.disabled,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Top Clients</Text>
          <Text style={styles.subtitle}>Par revenu</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="trophy-outline" size={18} color={colors.status.warning} />
        </View>
      </View>

      {isLoading ? (
        <View style={{ gap: 10, paddingVertical: 8 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <ShimmerBlock width={30} height={30} borderRadius={10} />
              <View style={{ flex: 1, gap: 6 }}>
                <ShimmerBlock width={'60%'} height={14} borderRadius={3} />
                <ShimmerBlock width={'40%'} height={10} borderRadius={3} />
              </View>
              <ShimmerBlock width={50} height={14} borderRadius={3} />
            </View>
          ))}
        </View>
      ) : customers.length > 0 ? (
        customers.map((customer, index) => (
          <CustomerRow key={customer.userId} customer={customer} rank={index} colors={colors} />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={28} color={colors.text.disabled} />
          <Text style={styles.emptyText}>Aucune donnee disponible</Text>
        </View>
      )}
    </View>
  );
};
