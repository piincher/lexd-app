/**
 * Order Summary Component
 * Shows total CBM and package count
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@src/shared/ui/Card';
import { ClientOrder } from '../api/clientOrdersApi';
import { formatCBM } from '@src/shared/lib/formatters';
import { Theme } from '@src/constants/Theme';

interface OrderSummaryProps {
  order: ClientOrder;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  const totalCBM = order.packages.reduce(
    (sum, pkg) =>
      sum + (pkg.dimensions.length * pkg.dimensions.width * pkg.dimensions.height) / 1000000,
    0
  );

  return (
    <Card style={styles.summaryCard}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Volume Total</Text>
          <Text style={styles.summaryValue}>{formatCBM(totalCBM)}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Colis</Text>
          <Text style={styles.summaryValue}>{order.packages.length}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    marginBottom: Theme.spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Theme.spacing.md,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: Theme.neutral.grey500,
    marginBottom: Theme.spacing.xs,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.colors.primary.main,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: Theme.neutral.grey200,
  },
});
