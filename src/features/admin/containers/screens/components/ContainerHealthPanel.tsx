import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ContainerHealth } from '../hooks/containerAssistTypes';

interface ContainerHealthPanelProps {
  health: ContainerHealth;
}

const money = (value: number) => `${Math.round(value).toLocaleString()} FCFA`;

export const ContainerHealthPanel: React.FC<ContainerHealthPanelProps> = ({ health }) => {
  const { colors } = useAppTheme();
  const metrics = [
    { label: 'Marchandises', value: health.goodsCount.toString(), icon: 'cube-outline' },
    { label: 'Clients', value: health.clientCount.toString(), icon: 'people-outline' },
    { label: 'CBM', value: health.totalCBM.toFixed(2), icon: 'resize-outline' },
    { label: 'Poids', value: `${health.totalWeight.toFixed(0)} kg`, icon: 'barbell-outline' },
    { label: 'Valeur', value: money(health.totalValue), icon: 'cash-outline' },
    { label: 'Solde', value: money(health.balanceDue), icon: 'wallet-outline' },
  ] as const;

  return (
    <View style={[styles.panel, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text.primary }]}>Santé du container</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            {health.capacityPercentage.toFixed(0)}% utilisé · {health.remainingCapacity.toFixed(1)} {health.capacityUnit} restant
          </Text>
        </View>
        {health.issueGoodsCount > 0 ? (
          <View style={[styles.issueBadge, { backgroundColor: colors.feedback.warningBg }]}>
            <Text style={[styles.issueText, { color: colors.feedback.warningDark }]}>{health.issueGoodsCount}</Text>
          </View>
        ) : (
          <Ionicons name="checkmark-circle" size={24} color={colors.status.success} />
        )}
      </View>
      <View style={styles.grid}>
        {metrics.map((metric) => (
          <View key={metric.label} style={[styles.metric, { backgroundColor: colors.background.paper }]}>
            <Ionicons name={metric.icon} size={17} color={colors.primary[600]} />
            <Text style={[styles.metricValue, { color: colors.text.primary }]} numberOfLines={1}>
              {metric.value}
            </Text>
            <Text style={[styles.metricLabel, { color: colors.text.secondary }]}>{metric.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: { marginHorizontal: 16, marginBottom: 14, padding: 14, borderRadius: 8, borderWidth: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '800' },
  subtitle: { marginTop: 3, fontSize: 12, fontWeight: '600' },
  issueBadge: { minWidth: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  issueText: { fontSize: 14, fontWeight: '900' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  metric: { width: '31.8%', minHeight: 74, borderRadius: 8, padding: 9, justifyContent: 'space-between' },
  metricValue: { fontSize: 13, fontWeight: '800' },
  metricLabel: { fontSize: 11, fontWeight: '600' },
});

export default ContainerHealthPanel;
