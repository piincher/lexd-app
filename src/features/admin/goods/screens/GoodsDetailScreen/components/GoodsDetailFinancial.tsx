import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatCurrency } from '@src/shared/lib/currency';
import { Goods } from '../../../types';

interface GoodsDetailFinancialProps {
  goods: Goods;
}

export const GoodsDetailFinancial: React.FC<GoodsDetailFinancialProps> = ({ goods }) => {
  const { colors } = useAppTheme();
  const totalCost = goods.totalCost || 0;
  const amountPaid = goods.amountPaid || 0;
  const balanceDue = totalCost - amountPaid;

  // Compute payment status from amounts (primary source of truth)
  // Fall back to the API paymentStatus string
  let computedStatus: 'UNPAID' | 'PARTIAL' | 'PAID' = 'UNPAID';
  if (totalCost > 0 && amountPaid >= totalCost) {
    computedStatus = 'PAID';
  } else if (amountPaid > 0 && amountPaid < totalCost) {
    computedStatus = 'PARTIAL';
  } else if ((goods.paymentStatus || '').toUpperCase() === 'PAID') {
    computedStatus = 'PAID';
  } else if ((goods.paymentStatus || '').toUpperCase() === 'PARTIAL') {
    computedStatus = 'PARTIAL';
  }

  const statusColor =
    computedStatus === 'PAID'
      ? colors.status.success
      : computedStatus === 'PARTIAL'
        ? colors.status.warning
        : colors.status.error;

  const statusLabel =
    computedStatus === 'PAID'
      ? 'Payé'
      : computedStatus === 'PARTIAL'
        ? 'Partiel'
        : 'Non payé';

  return (
    <Card style={[styles.card, { backgroundColor: colors.background.card, borderLeftColor: colors.status.success }]}>
      <Card.Content>
        <View style={styles.header}>
          <Ionicons name="cash-outline" size={20} color={colors.status.success} />
          <Text style={[styles.title, { color: colors.status.success }]}>Informations financières</Text>
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
          <Text style={[styles.value, { color: colors.status.success }]}>{formatCurrency(amountPaid)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Reste à payer</Text>
          <Text style={[styles.value, { color: balanceDue > 0 ? colors.status.error : colors.status.success }]}>
            {formatCurrency(balanceDue)}
          </Text>
        </View>

        <View style={styles.chipContainer}>
          <Chip
            style={[styles.chip, { backgroundColor: statusColor + '20' }]}
            textStyle={{ color: statusColor, fontWeight: '600' }}
            icon={computedStatus === 'PAID' ? 'check-circle' : 'clock-outline'}
          >
            {statusLabel}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12, borderRadius: 12, borderLeftWidth: 4 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 16, fontWeight: '700', marginLeft: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  rowHighlight: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 8, marginVertical: 8 },
  label: { fontSize: 14 },
  labelHighlight: { fontSize: 14, fontWeight: '600' },
  value: { fontSize: 15, fontWeight: '600' },
  valueTotal: { fontSize: 20, fontWeight: '800' },
  divider: { marginVertical: 8 },
  chipContainer: { marginTop: 16, alignItems: 'flex-start' },
  chip: { height: 36, paddingHorizontal: 8 },
});
