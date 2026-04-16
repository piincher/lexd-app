/**
 * Container Utilization Chart
 * Displays container capacity usage with pie/bar charts
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Svg, { Circle, G, Text as SvgText, Rect } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerUtilizationItem, ShippingLineStats } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// TYPES
// ============================================

interface ContainerUtilizationChartProps {
  containers: ContainerUtilizationItem[];
  byShippingLine: Record<string, ShippingLineStats>;
  avgFillRate: number;
}

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
  textPrimaryColor: string;
  textSecondaryColor: string;
  trackColor: string;
}

// ============================================
// DONUT CHART COMPONENT
// ============================================

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 150,
  strokeWidth = 20,
  textPrimaryColor,
  textSecondaryColor,
  trackColor,
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeValue = 0;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <View style={staticStyles.donutContainer}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />

        {/* Data segments */}
        {data.map((item, index) => {
          const percentage = item.value / total;
          const strokeDasharray = `${circumference * percentage} ${circumference}`;
          const rotation = (cumulativeValue / total) * 360;
          cumulativeValue += item.value;

          return (
            <Circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              transform={`rotate(${rotation - 90} ${center} ${center})`}
              strokeLinecap="round"
            />
          );
        })}

        {/* Center text */}
        <SvgText
          x={center}
          y={center - 5}
          fontSize={14}
          fontWeight="bold"
          fill={textPrimaryColor}
          textAnchor="middle"
        >
          {data.length}
        </SvgText>
        <SvgText
          x={center}
          y={center + 12}
          fontSize={10}
          fill={textSecondaryColor}
          textAnchor="middle"
        >
          Conteneurs
        </SvgText>
      </Svg>
    </View>
  );
};

// ============================================
// UTILIZATION BAR COMPONENT
// ============================================

interface UtilizationBarProps {
  label: string;
  percentage: number;
  color: string;
  count?: number;
  labelColor: string;
  countColor: string;
  trackColor: string;
}

