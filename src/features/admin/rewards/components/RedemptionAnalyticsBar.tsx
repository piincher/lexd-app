/**
 * RedemptionAnalyticsBar — compact analytics summary for the Échanges produits
 * screen: headline KPIs + the most-redeemed items, from the backend aggregation.
 */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { useAdminRedemptionAnalytics } from '../hooks/useAdminRewards';

const frenchInt = (n: number) => (n || 0).toLocaleString('fr-FR');

export const RedemptionAnalyticsBar: React.FC = () => {
  const { colors } = useAppTheme();
  const { data, isLoading } = useAdminRedemptionAnalytics();

  if (isLoading || !data) {
    return null;
  }

  const { totals, topItems } = data;
  const kpis = [
    { label: 'Demandes', value: frenchInt(totals.totalRequests), icon: 'cube-outline', tone: colors.primary.main },
    { label: 'En attente', value: frenchInt(totals.pendingCount), icon: 'time-outline', tone: colors.status.warning },
    { label: 'Collectés', value: frenchInt(totals.collectedCount), icon: 'checkmark-done-outline', tone: colors.status.success },
    { label: 'Points dépensés', value: frenchInt(totals.fulfilledPoints), icon: 'star-outline', tone: colors.accent.goldDark },
  ] as const;

  return (
    <View style={styles.wrap}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.kpiRow}>
        {kpis.map((kpi) => (
          <View key={kpi.label} style={[styles.kpiCard, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
            <Ionicons name={kpi.icon as any} size={16} color={kpi.tone} />
            <Text style={[styles.kpiValue, { color: colors.text.primary }]}>{kpi.value}</Text>
            <Text style={[styles.kpiLabel, { color: colors.text.secondary }]}>{kpi.label}</Text>
          </View>
        ))}
      </ScrollView>

      {topItems.length > 0 ? (
        <View style={[styles.topCard, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
          <Text style={[styles.topTitle, { color: colors.text.secondary }]}>Articles les plus échangés</Text>
          {topItems.slice(0, 3).map((item, i) => (
            <View key={item.rewardItemId} style={styles.topRow}>
              <Text style={[styles.topRank, { color: colors.accent.goldDark }]}>{i + 1}</Text>
              <Text style={[styles.topName, { color: colors.text.primary }]} numberOfLines={1}>{item.name}</Text>
              <Text style={[styles.topCount, { color: colors.text.secondary }]}>×{frenchInt(item.count)}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { gap: 10, paddingTop: 10 },
  kpiRow: { paddingHorizontal: 16, gap: 8 },
  kpiCard: { minWidth: 104, borderRadius: 12, borderWidth: 1, padding: 10, gap: 3 },
  kpiValue: { fontFamily: Fonts.bold, fontSize: 18 },
  kpiLabel: { fontFamily: Fonts.medium, fontSize: 11 },
  topCard: { marginHorizontal: 16, borderRadius: 12, borderWidth: 1, padding: 12, gap: 8 },
  topTitle: { fontFamily: Fonts.bold, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.4 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  topRank: { fontFamily: Fonts.bold, fontSize: 13, width: 16 },
  topName: { flex: 1, fontFamily: Fonts.medium, fontSize: 13 },
  topCount: { fontFamily: Fonts.bold, fontSize: 12 },
});

export default RedemptionAnalyticsBar;
