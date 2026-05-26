import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { MonthlyTrendPoint, ShippingSummary } from '@src/shared/types/dashboard';

interface Props {
  summary: ShippingSummary;
  trend: MonthlyTrendPoint[];
}

const formatMoney = (value: number) =>
  `${Math.round(value || 0).toLocaleString('fr-FR')} FCFA`;

export const ShippingAnalyticsPanel: React.FC<Props> = ({ summary, trend }) => {
  const { colors } = useAppTheme();
  const maxVolume = Math.max(...trend.map((item) => item.cbm + item.kg / 100), 1);
  const styles = StyleSheet.create({
    wrapper: { paddingHorizontal: 16, marginTop: 16 },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: { color: colors.text.primary, fontSize: 17, fontWeight: '900' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
    metric: { width: '48%', borderRadius: 12, padding: 10, backgroundColor: colors.background.paper },
    value: { color: colors.text.primary, fontSize: 16, fontWeight: '900' },
    label: { color: colors.text.secondary, fontSize: 11, fontWeight: '600', marginTop: 2 },
    bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, height: 78, marginTop: 16 },
    barSlot: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
    bar: { width: '70%', minHeight: 6, borderRadius: 999, backgroundColor: colors.primary.main },
    month: { color: colors.text.secondary, fontSize: 10, fontWeight: '700', marginTop: 6 },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>Performance shipping</Text>
        <View style={styles.grid}>
          <View style={styles.metric}>
            <Text style={styles.value}>{summary.currentMonthCBM.toLocaleString('fr-FR')} CBM</Text>
            <Text style={styles.label}>CBM ce mois</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.value}>{summary.currentMonthKg.toLocaleString('fr-FR')} KG</Text>
            <Text style={styles.label}>KG ce mois</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.value}>{formatMoney(summary.averageShipmentValue)}</Text>
            <Text style={styles.label}>Moyenne par colis</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.value}>{summary.totalCBM.toLocaleString('fr-FR')}</Text>
            <Text style={styles.label}>CBM total</Text>
          </View>
        </View>
        <View style={styles.bars}>
          {trend.map((item) => {
            const height = Math.max(6, Math.round(((item.cbm + item.kg / 100) / maxVolume) * 58));
            return (
              <View key={item.month} style={styles.barSlot}>
                <View style={[styles.bar, { height }]} />
                <Text style={styles.month}>{item.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ShippingAnalyticsPanel;
