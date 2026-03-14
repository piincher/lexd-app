// GoodsDetailPricing - Financial information and payment status

import React from 'react';
import { View } from 'react-native';
import { Text, Card, Divider, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { PaymentStatus } from '../../../types';

interface GoodsDetailPricingProps {
  unitPrice?: number;
  totalCost?: number;
  amountPaid?: number;
  paymentStatus: PaymentStatus;
}

const formatCurrency = (amount: number): string => {
  return amount?.toLocaleString('fr-FR') || '0';
};

const getPaymentStatusColor = (status: PaymentStatus): string => {
  switch (status) {
    case 'PAID': return Theme.status.success;
    case 'PARTIAL': return Theme.status.warning;
    default: return Theme.status.error;
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
  const balanceDue = (totalCost || 0) - (amountPaid || 0);
  const statusColor = getPaymentStatusColor(paymentStatus);

  return (
    <Card style={[styles.sectionCard, styles.financialCard]}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="cash-multiple" size={20} color={Theme.status.success} />
          <Text style={[styles.sectionTitle, { color: Theme.status.success }]}>Informations financières</Text>
        </View>
        
        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Prix unitaire</Text>
          <Text style={styles.financialValue}>{formatCurrency(unitPrice || 0)} FCFA</Text>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.financialRowHighlight}>
          <Text style={styles.financialLabelHighlight}>Coût total</Text>
          <Text style={styles.financialValueTotal}>
            {formatCurrency(totalCost || 0)} FCFA
          </Text>
        </View>
        
        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Montant payé</Text>
          <Text style={[styles.financialValue, { color: Theme.status.success }]}>
            {formatCurrency(amountPaid || 0)} FCFA
          </Text>
        </View>
        
        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Reste à payer</Text>
          <Text style={[styles.financialValue, { 
            color: balanceDue > 0 ? Theme.status.error : Theme.status.success 
          }]}>
            {formatCurrency(balanceDue)} FCFA
          </Text>
        </View>

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

const styles = {
  sectionCard: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  financialCard: {
    borderLeftWidth: 4,
    borderLeftColor: Theme.status.success,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Theme.neutral[800],
    marginLeft: 10,
  },
  financialRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: 10,
  },
  financialRowHighlight: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    backgroundColor: Theme.primary[50],
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },
  financialLabel: {
    fontSize: 14,
    color: Theme.neutral[600],
  },
  financialLabelHighlight: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Theme.neutral[700],
  },
  financialValue: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Theme.neutral[800],
  },
  financialValueTotal: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: Theme.primary[600],
  },
  divider: {
    marginVertical: 8,
    backgroundColor: Theme.neutral[200],
  },
  paymentStatusContainer: {
    marginTop: 16,
    alignItems: 'flex-start' as const,
  },
  paymentChip: {
    height: 36,
    paddingHorizontal: 8,
  },
};
