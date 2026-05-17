import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RecentOrder } from '../../types';
import { styles } from './RecentOrdersList.styles';
import { formatAmount, formatDate, getShippingIcon, getStatusConfig } from './orderFormatters';

interface RecentOrderRowProps {
  order: RecentOrder;
  index: number;
  isLast: boolean;
}

export const RecentOrderRow: React.FC<RecentOrderRowProps> = ({ order, index, isLast }) => {
  const { colors } = useAppTheme();
  const status = getStatusConfig(order.status, colors);
  const shippingIcon = getShippingIcon(order.shippingMode);

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify().damping(15)}
      style={[styles.orderRow, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
    >
      <View style={[styles.shippingIconContainer, { backgroundColor: status.bg }]}>
        <Ionicons name={shippingIcon as any} size={16} color={status.color} />
      </View>
      <View style={styles.orderInfo}>
        <View style={styles.orderTopRow}>
          <Text style={[styles.orderCode, { color: colors.text.primary }]} numberOfLines={1}>#{order.code}</Text>
          <Text style={[styles.orderAmount, { color: colors.text.primary }]}>{formatAmount(order.priceTotal)}</Text>
        </View>
        <View style={styles.orderBottomRow}>
          <Text style={[styles.orderClient, { color: colors.text.secondary }]} numberOfLines={1}>{order.clientName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>
        <Text style={[styles.orderDate, { color: colors.text.secondary }]}>{formatDate(order.createdAt)}</Text>
      </View>
    </Animated.View>
  );
};
