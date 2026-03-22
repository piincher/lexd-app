/**
 * RecentOrdersList
 * SRP: Displays the most recent orders with status badges and details
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { RecentOrder } from '../../types';

interface RecentOrdersListProps {
  orders: RecentOrder[];
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  Active: { label: 'Charge', color: '#F59E0B', bg: '#FFFBEB' },
  'In Transit': { label: 'En Transit', color: '#3B82F6', bg: '#EFF6FF' },
  Delivered: { label: 'Livre', color: '#10B981', bg: '#F0FDF4' },
  Inactive: { label: 'Inactif', color: '#6B7280', bg: '#F3F4F6' },
};

const SHIPPING_ICON: Record<string, string> = {
  air: 'airplane-outline',
  sea: 'boat-outline',
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

const formatAmount = (amount: number): string => {
  const num = Number(amount) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M F`;
  return `${new Intl.NumberFormat('fr-FR').format(Math.round(num))} F`;
};

const OrderRow: React.FC<{ order: RecentOrder; index: number; isLast: boolean }> = ({
  order,
  index,
  isLast,
}) => {
  const status = STATUS_MAP[order.status] || STATUS_MAP.Inactive;
  const shippingIcon = SHIPPING_ICON[order.shippingMode?.toLowerCase()] || 'cube-outline';

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify().damping(15)}
      style={[styles.orderRow, !isLast && styles.orderRowBorder]}
    >
      <View style={[styles.shippingIconContainer, { backgroundColor: status.bg }]}>
        <Ionicons name={shippingIcon as any} size={16} color={status.color} />
      </View>
      <View style={styles.orderInfo}>
        <View style={styles.orderTopRow}>
          <Text style={styles.orderCode} numberOfLines={1}>#{order.code}</Text>
          <Text style={styles.orderAmount}>{formatAmount(order.priceTotal)}</Text>
        </View>
        <View style={styles.orderBottomRow}>
          <Text style={styles.orderClient} numberOfLines={1}>{order.clientName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>
        <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
      </View>
    </Animated.View>
  );
};

export const RecentOrdersList: React.FC<RecentOrdersListProps> = ({ orders }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Commandes recentes</Text>
          <Text style={styles.headerSubtitle}>Dernieres activites</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{orders.length}</Text>
        </View>
      </View>

      {orders.length > 0 ? (
        orders.map((order, index) => (
          <OrderRow
            key={order._id}
            order={order}
            index={index}
            isLast={index === orders.length - 1}
          />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={28} color={Theme.neutral[300]} />
          <Text style={styles.emptyText}>Aucune commande recente</Text>
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
  headerSubtitle: {
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
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  orderRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[50],
  },
  shippingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderCode: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  orderAmount: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  orderBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  orderClient: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Theme.neutral[500],
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 9,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  orderDate: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 2,
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
