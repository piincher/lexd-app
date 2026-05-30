/**
 * ContainerAnalyticsScreen — fleet-wide intelligence dashboard.
 *
 * Aggregates the cached container list ({@link buildContainerAnalytics}) into
 * KPI cards, a fill-rate distribution, route performance and a delay-risk
 * summary. Read-only; tapping a route is informational only.
 */
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGetAllContainers } from '../hooks';
import { CONTAINER_STATUS_LABELS, type Container, type ContainerStatus } from '../types';
import { buildContainerAnalytics } from './hooks/containerAnalytics';

const money = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} FCFA`;

export const ContainerAnalyticsScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const { data, isLoading } = useGetAllContainers();

  const containers: Container[] = useMemo(() => {
    const responseData = data?.data;
    if (Array.isArray(responseData)) return responseData;
    return responseData?.containers ?? [];
  }, [data]);

  const analytics = useMemo(() => buildContainerAnalytics(containers), [containers]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: colors.background.default }]}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  const kpis = [
    { label: 'Containers', value: analytics.total.toString(), icon: 'cube', tone: colors.primary[600] },
    { label: 'Actifs', value: analytics.active.toString(), icon: 'sync', tone: colors.status.info },
    { label: 'Remplissage moy.', value: `${analytics.avgFillPercentage.toFixed(0)}%`, icon: 'speedometer', tone: colors.status.success },
    { label: 'Sous-utilisés', value: analytics.underUtilizedCount.toString(), icon: 'trending-down', tone: colors.status.warning },
    { label: 'À risque', value: analytics.atRiskCount.toString(), icon: 'alert-circle', tone: colors.status.error },
    { label: 'Ponctualité', value: `${analytics.onTimeRate.toFixed(0)}%`, icon: 'time', tone: colors.status.success },
  ] as const;

  const maxBucket = Math.max(...analytics.fillBuckets.map((b) => b.count), 1);
  const bucketColors = [colors.status.error, colors.status.warning, colors.status.info, colors.status.success];

  const statusEntries = (Object.entries(analytics.statusCounts) as [ContainerStatus, number][])
    .sort((a, b) => b[1] - a[1]);
  const maxStatus = Math.max(...statusEntries.map(([, n]) => n), 1);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background.default }]}>
      <View style={styles.header}>
        <Ionicons name="bar-chart" size={22} color={colors.primary[600]} />
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Analyse des containers</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* KPI grid */}
        <View style={styles.kpiGrid}>
          {kpis.map((kpi) => (
            <View key={kpi.label} style={[styles.kpiCard, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
              <Ionicons name={kpi.icon as any} size={18} color={kpi.tone} />
              <Text style={[styles.kpiValue, { color: colors.text.primary }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: colors.text.secondary }]}>{kpi.label}</Text>
            </View>
          ))}
        </View>

        {/* Financials */}
        <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Performance financière</Text>
          <View style={styles.finRow}>
            <View style={styles.finItem}>
              <Text style={[styles.finValue, { color: colors.text.primary }]}>{money(analytics.totalRevenue)}</Text>
              <Text style={[styles.finLabel, { color: colors.text.secondary }]}>Revenu total</Text>
            </View>
            <View style={styles.finItem}>
              <Text style={[styles.finValue, { color: analytics.totalProfit >= 0 ? colors.status.success : colors.status.error }]}>
                {money(analytics.totalProfit)}
              </Text>
              <Text style={[styles.finLabel, { color: colors.text.secondary }]}>Profit total</Text>
            </View>
            <View style={styles.finItem}>
              <Text style={[styles.finValue, { color: colors.text.primary }]}>{analytics.avgProfitMargin.toFixed(1)}%</Text>
              <Text style={[styles.finLabel, { color: colors.text.secondary }]}>Marge moyenne</Text>
            </View>
          </View>
        </View>

        {/* Fill distribution */}
        <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Répartition du remplissage</Text>
          {analytics.fillBuckets.map((bucket, i) => (
            <View key={bucket.label} style={styles.barRow}>
              <Text style={[styles.barLabel, { color: colors.text.secondary }]}>{bucket.label}</Text>
              <View style={[styles.barTrack, { backgroundColor: colors.neutral[200] }]}>
                <View style={[styles.barFill, { width: `${(bucket.count / maxBucket) * 100}%`, backgroundColor: bucketColors[i] }]} />
              </View>
              <Text style={[styles.barValue, { color: colors.text.primary }]}>{bucket.count}</Text>
            </View>
          ))}
          <Text style={[styles.hint, { color: colors.text.secondary }]}>
            SEA · {analytics.modeSplit.sea} · AIR · {analytics.modeSplit.air}
          </Text>
        </View>

        {/* Status breakdown */}
        <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Par statut</Text>
          {statusEntries.map(([status, count]) => (
            <View key={status} style={styles.barRow}>
              <Text style={[styles.barLabelWide, { color: colors.text.secondary }]} numberOfLines={1}>
                {CONTAINER_STATUS_LABELS[status]}
              </Text>
              <View style={[styles.barTrack, { backgroundColor: colors.neutral[200] }]}>
                <View style={[styles.barFill, { width: `${(count / maxStatus) * 100}%`, backgroundColor: colors.primary[600] }]} />
              </View>
              <Text style={[styles.barValue, { color: colors.text.primary }]}>{count}</Text>
            </View>
          ))}
        </View>

        {/* Route performance */}
        <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Performance par route</Text>
          {analytics.routes.length === 0 ? (
            <Text style={[styles.hint, { color: colors.text.secondary }]}>Aucune donnée de route.</Text>
          ) : (
            analytics.routes.map((route) => (
              <View key={route.routeId} style={[styles.routeRow, { borderTopColor: colors.border }]}>
                <View style={styles.routeMain}>
                  <Text style={[styles.routeName, { color: colors.text.primary }]} numberOfLines={1}>{route.name}</Text>
                  <Text style={[styles.routeMeta, { color: colors.text.secondary }]}>
                    {route.containerCount} container{route.containerCount > 1 ? 's' : ''} · {route.avgFillPercentage.toFixed(0)}% rempli
                    {route.lateCount > 0 ? ` · ${route.lateCount} en retard` : ''}
                  </Text>
                </View>
                <Text style={[styles.routeProfit, { color: route.totalProfit >= 0 ? colors.status.success : colors.status.error }]}>
                  {money(route.totalProfit)}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  headerTitle: { fontSize: 20, fontWeight: '900' },
  content: { paddingHorizontal: 16, paddingBottom: 32, gap: 14 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  kpiCard: { width: '31.8%', minHeight: 78, borderRadius: 8, borderWidth: 1, padding: 10, justifyContent: 'space-between' },
  kpiValue: { fontSize: 18, fontWeight: '900' },
  kpiLabel: { fontSize: 11, fontWeight: '600' },
  card: { borderRadius: 8, borderWidth: 1, padding: 14 },
  cardTitle: { fontSize: 15, fontWeight: '800', marginBottom: 12 },
  finRow: { flexDirection: 'row', gap: 8 },
  finItem: { flex: 1 },
  finValue: { fontSize: 15, fontWeight: '900' },
  finLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 9 },
  barLabel: { width: 56, fontSize: 12, fontWeight: '700' },
  barLabelWide: { width: 120, fontSize: 12, fontWeight: '700' },
  barTrack: { flex: 1, height: 12, borderRadius: 6, overflow: 'hidden' },
  barFill: { height: 12, borderRadius: 6 },
  barValue: { width: 28, textAlign: 'right', fontSize: 12, fontWeight: '800' },
  hint: { fontSize: 12, fontWeight: '600', marginTop: 4 },
  routeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, paddingVertical: 10, borderTopWidth: StyleSheet.hairlineWidth },
  routeMain: { flex: 1 },
  routeName: { fontSize: 14, fontWeight: '800' },
  routeMeta: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  routeProfit: { fontSize: 13, fontWeight: '800' },
});

export default ContainerAnalyticsScreen;
