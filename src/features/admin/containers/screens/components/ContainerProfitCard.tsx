import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export interface CbmProfit {
  revenue: number;
  collected: number;
  cost: number;
  profit: number;
  profitMargin: number;
  totalCBM: number;
  cbmCostPerUnit: number;
}

interface ContainerProfitCardProps {
  cbmProfit: CbmProfit;
}

const fmt = (amount: number): string =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const Row: React.FC<{ label: string; value: string; valueColor?: string }> = ({
  label,
  value,
  valueColor = '#1F2937',
}) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={[styles.rowValue, { color: valueColor }]}>{value}</Text>
  </View>
);

export const ContainerProfitCard: React.FC<ContainerProfitCardProps> = ({ cbmProfit }) => {
  const { revenue, collected, cost, profit, profitMargin, totalCBM, cbmCostPerUnit } = cbmProfit;
  const isProfit = profit >= 0;
  const profitColor = isProfit ? '#10B981' : '#EF4444';

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: isProfit ? '#ECFDF5' : '#FEF2F2' }]}>
          <Ionicons name="trending-up" size={20} color={profitColor} />
        </View>
        <Text style={styles.title}>Rentabilité CBM</Text>
        <View style={[styles.marginBadge, { backgroundColor: isProfit ? '#ECFDF5' : '#FEF2F2' }]}>
          <Text style={[styles.marginText, { color: profitColor }]}>
            {isProfit ? '+' : ''}{profitMargin.toFixed(1)}%
          </Text>
        </View>
      </View>

      {/* Profit highlight */}
      <View style={[styles.profitBox, { backgroundColor: isProfit ? '#ECFDF5' : '#FEF2F2', borderColor: profitColor + '40' }]}>
        <Text style={styles.profitLabel}>{isProfit ? 'Bénéfice' : 'Perte'}</Text>
        <Text style={[styles.profitValue, { color: profitColor }]}>
          {isProfit ? '+' : ''}{fmt(profit)}
        </Text>
      </View>

      {/* Detail rows */}
      <View style={styles.details}>
        <Row label="Chiffre d'affaires (CA)" value={fmt(revenue)} />
        <Row label="Montant encaissé" value={fmt(collected)} valueColor="#10B981" />
        <View style={styles.divider} />
        <Row
          label={`Coût agent (${totalCBM.toFixed(2)} CBM × ${fmt(cbmCostPerUnit)}/CBM)`}
          value={fmt(cost)}
          valueColor="#EF4444"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  marginBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  marginText: {
    fontSize: 13,
    fontWeight: '700',
  },
  profitBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  profitLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profitValue: {
    fontSize: 26,
    fontWeight: '800',
  },
  details: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  rowLabel: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    flexShrink: 1,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 2,
  },
});
