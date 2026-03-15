/**
 * OrderSummaryCard - Displays order summary information
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@src/shared/ui';
import { lightTheme } from '@src/constants/Theme';

interface OrderSummaryCardProps {
  code: string;
  clientName: string;
  status: string;
  totalCBM: number;
  totalCost: number;
  pricingSource?: string;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  code,
  clientName,
  status,
  totalCBM,
  totalCost,
  pricingSource,
}) => {
  return (
    <Card variant="elevated" style={styles.card}>
      <Text style={styles.code}>{code}</Text>
      <Text style={styles.client}>{clientName}</Text>
      <Text style={styles.status}>Status: {status}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Total CBM:</Text>
        <Text style={styles.value}>{totalCBM} m³</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Cost:</Text>
        <Text style={styles.value}>${totalCost}</Text>
      </View>
      {pricingSource && (
        <Text style={styles.pricingSource}>Pricing: {pricingSource}</Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: lightTheme.spacing.lg,
    padding: lightTheme.spacing.lg,
  },
  code: {
    fontSize: lightTheme.typography.h4.fontSize,
    fontWeight: '700',
    color: lightTheme.colors.text.primary,
    marginBottom: lightTheme.spacing.sm,
  },
  client: {
    fontSize: lightTheme.typography.body.fontSize,
    color: lightTheme.colors.text.secondary,
    marginBottom: lightTheme.spacing.sm,
  },
  status: {
    fontSize: lightTheme.typography.bodySmall.fontSize,
    color: lightTheme.colors.status.info,
    marginBottom: lightTheme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: lightTheme.spacing.sm,
  },
  label: {
    fontSize: lightTheme.typography.bodySmall.fontSize,
    color: lightTheme.colors.text.secondary,
  },
  value: {
    fontSize: lightTheme.typography.bodySmall.fontSize,
    fontWeight: '600',
    color: lightTheme.colors.text.primary,
  },
  pricingSource: {
    fontSize: lightTheme.typography.caption.fontSize,
    color: lightTheme.colors.text.muted,
    marginTop: lightTheme.spacing.sm,
  },
});

export default OrderSummaryCard;
