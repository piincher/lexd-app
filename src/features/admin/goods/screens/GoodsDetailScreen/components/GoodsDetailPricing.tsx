import { useAppTheme } from '@src/providers/ThemeProvider';
// GoodsDetailPricing - Financial information and payment status

import React from 'react';
import { View } from 'react-native';
import { Text, Card, Divider, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { PaymentStatus } from '../../../types';
import { PricingRow } from './PricingRow';
import { createStyles } from './GoodsDetailPricing.styles';

interface GoodsDetailPricingProps {
  unitPrice?: number;
  totalCost?: number;
  amountPaid?: number;
  paymentStatus: PaymentStatus;
}

const formatCurrency = (amount: number): string => {
  return amount?.toLocaleString('fr-FR') || '0';
};

const getPaymentStatusColor = (status: PaymentStatus, colors: any): string => {
  switch (status) {
    case 'PAID': return colors.status.success;
    case 'PARTIAL': return colors.status.warning;
    default: return colors.status.error;
  }
};

const getPaymentStatusLabel = (status: PaymentStatus): string => {
  switch (status) {
    case 'PAID': return 'Payé';
    case 'PARTIAL': return 'Partiel';
    default: return 'Non payé';
  }
};

export const GoodsDetailPricing: React.FC<GoodsDetailPricingProps> = ({
  unitPrice,
  totalCost,
  amountPaid,
  paymentStatus,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const balanceDue = (totalCost || 0) - (amountPaid || 0);
  const statusColor = getPaymentStatusColor(paymentStatus, colors);

  return (
    <Card style={[styles.sectionCard, styles.financialCard]}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="cash-multiple" size={20} color={colors.status.success} />
          <Text style={[styles.sectionTitle, { color: colors.status.success }]}>Informations financières</Text>
        </View>
        
        <PricingRow label="Prix unitaire" value={`${formatCurrency(unitPrice || 0)} FCFA`} />
        
        <Divider style={styles.divider} />
        
        <PricingRow
          label="Coût total"
          value={`${formatCurrency(totalCost || 0)} FCFA`}
          highlight
        />
        
        <PricingRow
          label="Montant payé"
          value={`${formatCurrency(amountPaid || 0)} FCFA`}
          valueColor={colors.status.success}
        />
        
        <PricingRow
          label="Reste à payer"
          value={`${formatCurrency(balanceDue)} FCFA`}
          valueColor={balanceDue > 0 ? colors.status.error : colors.status.success}
        />

        <View style={styles.paymentStatusContainer}>
          <Chip
            style={[styles.paymentChip, { backgroundColor: statusColor + '20' }]}
            textStyle={{ color: statusColor, fontWeight: '600' }}
            icon={paymentStatus === 'PAID' ? 'check-circle' : 'clock-outline'}
          >
            {getPaymentStatusLabel(paymentStatus)}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
};
