import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Badge } from '@src/shared/ui/Badge';
import { Order, OrderStatus } from '../../types';

interface PastOrderCardProps {
  order: Order;
  onPress: (order: Order) => void;
}

const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string; label: string }> = {
  draft: { bg: Theme.neutral.grey200, text: Theme.neutral.grey700, label: 'Brouillon' },
  pending: { bg: Theme.colors.warning.light + '30', text: Theme.colors.warning.main, label: 'En attente' },
  confirmed: { bg: Theme.colors.info.light + '30', text: Theme.colors.info.main, label: 'Confirmé' },
  in_transit: { bg: Theme.colors.primary.light + '30', text: Theme.colors.primary.main, label: 'En transit' },
  customs: { bg: Theme.colors.warning.light + '30', text: Theme.colors.warning.main, label: 'Douane' },
  delivered: { bg: Theme.colors.success.light + '30', text: Theme.colors.success.main, label: 'Livré' },
  cancelled: { bg: Theme.colors.error.light + '30', text: Theme.colors.error.main, label: 'Annulé' },
};

export const PastOrderCard: React.FC<PastOrderCardProps> = ({ order, onPress }) => {
  const statusStyle = STATUS_COLORS[order.status] ?? STATUS_COLORS.pending;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(order)}>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>{order.orderNumber ?? '—'}</Text>
        <Badge
          label={statusStyle.label}
          variant="custom"
          backgroundColor={statusStyle.bg}
          textColor={statusStyle.text}
        />
      </View>
      
      <View style={styles.details}>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color={Theme.neutral.grey500} />
          <Text style={styles.detailText}>{order.destination?.address ?? 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="cube-outline" size={16} color={Theme.neutral.grey500} />
          <Text style={styles.detailText}>
            {order.shippingMode === 'air' ? 'Fret Aérien' : 'Fret Maritime'}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>
          {new Date(order.metadata?.createdAt ?? Date.now()).toLocaleDateString('fr-FR')}
        </Text>
        <Text style={styles.amount}>
          {order.pricing?.total?.toLocaleString('fr-FR') ?? '0'} {order.pricing?.currency ?? 'XOF'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 12,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.neutral.grey200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral.grey900,
  },
  details: {
    marginBottom: Theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  detailText: {
    fontSize: 14,
    color: Theme.neutral.grey600,
    marginLeft: Theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral.grey100,
  },
  date: {
    fontSize: 12,
    color: Theme.neutral.grey500,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.primary.main,
  },
});
