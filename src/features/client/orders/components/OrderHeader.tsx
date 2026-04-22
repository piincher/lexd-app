/**
 * Order Header Component
 * Shows order code and status badge
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '@src/shared/ui/Badge';
import { ClientOrder } from '../api/clientOrdersApi';
import { Theme } from '@src/constants/Theme';

interface OrderHeaderProps {
  order: ClientOrder;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ order }) => (
  <View style={styles.header}>
    <Text style={styles.orderCode}>{order.orderNumber}</Text>
    <Badge
      label={order.status}
      variant="custom"
      backgroundColor={Theme.colors.feedback.infoBg}
      textColor={Theme.colors.status.info}
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  orderCode: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[900],
  },
});
