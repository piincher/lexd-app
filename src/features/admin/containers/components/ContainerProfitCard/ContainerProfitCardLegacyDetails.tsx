import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
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
}) => {
  const { colors } = useAppTheme();
  return (
  <View style={styles.details}>
    <ContainerProfitCardRow label="Chiffre d'affaires (CA)" value={fmt(revenue)} />
    <ContainerProfitCardRow label="Montant encaissé" value={fmt(collected)} valueColor={colors.status.success} />
    <View style={styles.divider} />
    <ContainerProfitCardRow
      label={`Coût agent (${(totalCBM ?? 0).toFixed(2)} CBM × ${fmt(cbmCostPerUnit ?? 0)}/CBM)`}
      value={fmt(cost)}
      valueColor={colors.status.error}
    />
  </View>
);
}

const styles = StyleSheet.create({
  details: {
    gap: 10,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.neutral[100],
    marginVertical: 2,
  },
});
