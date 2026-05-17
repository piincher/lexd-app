import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TopCustomer } from '../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createTopCustomerRowStyles } from './TopCustomerRow.styles';

const formatAmount = (amount: number | undefined | null): string => {
  const num = Number(amount) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toFixed(0);
};

interface TopCustomerRowProps {
  customer: TopCustomer;
  rank: number;
}

export const TopCustomerRow: React.FC<TopCustomerRowProps> = ({ customer, rank }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createTopCustomerRowStyles(colors), [colors]);

  const RANK_COLORS = [
    colors.status.warning,
    colors.text.muted,
    colors.accent.gold,
    colors.text.secondary,
    colors.text.secondary,
  ];
  const rankColor = RANK_COLORS[rank] || colors.text.secondary;
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
