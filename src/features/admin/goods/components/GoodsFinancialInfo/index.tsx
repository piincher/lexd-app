/**
 * GoodsFinancialInfo - Display financial information
 * SRP: Show pricing, payment status, and balance
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Text, Chip, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './GoodsFinancialInfo.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsFinancialInfoProps {
  unitPrice: number;
  totalCost: number;
  amountPaid: number;
  paymentStatus: string;
}

export const GoodsFinancialInfo: React.FC<GoodsFinancialInfoProps> = ({
  unitPrice,
  totalCost,
  amountPaid,
  paymentStatus,
}) => {
  const balanceDue = totalCost - amountPaid;

  const getPaymentStatusColor = () => {
    switch (paymentStatus) {
      case 'PAID':
        return colors.status.success;
      case 'PARTIAL':
        return colors.status.warning;
      default:
        return colors.status.error;
    }
  };

  const getPaymentStatusLabel = () => {
    switch (paymentStatus) {
      case 'PAID':
        return 'Payé';
      case 'PARTIAL':
        return 'Partiel';
      default:
        return 'Non payé';
    }
  };

  const formatCurrency = (amount: number) => {
    return amount?.toLocaleString('fr-FR') || '0';
  };

  const { colors, isDark } = useAppTheme();

  const styles = createStyles(colors, isDark);

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="cash-multiple" size={20} color={colors.status.success} />
          <Text style={styles.title}>Informations financières</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Prix unitaire</Text>
          <Text style={styles.value}>{formatCurrency(unitPrice)} FCFA</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.highlightRow}>
          <Text style={styles.highlightLabel}>Coût total</Text>
          <Text style={styles.totalValue}>{formatCurrency(totalCost)} FCFA</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Montant payé</Text>
          <Text style={[styles.value, { color: colors.status.success }]}>
            {formatCurrency(amountPaid)} FCFA
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Reste à payer</Text>
          <Text style={[styles.value, { color: balanceDue > 0 ? colors.status.error : colors.status.success }]}>
            {formatCurrency(balanceDue)} FCFA
          </Text>
        </View>

        <View style={styles.chipContainer}>
          <Chip
            style={[styles.chip, { backgroundColor: getPaymentStatusColor() + '20' }]}
            textStyle={{ color: getPaymentStatusColor(), fontWeight: '600' }}
            icon={paymentStatus === 'PAID' ? 'check-circle' : 'clock-outline'}
          >
            {getPaymentStatusLabel()}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
};
