import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { ContainerProfitSummary } from '../../api/statsApi';

interface ProfitOverviewCardProps {
  profitSummary: ContainerProfitSummary | null;
  isLoading: boolean;
}

const fmt = (amount: number): string => {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M F`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K F`;
  return `${amount.toFixed(0)} F`;
};

const MetricRow: React.FC<{
  label: string;
  value: string;
  valueColor?: string;
  icon?: string;
}> = ({ label, value, valueColor = Theme.neutral[800], icon }) => (
  <View style={styles.metricRow}>
    <View style={styles.metricLeft}>
      {icon ? <Ionicons name={icon as any} size={14} color={Theme.neutral[400]} style={{ marginRight: 6 }} /> : null}
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
    <Text style={[styles.metricValue, { color: valueColor }]}>{value}</Text>
  </View>
);

export const ProfitOverviewCard: React.FC<ProfitOverviewCardProps> = ({
  profitSummary,
  isLoading,
}) => {
  const s = profitSummary?.summary;
  const containers = profitSummary?.containers ?? [];

  const isProfit = (s?.totalProfit ?? 0) >= 0;
  const profitColor = isProfit ? '#10B981' : '#EF4444';

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="trending-up" size={18} color="#10B981" />
        </View>
        <Text style={styles.title}>Rentabilité Globale CBM</Text>
        {!isLoading && s && (
          <View style={[styles.marginBadge, { backgroundColor: isProfit ? '#ECFDF5' : '#FEF2F2' }]}>
            <Text style={[styles.marginText, { color: profitColor }]}>
              {isProfit ? '+' : ''}{s.overallMargin.toFixed(1)}%
            </Text>
          </View>
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" color={Theme.primary[500]} style={{ paddingVertical: 24 }} />
      ) : !s ? (
        <Text style={styles.emptyText}>Aucune donnée disponible</Text>
      ) : (
        <>
          {/* Big profit number */}
          <View style={[styles.profitBox, { backgroundColor: isProfit ? '#ECFDF5' : '#FEF2F2' }]}>
            <Text style={styles.profitLabel}>{isProfit ? 'Bénéfice Total' : 'Perte Totale'}</Text>
            <Text style={[styles.profitValue, { color: profitColor }]}>
              {isProfit ? '+' : ''}{fmt(s.totalProfit)}
            </Text>
            <Text style={styles.profitSub}>
              {s.containerCount} conteneur{s.containerCount > 1 ? 's' : ''} · {s.totalCBM.toFixed(2)} CBM total
            </Text>
          </View>

          {/* Metrics */}
          <View style={styles.metrics}>
            <MetricRow
              icon="cash-outline"
              label="Chiffre d'affaires"
              value={fmt(s.totalRevenue)}
            />
            <MetricRow
              icon="checkmark-circle-outline"
              label="Encaissé"
              value={fmt(s.totalCollected)}
              valueColor="#10B981"
            />
            <View style={styles.divider} />
            <MetricRow
              icon="boat-outline"
              label={`Coût agent (${fmt(s.cbmCostPerUnit)}/CBM)`}
              value={fmt(s.totalCost)}
              valueColor="#EF4444"
            />
          </View>

          {/* Per-container breakdown */}
          {containers.length > 0 && (
            <View style={styles.breakdown}>
              <Text style={styles.breakdownTitle}>Par conteneur</Text>
              {containers
                .sort((a, b) => b.profit - a.profit)
                .slice(0, 5)
                .map((c) => (
                  <View key={c.containerId} style={styles.containerRow}>
                    <View style={styles.containerLeft}>
                      <Text style={styles.containerNumber} numberOfLines={1}>
                        {c.containerNumber}
                      </Text>
                      <Text style={styles.containerMeta}>
                        {c.totalCBM.toFixed(2)} CBM · {c.goodsCount} colis
                      </Text>
                    </View>
                    <View style={styles.containerRight}>
                      <Text
                        style={[
                          styles.containerProfit,
                          { color: c.profit >= 0 ? '#10B981' : '#EF4444' },
                        ]}
                      >
                        {c.profit >= 0 ? '+' : ''}{fmt(c.profit)}
                      </Text>
                      <Text style={styles.containerMargin}>
                        {c.profitMargin.toFixed(1)}%
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
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
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  marginBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  marginText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  profitBox: {
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  profitLabel: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: Theme.neutral[500],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  profitValue: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    fontWeight: '800',
  },
  profitSub: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 4,
  },
  metrics: {
    gap: 10,
    marginBottom: 14,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Theme.neutral[500],
    flex: 1,
  },
  metricValue: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: Theme.neutral[100],
  },
  breakdown: {
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
    paddingTop: 14,
    gap: 10,
  },
  breakdownTitle: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[400],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerLeft: {
    flex: 1,
  },
  containerNumber: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  containerMeta: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 1,
  },
  containerRight: {
    alignItems: 'flex-end',
  },
  containerProfit: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  containerMargin: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
  },
  emptyText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    textAlign: 'center',
    paddingVertical: 16,
  },
});
