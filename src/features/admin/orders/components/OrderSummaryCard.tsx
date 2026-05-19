/**
 * OrderSummaryCard - Displays order summary information
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@src/shared/ui/Card';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface OrderSummaryCardProps {
  code: string;
  clientName: string;
  status: string;
  totalCBM: number;
  totalCost: number;
  pricingSource?: string;
}

const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
  },
  code: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  client: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: colors.status.info,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  pricingSource: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 8,
  },
});

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  code,
  clientName,
  status,
  totalCBM,
  totalCost,
  pricingSource,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

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

export default OrderSummaryCard;
