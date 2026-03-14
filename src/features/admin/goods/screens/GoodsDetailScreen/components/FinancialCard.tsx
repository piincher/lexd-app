import React from 'react';
import { View } from 'react-native';
import { Card, Text, Divider, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from '../GoodsDetailScreen.styles';
import { Goods } from '../../../types';

interface FinancialCardProps {
  goods: Goods;
  balanceDue: number;
  getPaymentStatusColor: () => string;
  formatCurrency: (amount: number) => string;
}

export const FinancialCard: React.FC<FinancialCardProps> = ({
  goods,
  balanceDue,
  getPaymentStatusColor,
  formatCurrency,
}) => {
  const paymentStatusColor = getPaymentStatusColor();
  const paymentStatusLabel = goods.paymentStatus === 'PAID'
    ? 'Payé'
    : goods.paymentStatus === 'PARTIAL'
    ? 'Partiel'
    : 'Non payé';

  return (
    <Card style={[styles.sectionCard, styles.financialCard]}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="cash-multiple" size={20} color={Theme.status.success} />
          <Text style={[styles.sectionTitle, { color: Theme.status.success }]}>Informations financières</Text>
        </View>

        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Prix unitaire</Text>
          <Text style={styles.financialValue}>{formatCurrency(goods.unitPrice)} FCFA</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.financialRowHighlight}>
          <Text style={styles.financialLabelHighlight}>Coût total</Text>
          <Text style={styles.financialValueTotal}>{formatCurrency(goods.totalCost)} FCFA</Text>
        </View>

        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Montant payé</Text>
          <Text style={[styles.financialValue, { color: Theme.status.success }]}>
            {formatCurrency(goods.amountPaid)} FCFA
          </Text>
        </View>

        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Reste à payer</Text>
          <Text
            style={[styles.financialValue, { color: balanceDue > 0 ? Theme.status.error : Theme.status.success }]}
          >
            {formatCurrency(balanceDue)} FCFA
          </Text>
        </View>

        <View style={styles.paymentStatusContainer}>
          <Chip
            style={[styles.paymentChip, { backgroundColor: paymentStatusColor + '20' }]}
            textStyle={{ color: paymentStatusColor, fontWeight: '600' }}
            icon={goods.paymentStatus === 'PAID' ? 'check-circle' : 'clock-outline'}
          >
            {paymentStatusLabel}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
};
