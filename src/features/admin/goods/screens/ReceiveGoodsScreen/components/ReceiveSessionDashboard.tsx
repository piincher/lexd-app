import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatCurrency } from '@src/shared/lib/currency';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ReceiveSessionItem } from '../hooks/useReceiveAssistSession';

interface ReceiveSessionDashboardProps {
  stats: {
    count: number;
    totalCBM: number;
    totalWeight: number;
    totalValue: number;
    exceptionCount: number;
  };
  duplicateWarnings: number;
  todayItems: ReceiveSessionItem[];
}

export const ReceiveSessionDashboard: React.FC<ReceiveSessionDashboardProps> = ({
  stats,
  duplicateWarnings,
  todayItems,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.panel, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <View style={styles.titleRow}>
        <MaterialCommunityIcons name="warehouse" size={20} color={colors.primary.main} />
        <Text style={[styles.title, { color: colors.text.primary }]}>Session réception</Text>
      </View>
      <View style={styles.grid}>
        <Metric label="colis" value={String(stats.count)} />
        <Metric label="kg" value={stats.totalWeight.toFixed(1)} />
        <Metric label="CBM" value={stats.totalCBM.toFixed(3)} />
        <Metric label="valeur" value={formatCurrency(stats.totalValue)} wide />
      </View>
      <Text style={[styles.footer, { color: colors.text.secondary }]}>
        {"Aujourd'hui"}: {todayItems.length} · Exceptions: {stats.exceptionCount} · Alertes doublon: {duplicateWarnings}
      </Text>
    </View>
  );
};

const Metric = ({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.metric, wide && styles.metricWide, { backgroundColor: colors.background.paper }]}>
      <Text style={[styles.value, { color: colors.text.primary }]} numberOfLines={1}>{value}</Text>
      <Text style={[styles.label, { color: colors.text.secondary }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: { margin: 16, marginBottom: 8, padding: 14, borderRadius: 8, borderWidth: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  title: { fontSize: 15, fontWeight: '800' },
  grid: { flexDirection: 'row', gap: 8 },
  metric: { flex: 1, minHeight: 56, borderRadius: 8, padding: 8, justifyContent: 'center' },
  metricWide: { flex: 1.35 },
  value: { fontSize: 14, fontWeight: '800' },
  label: { fontSize: 10, marginTop: 2 },
  footer: { marginTop: 10, fontSize: 12 },
});
