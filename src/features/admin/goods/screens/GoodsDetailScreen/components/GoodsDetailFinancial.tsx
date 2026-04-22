import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { formatCurrency } from '@src/shared/lib/currency';
import { Goods } from '../../../types';

interface GoodsDetailFinancialProps {
  goods: Goods;
}

const getPaymentStatusColor = (status: string): string => {
  switch (status) {
    case 'PAID': return Theme.status.success;
    case 'PARTIAL': return Theme.status.warning;
    default: return Theme.status.error;
  }
};

const getPaymentStatusLabel = (status: string): string => {
  switch (status) {
    case 'PAID': return 'Payé';
    case 'PARTIAL': return 'Partiel';
    default: return 'Non payé';
  }
};

export const GoodsDetailFinancial: React.FC<GoodsDetailFinancialProps> = ({ goods }) => {
  const { colors } = useAppTheme();
  const totalCost = goods.totalCost || 0;
  const amountPaid = goods.amountPaid || 0;
  const balanceDue = totalCost - amountPaid;
  const statusColor = getPaymentStatusColor(goods.paymentStatus);

  return (
    <Card style={[styles.card, styles.financialCard, { backgroundColor: colors.background.card }]}>
      <Card.Content>
        <View style={styles.header}>
          <Ionicons name="cash-outline" size={20} color={Theme.status.success} />
          <Text style={[styles.title, { color: Theme.status.success }]}>Informations financières</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Prix unitaire</Text>
          <Text style={[styles.value, { color: colors.text.primary }]}>{formatCurrency(goods.unitPrice || 0)}</Text>
        </View>

        <Divider style={[styles.divider, { backgroundColor: colors.neutral[200] }]} />

        <View style={[styles.rowHighlight, { backgroundColor: colors.primary[50] }]}>
          <Text style={[styles.labelHighlight, { color: colors.text.primary }]}>Coût total</Text>
          <Text style={[styles.valueTotal, { color: colors.primary[600] }]}>{formatCurrency(totalCost)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Montant payé</Text>
          <Text style={[styles.value, { color: Theme.status.success }]}>{formatCurrency(amountPaid)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Reste à payer</Text>
          <Text style={[styles.value, { color: balanceDue > 0 ? Theme.status.error : Theme.status.success }]}>
            {formatCurrency(balanceDue)}
          </Text>
        </View>

        <View style={styles.chipContainer}>
          <Chip
            style={[styles.chip, { backgroundColor: statusColor + '20' }]}
            textStyle={{ color: statusColor, fontWeight: '600' }}
            icon={goods.paymentStatus === 'PAID' ? 'check-circle' : 'clock-outline'}
          >
            {getPaymentStatusLabel(goods.paymentStatus)}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12, borderRadius: Theme.radius.lg },
  financialCard: { borderLeftWidth: 4, borderLeftColor: Theme.status.success },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 16, fontWeight: '700', marginLeft: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  rowHighlight: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: Theme.radius.sm, marginVertical: 8 },
  label: { fontSize: 14 },
  labelHighlight: { fontSize: 14, fontWeight: '600' },
  value: { fontSize: 15, fontWeight: '600' },
  valueTotal: { fontSize: 20, fontWeight: '800' },
  divider: { marginVertical: 8 },
  chipContainer: { marginTop: 16, alignItems: 'flex-start' },
  chip: { height: 36, paddingHorizontal: 8 },
});
