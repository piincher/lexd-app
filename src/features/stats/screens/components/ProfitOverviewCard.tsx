import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { ContainerProfitSummary } from '../../api/statsApi';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ProfitOverviewCardProps {
  profitSummary: ContainerProfitSummary | null;
  isLoading: boolean;
}

const fmt = (amount: number): string => {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M F`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K F`;
  return `${amount.toFixed(0)} F`;
};

export const ProfitOverviewCard: React.FC<ProfitOverviewCardProps> = ({
  profitSummary,
  isLoading,
}) => {
  const { colors } = useAppTheme();
  const s = profitSummary?.summary;
  const containers = profitSummary?.containers ?? [];

  const isProfit = (s?.totalProfit ?? 0) >= 0;
  const profitColor = isProfit ? colors.status.success : colors.status.error;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: colors.background.card,
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
          backgroundColor: colors.feedback.successBg,
          justifyContent: 'center',
          alignItems: 'center',
        },
        title: {
          flex: 1,
          fontSize: 15,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.primary,
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
          color: colors.text.secondary,
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
          color: colors.text.disabled,
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
          color: colors.text.secondary,
          flex: 1,
        },
        metricValue: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          fontWeight: '700',
        },
        divider: {
          height: 1,
          backgroundColor: colors.border,
        },
        breakdown: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingTop: 14,
          gap: 10,
        },
        breakdownTitle: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.disabled,
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
          color: colors.text.primary,
        },
        containerMeta: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.disabled,
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
          color: colors.text.disabled,
        },
        emptyText: {
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: colors.text.disabled,
          textAlign: 'center',
          paddingVertical: 16,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="trending-up" size={18} color={colors.status.success} />
        </View>
        <Text style={styles.title}>Rentabilité Globale CBM</Text>
        {!isLoading && s && (
          <View style={[styles.marginBadge, { backgroundColor: isProfit ? colors.feedback.successBg : colors.feedback.errorBg }]}>
            <Text style={[styles.marginText, { color: profitColor }]}>
              {isProfit ? '+' : ''}{s.overallMargin.toFixed(1)}%
            </Text>
          </View>
        )}
      </View>

      {isLoading ? (
        <View style={{ gap: 12, paddingVertical: 8 }}>
          <ShimmerBlock width={'100%'} height={80} borderRadius={12} />
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <ShimmerBlock width={120} height={14} borderRadius={3} />
              <ShimmerBlock width={80} height={14} borderRadius={3} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <ShimmerBlock width={100} height={14} borderRadius={3} />
              <ShimmerBlock width={70} height={14} borderRadius={3} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <ShimmerBlock width={140} height={14} borderRadius={3} />
              <ShimmerBlock width={60} height={14} borderRadius={3} />
            </View>
          </View>
        </View>
      ) : !s ? (
        <Text style={styles.emptyText}>Aucune donnée disponible</Text>
      ) : (
        <>
          {/* Big profit number */}
          <View style={[styles.profitBox, { backgroundColor: isProfit ? colors.feedback.successBg : colors.feedback.errorBg }]}>
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
            <View style={styles.metricRow}>
              <View style={styles.metricLeft}>
                <Ionicons name="cash-outline" size={14} color={colors.text.disabled} style={{ marginRight: 6 }} />
                <Text style={styles.metricLabel}>Chiffre d'affaires</Text>
              </View>
              <Text style={[styles.metricValue, { color: colors.text.primary }]}>{fmt(s.totalRevenue)}</Text>
            </View>
            <View style={styles.metricRow}>
              <View style={styles.metricLeft}>
                <Ionicons name="checkmark-circle-outline" size={14} color={colors.text.disabled} style={{ marginRight: 6 }} />
                <Text style={styles.metricLabel}>Encaissé</Text>
              </View>
              <Text style={[styles.metricValue, { color: colors.status.success }]}>{fmt(s.totalCollected)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.metricRow}>
              <View style={styles.metricLeft}>
                <Ionicons name="boat-outline" size={14} color={colors.text.disabled} style={{ marginRight: 6 }} />
                <Text style={styles.metricLabel}>{`Coût agent (${fmt(s.cbmCostPerUnit)}/CBM)`}</Text>
              </View>
              <Text style={[styles.metricValue, { color: colors.status.error }]}>{fmt(s.totalCost)}</Text>
            </View>
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
                          { color: c.profit >= 0 ? colors.status.success : colors.status.error },
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
