import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatCurrency } from '@src/shared/lib/currency';
import type { AirwayBillManifestSummary as Summary } from '../../types';

interface Props {
  summary: Summary;
}

const Stat: React.FC<{ label: string; value: string | number; icon: keyof typeof MaterialCommunityIcons.glyphMap }> = ({
  label,
  value,
  icon,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.stat, { backgroundColor: colors.background.card }]}>
      <MaterialCommunityIcons name={icon} size={18} color={colors.primary.main} />
      <Text style={[styles.value, { color: colors.text.primary }]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={[styles.label, { color: colors.text.muted }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};

export const AirwayBillManifestSummary: React.FC<Props> = ({ summary }) => (
  <View style={styles.grid}>
    <Stat icon="account-group-outline" label="Clients" value={summary.totalClients} />
    <Stat icon="cube-outline" label="Articles" value={summary.totalGoods} />
    <Stat icon="bag-personal-outline" label="Sacs" value={summary.totalCargoBags} />
    <Stat icon="alert-outline" label="Sans sac" value={summary.unbaggedGoods} />
    <Stat icon="weight-kilogram" label="Poids" value={`${summary.totalWeight.toFixed(1)} kg`} />
    <Stat icon="cash-clock" label="Solde dû" value={formatCurrency(summary.totalBalanceDue)} />
  </View>
);

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  stat: {
    width: '31%',
    minWidth: 96,
    borderRadius: 14,
    padding: 12,
    gap: 4,
  },
  value: { fontSize: 15, fontWeight: '800' },
  label: { fontSize: 11, fontWeight: '600' },
});

export default AirwayBillManifestSummary;
