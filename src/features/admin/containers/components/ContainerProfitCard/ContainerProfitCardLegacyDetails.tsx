import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { ContainerProfitCardRow } from './ContainerProfitCardRow';
import { fmt } from '../../lib/formatCurrency';

interface ContainerProfitCardLegacyDetailsProps {
  revenue: number;
  collected: number;
  cost: number;
  totalCBM: number;
  cbmCostPerUnit: number;
}

export const ContainerProfitCardLegacyDetails: React.FC<ContainerProfitCardLegacyDetailsProps> = ({
  revenue,
  collected,
  cost,
  totalCBM,
  cbmCostPerUnit,
}) => (
  <View style={styles.details}>
    <ContainerProfitCardRow label="Chiffre d'affaires (CA)" value={fmt(revenue)} />
    <ContainerProfitCardRow label="Montant encaissé" value={fmt(collected)} valueColor="#10B981" />
    <View style={styles.divider} />
    <ContainerProfitCardRow
      label={`Coût agent (${totalCBM.toFixed(2)} CBM × ${fmt(cbmCostPerUnit)}/CBM)`}
      value={fmt(cost)}
      valueColor="#EF4444"
    />
  </View>
);

const styles = StyleSheet.create({
  details: {
    gap: 10,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.neutral[100],
    marginVertical: 2,
  },
});
