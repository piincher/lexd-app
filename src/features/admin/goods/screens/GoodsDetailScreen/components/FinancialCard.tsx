import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Card, Text, Divider, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import {  createStyles  } from '../GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';


interface FinancialCardProps {
  unitPrice: number;
  totalCost: number;
  amountPaid: number;
  balanceDue: number;
  paymentStatus: string;
  getPaymentStatusColor: () => string;
  formatCurrency: (amount: number) => string;
}

export const FinancialCard: React.FC<FinancialCardProps> = ({
  unitPrice,
  totalCost,
  amountPaid,
  balanceDue,
  paymentStatus,
  getPaymentStatusColor,
  formatCurrency,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const paymentStatusColor = getPaymentStatusColor();
  const paymentStatusLabel = paymentStatus === 'PAID'
    ? 'Payé'
    : paymentStatus === 'PARTIAL'
    ? 'Partiel'
    : 'Non payé';

  return (
    <Card style={[styles.sectionCard, styles.financialCard]}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="cash-multiple" size={20} color={colors.status.success} />
          <Text style={[styles.sectionTitle, { color: colors.status.success }]}>Informations financières</Text>
        </View>

        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Prix unitaire</Text>
          <Text style={styles.financialValue}>{formatCurrency(unitPrice)} FCFA</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.financialRowHighlight}>
          <Text style={styles.financialLabelHighlight}>Coût total</Text>
          <Text style={styles.financialValueTotal}>{formatCurrency(totalCost)} FCFA</Text>
        </View>

        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Montant payé</Text>
          <Text style={[styles.financialValue, { color: colors.status.success }]}>
            {formatCurrency(amountPaid)} FCFA
          </Text>
        </View>

        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Reste à payer</Text>
          <Text
            style={[styles.financialValue, { color: balanceDue > 0 ? colors.status.error : colors.status.success }]}
          >
            {formatCurrency(balanceDue)} FCFA
          </Text>
        </View>

        <View style={styles.paymentStatusContainer}>
          <Chip
            style={[styles.paymentChip, { backgroundColor: paymentStatusColor + '20' }]}
            textStyle={{ color: paymentStatusColor, fontWeight: '600' }}
            icon={paymentStatus === 'PAID' ? 'check-circle' : 'clock-outline'}
          >
            {paymentStatusLabel}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
};
