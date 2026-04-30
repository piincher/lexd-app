/**
 * Container Utilization Chart
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerUtilizationItem, ShippingLineStats } from '../../types';
import { DonutChart } from './DonutChart';
import { UtilizationBar } from './UtilizationBar';
import { RecentContainersList } from './RecentContainersList';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ContainerUtilizationChartProps {
  containers: ContainerUtilizationItem[];
  byShippingLine: Record<string, ShippingLineStats>;
  avgFillRate: number;
}

const shippingLineColors: Record<string, string> = {
  MSC: '#1E40AF',
  MAERSK: '#E11D48',
  CMA_CGM: '#059669',
  HAPAG_LLOYD: '#D97706',
  AIR: '#7C3AED',
};

export const ContainerUtilizationChart: React.FC<ContainerUtilizationChartProps> = ({
  containers,
  byShippingLine,
  avgFillRate,
}) => {
  const { colors } = useAppTheme();
  const textPrimary = colors.text.primary;
  const textSecondary = colors.text.secondary;
  const trackColor = colors.neutral[200];
  const dividerColor = colors.neutral[100];

  const highUtilization = containers.filter((c) => c.utilization.cbmPercentage >= 80).length;
  const mediumUtilization = containers.filter((c) => c.utilization.cbmPercentage >= 50 && c.utilization.cbmPercentage < 80).length;
  const lowUtilization = containers.filter((c) => c.utilization.cbmPercentage < 50).length;

  const donutData = [
    { label: 'Élevée (≥80%)', value: highUtilization, color: '#10B981' },
    { label: 'Moyenne (50-79%)', value: mediumUtilization, color: '#F59E0B' },
    { label: 'Faible (<50%)', value: lowUtilization, color: '#EF4444' },
  ].filter((d) => d.value > 0);

  return (
    <View style={staticStyles.container}>
      <Card style={staticStyles.summaryCard}>
        <Card.Content>
          <View style={staticStyles.summaryRow}>
            <View style={staticStyles.summaryItem}>
              <MaterialCommunityIcons name="package-variant" size={24} color="#3B82F6" />
              <Text style={[staticStyles.summaryValue, { color: textPrimary }]}>{containers.length}</Text>
              <Text style={[staticStyles.summaryLabel, { color: textSecondary }]}>Total</Text>
            </View>
            <View style={[staticStyles.summaryDivider, { backgroundColor: trackColor }]} />
            <View style={staticStyles.summaryItem}>
              <MaterialCommunityIcons name="gauge" size={24} color="#10B981" />
              <Text style={[staticStyles.summaryValue, { color: textPrimary }]}>{avgFillRate.toFixed(1)}%</Text>
              <Text style={[staticStyles.summaryLabel, { color: textSecondary }]}>Remplissage</Text>
            </View>
            <View style={[staticStyles.summaryDivider, { backgroundColor: trackColor }]} />
            <View style={staticStyles.summaryItem}>
              <MaterialCommunityIcons name="truck-check" size={24} color="#F59E0B" />
              <Text style={[staticStyles.summaryValue, { color: textPrimary }]}>{containers.filter((c) => c.status === 'IN_TRANSIT').length}</Text>
              <Text style={[staticStyles.summaryLabel, { color: textSecondary }]}>En Transit</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={staticStyles.chartsRow}>
        <Card style={staticStyles.chartCard}>
          <Card.Content>
            <Text style={[staticStyles.chartTitle, { color: textPrimary }]}>Utilisation</Text>
            <DonutChart data={donutData} size={140} strokeWidth={18} textPrimaryColor={textPrimary} textSecondaryColor={textSecondary} trackColor={trackColor} />
            <View style={staticStyles.donutLegend}>
              {donutData.map((item, index) => (
                <View key={index} style={staticStyles.donutLegendItem}>
                  <View style={[staticStyles.donutLegendDot, { backgroundColor: item.color }]} />
                  <Text style={[staticStyles.donutLegendText, { color: textSecondary }]}>{item.label}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card style={[staticStyles.chartCard, staticStyles.flex1]}>
          <Card.Content>
            <Text style={[staticStyles.chartTitle, { color: textPrimary }]}>Par Compagnie</Text>
            <View style={staticStyles.shippingLinesList}>
              {Object.entries(byShippingLine).map(([line, stats]) => (
                <UtilizationBar
                  key={line} label={line} percentage={stats.avgFillRate}
                  color={shippingLineColors[line] || '#6B7280'} count={stats.containers}
                  labelColor={textPrimary} countColor={textSecondary} trackColor={trackColor}
                />
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>

      <Card style={staticStyles.listCard}>
        <Card.Content>
          <Text style={[staticStyles.chartTitle, { color: textPrimary }]}>Conteneurs Récents</Text>
          <RecentContainersList
            containers={containers}
            textPrimaryColor={textPrimary}
            textSecondaryColor={textSecondary}
            dividerColor={dividerColor}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

const staticStyles = StyleSheet.create({
  container: { gap: 12 },
  summaryCard: { borderRadius: 12, elevation: 2 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 8 },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryValue: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  summaryLabel: { fontSize: 12, marginTop: 2 },
  summaryDivider: { width: 1, height: 40 },
  chartsRow: { flexDirection: 'row', gap: 12 },
  chartCard: { flex: 1, borderRadius: 12, elevation: 2 },
  flex1: { flex: 1.5 },
  chartTitle: { fontSize: 14, fontWeight: '600', marginBottom: 12 },
  donutLegend: { marginTop: 12, gap: 6 },
  donutLegendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  donutLegendDot: { width: 8, height: 8, borderRadius: 4 },
  donutLegendText: { fontSize: 11 },
  shippingLinesList: { gap: 12 },
  listCard: { borderRadius: 12, elevation: 2 },
});

export default ContainerUtilizationChart;