const UtilizationBar: React.FC<UtilizationBarProps> = ({
  label,
  percentage,
  color,
  count,
  labelColor,
  countColor,
  trackColor,
}) => {
  return (
    <View style={staticStyles.utilizationItem}>
      <View style={staticStyles.utilizationHeader}>
        <Text style={[staticStyles.utilizationLabel, { color: labelColor }]}>{label}</Text>
        {count !== undefined && (
          <Text style={[staticStyles.utilizationCount, { color: countColor }]}>
            {count} conteneurs
          </Text>
        )}
      </View>
      <View style={staticStyles.barContainer}>
        <View style={[staticStyles.barBackground, { backgroundColor: trackColor }]}>
          <View
            style={[
              staticStyles.barFill,
              { width: `${Math.min(percentage, 100)}%`, backgroundColor: color },
            ]}
          />
        </View>
        <Text style={[staticStyles.barPercentage, { color }]}>
          {percentage.toFixed(1)}%
        </Text>
      </View>
    </View>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const ContainerUtilizationChart: React.FC<ContainerUtilizationChartProps> = ({
  containers,
  byShippingLine,
  avgFillRate,
}) => {
  const { colors } = useAppTheme();

  const textPrimary    = colors.text.primary;
  const textSecondary  = colors.text.secondary;
  const trackColor     = colors.neutral[200];
  const dividerColor   = colors.neutral[100];

  // Calculate utilization categories
  const highUtilization   = containers.filter((c) => c.utilization.cbmPercentage >= 80).length;
  const mediumUtilization = containers.filter(
    (c) => c.utilization.cbmPercentage >= 50 && c.utilization.cbmPercentage < 80
  ).length;
  const lowUtilization    = containers.filter((c) => c.utilization.cbmPercentage < 50).length;

  const donutData = [
    { label: 'Élevée (≥80%)',    value: highUtilization,   color: '#10B981' },
    { label: 'Moyenne (50-79%)', value: mediumUtilization, color: '#F59E0B' },
    { label: 'Faible (<50%)',    value: lowUtilization,    color: '#EF4444' },
  ].filter((d) => d.value > 0);

  const shippingLineColors: Record<string, string> = {
    MSC:          '#1E40AF',
    MAERSK:       '#E11D48',
    CMA_CGM:      '#059669',
    HAPAG_LLOYD:  '#D97706',
    AIR:          '#7C3AED',
  };

  return (
    <View style={staticStyles.container}>
      {/* Summary Card */}
      <Card style={staticStyles.summaryCard}>
        <Card.Content>
          <View style={staticStyles.summaryRow}>
            <View style={staticStyles.summaryItem}>
              <MaterialCommunityIcons name="package-variant" size={24} color="#3B82F6" />
              <Text style={[staticStyles.summaryValue, { color: textPrimary }]}>
                {containers.length}
              </Text>
              <Text style={[staticStyles.summaryLabel, { color: textSecondary }]}>Total</Text>
            </View>
            <View style={[staticStyles.summaryDivider, { backgroundColor: trackColor }]} />
            <View style={staticStyles.summaryItem}>
              <MaterialCommunityIcons name="gauge" size={24} color="#10B981" />
              <Text style={[staticStyles.summaryValue, { color: textPrimary }]}>
                {avgFillRate.toFixed(1)}%
              </Text>
              <Text style={[staticStyles.summaryLabel, { color: textSecondary }]}>Remplissage</Text>
            </View>
            <View style={[staticStyles.summaryDivider, { backgroundColor: trackColor }]} />
            <View style={staticStyles.summaryItem}>
              <MaterialCommunityIcons name="truck-check" size={24} color="#F59E0B" />
              <Text style={[staticStyles.summaryValue, { color: textPrimary }]}>
                {containers.filter((c) => c.status === 'IN_TRANSIT').length}
              </Text>
              <Text style={[staticStyles.summaryLabel, { color: textSecondary }]}>En Transit</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Charts Row */}
      <View style={staticStyles.chartsRow}>
        {/* Donut Chart */}
        <Card style={staticStyles.chartCard}>
          <Card.Content>
            <Text style={[staticStyles.chartTitle, { color: textPrimary }]}>Utilisation</Text>
            <DonutChart
              data={donutData}
              size={140}
              strokeWidth={18}
              textPrimaryColor={textPrimary}
              textSecondaryColor={textSecondary}
              trackColor={trackColor}
            />
            <View style={staticStyles.donutLegend}>
              {donutData.map((item, index) => (
                <View key={index} style={staticStyles.donutLegendItem}>
                  <View style={[staticStyles.donutLegendDot, { backgroundColor: item.color }]} />
                  <Text style={[staticStyles.donutLegendText, { color: textSecondary }]}>
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* By Shipping Line */}
        <Card style={[staticStyles.chartCard, staticStyles.flex1]}>
          <Card.Content>
            <Text style={[staticStyles.chartTitle, { color: textPrimary }]}>Par Compagnie</Text>
            <View style={staticStyles.shippingLinesList}>
              {Object.entries(byShippingLine).map(([line, stats]) => (
                <UtilizationBar
                  key={line}
                  label={line}
                  percentage={stats.avgFillRate}
                  color={shippingLineColors[line] || '#6B7280'}
                  count={stats.containers}
                  labelColor={textPrimary}
                  countColor={textSecondary}
                  trackColor={trackColor}
                />
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Recent Containers */}
      <Card style={staticStyles.listCard}>
        <Card.Content>
          <Text style={[staticStyles.chartTitle, { color: textPrimary }]}>Conteneurs Récents</Text>
          {containers.slice(0, 5).map((container) => (
            <View
              key={container.containerId}
              style={[staticStyles.containerItem, { borderBottomColor: dividerColor }]}
            >
              <View style={staticStyles.containerInfo}>
                <View style={staticStyles.containerNumberContainer}>
                  <MaterialCommunityIcons
                    name={container.shippingMode === 'AIR' ? 'airplane' : 'ferry'}
                    size={16}
                    color={textSecondary}
                  />
                  <Text style={[staticStyles.containerNumber, { color: textPrimary }]}>
                    {container.containerNumber}
                  </Text>
                </View>
                <Text style={[staticStyles.containerStatus, { color: textSecondary }]}>
                  {container.status}
                </Text>
              </View>
              <View style={staticStyles.containerMetrics}>
                <View style={staticStyles.metricItem}>
                  <Text style={[staticStyles.metricValue, { color: textPrimary }]}>
                    {container.utilization.cbmPercentage.toFixed(0)}%
                  </Text>
                  <Text style={[staticStyles.metricLabel, { color: textSecondary }]}>CBM</Text>
                </View>
                <View style={staticStyles.metricItem}>
                  <Text style={[staticStyles.metricValue, { color: textPrimary }]}>
                    {container.metrics.goodsCount}
                  </Text>
                  <Text style={[staticStyles.metricLabel, { color: textSecondary }]}>March.</Text>
                </View>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>
    </View>
  );
};

// ============================================
// STATIC STYLES (layout only — no color values)
// ============================================

const staticStyles = StyleSheet.create({
  container:              { gap: 12 },
  summaryCard:            { borderRadius: 12, elevation: 2 },
  summaryRow:             { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 8 },
  summaryItem:            { alignItems: 'center', flex: 1 },
  summaryValue:           { fontSize: 20, fontWeight: '700', marginTop: 4 },
  summaryLabel:           { fontSize: 12, marginTop: 2 },
  summaryDivider:         { width: 1, height: 40 },
  chartsRow:              { flexDirection: 'row', gap: 12 },
  chartCard:              { flex: 1, borderRadius: 12, elevation: 2 },
  flex1:                  { flex: 1.5 },
  chartTitle:             { fontSize: 14, fontWeight: '600', marginBottom: 12 },
  donutContainer:         { alignItems: 'center' },
  donutLegend:            { marginTop: 12, gap: 6 },
  donutLegendItem:        { flexDirection: 'row', alignItems: 'center', gap: 6 },
  donutLegendDot:         { width: 8, height: 8, borderRadius: 4 },
  donutLegendText:        { fontSize: 11 },
  shippingLinesList:      { gap: 12 },
  utilizationItem:        { gap: 6 },
  utilizationHeader:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  utilizationLabel:       { fontSize: 12, fontWeight: '600' },
  utilizationCount:       { fontSize: 11 },
  barContainer:           { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barBackground:          { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  barFill:                { height: '100%', borderRadius: 4 },
  barPercentage:          { fontSize: 12, fontWeight: '600', minWidth: 45, textAlign: 'right' },
  listCard:               { borderRadius: 12, elevation: 2 },
  containerItem:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1 },
  containerInfo:          { flex: 1 },
  containerNumberContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  containerNumber:        { fontSize: 13, fontWeight: '600' },
  containerStatus:        { fontSize: 11, marginTop: 2 },
  containerMetrics:       { flexDirection: 'row', gap: 16 },
  metricItem:             { alignItems: 'center' },
  metricValue:            { fontSize: 13, fontWeight: '700' },
  metricLabel:            { fontSize: 10 },
});

export default ContainerUtilizationChart;
