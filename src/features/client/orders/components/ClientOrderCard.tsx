import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Badge } from '@src/shared/ui/Badge';
import { formatCurrency } from '@src/shared/lib';
import { Order, OrderStatus } from '../types';

interface ClientOrderCardProps {
  order: Order;
  onPress: (order: Order) => void;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; variant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' }> = {
  draft: { label: 'Brouillon', variant: 'default' },
  pending: { label: 'En attente', variant: 'warning' },
  confirmed: { label: 'Confirmé', variant: 'info' },
  in_transit: { label: 'En transit', variant: 'primary' },
  customs: { label: 'Douane', variant: 'warning' },
  delivered: { label: 'Livré', variant: 'success' },
  cancelled: { label: 'Annulé', variant: 'error' },
};

export const ClientOrderCard: React.FC<ClientOrderCardProps> = ({ order, onPress }) => {
  const statusConfig = STATUS_CONFIG[order.status];

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(order)}>
      <View style={styles.header}>
        <Text style={styles.orderCode}>{order.orderCode}</Text>
        <Badge label={statusConfig.label} variant={statusConfig.variant} />
      </View>

      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.label}>Volume:</Text>
          <Text style={styles.value}>{order.totalCBM.toFixed(2)} CBM</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Coût total:</Text>
          <Text style={styles.cost}>{formatCurrency(order.totalCost)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>
          {new Date(order.createdAt).toLocaleDateString('fr-FR')}
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
  orderCode: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral.grey900,
  },
  details: {
    marginBottom: Theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  label: {
    fontSize: 14,
    color: Theme.neutral.grey600,
  },
  value: {
    fontSize: 14,
    color: Theme.neutral.grey800,
    fontWeight: '500',
  },
  cost: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.primary.main,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral.grey100,
  },
  date: {
    fontSize: 12,
    color: Theme.neutral.grey500,
  },
});

export default ClientOrderCard;
