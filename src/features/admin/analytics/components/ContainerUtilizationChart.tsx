/**
 * Container Utilization Chart
 * Displays container capacity usage with pie/bar charts
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import Svg, { Circle, G, Text as SvgText, Rect } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
}

// ============================================
// DONUT CHART COMPONENT
// ============================================

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 150,
  strokeWidth = 20,
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  let cumulativeValue = 0;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <View style={styles.donutContainer}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
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
          fill="#1F2937"
          textAnchor="middle"
        >
          {data.length}
        </SvgText>
        <SvgText
          x={center}
          y={center + 12}
          fontSize={10}
          fill="#6B7280"
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
}

const UtilizationBar: React.FC<UtilizationBarProps> = ({
  label,
  percentage,
  color,
  count,
}) => {
  return (
    <View style={styles.utilizationItem}>
      <View style={styles.utilizationHeader}>
        <Text style={styles.utilizationLabel}>{label}</Text>
        {count !== undefined && (
          <Text style={styles.utilizationCount}>{count} conteneurs</Text>
        )}
      </View>
      <View style={styles.barContainer}>
        <View style={[styles.barBackground, { backgroundColor: '#E5E7EB' }]}>
          <View
            style={[
              styles.barFill,
              {
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>
        <Text style={[styles.barPercentage, { color }]}>
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
  const theme = useTheme();

  // Calculate utilization categories
  const highUtilization = containers.filter((c) => c.utilization.cbmPercentage >= 80).length;
  const mediumUtilization = containers.filter(
    (c) => c.utilization.cbmPercentage >= 50 && c.utilization.cbmPercentage < 80
  ).length;
  const lowUtilization = containers.filter((c) => c.utilization.cbmPercentage < 50).length;

  const donutData = [
    { label: 'Élevée (≥80%)', value: highUtilization, color: '#10B981' },
    { label: 'Moyenne (50-79%)', value: mediumUtilization, color: '#F59E0B' },
    { label: 'Faible (<50%)', value: lowUtilization, color: '#EF4444' },
  ].filter((d) => d.value > 0);

  // Shipping line colors
  const shippingLineColors: Record<string, string> = {
    MSC: '#1E40AF',
    MAERSK: '#E11D48',
    CMA_CGM: '#059669',
    HAPAG_LLOYD: '#D97706',
    AIR: '#7C3AED',
  };

  return (
    <View style={styles.container}>
      {/* Summary Card */}
      <Card style={styles.summaryCard}>
        <Card.Content>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="package-variant" size={24} color="#3B82F6" />
              <Text style={styles.summaryValue}>{containers.length}</Text>
              <Text style={styles.summaryLabel}>Total</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="gauge" size={24} color="#10B981" />
              <Text style={styles.summaryValue}>{avgFillRate.toFixed(1)}%</Text>
              <Text style={styles.summaryLabel}>Remplissage</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="truck-check" size={24} color="#F59E0B" />
              <Text style={styles.summaryValue}>
                {containers.filter((c) => c.status === 'IN_TRANSIT').length}
              </Text>
              <Text style={styles.summaryLabel}>En Transit</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Charts Row */}
      <View style={styles.chartsRow}>
        {/* Donut Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text style={styles.chartTitle}>Utilisation</Text>
            <DonutChart data={donutData} size={140} strokeWidth={18} />
            <View style={styles.donutLegend}>
              {donutData.map((item, index) => (
                <View key={index} style={styles.donutLegendItem}>
                  <View style={[styles.donutLegendDot, { backgroundColor: item.color }]} />
                  <Text style={styles.donutLegendText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* By Shipping Line */}
        <Card style={[styles.chartCard, styles.flex1]}>
          <Card.Content>
            <Text style={styles.chartTitle}>Par Compagnie</Text>
            <View style={styles.shippingLinesList}>
              {Object.entries(byShippingLine).map(([line, stats]) => (
                <UtilizationBar
                  key={line}
                  label={line}
                  percentage={stats.avgFillRate}
                  color={shippingLineColors[line] || '#6B7280'}
                  count={stats.containers}
                />
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Recent Containers */}
      <Card style={styles.listCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Conteneurs Récents</Text>
          {containers.slice(0, 5).map((container, index) => (
            <View key={container.containerId} style={styles.containerItem}>
              <View style={styles.containerInfo}>
                <View style={styles.containerNumberContainer}>
                  <MaterialCommunityIcons
                    name={container.shippingMode === 'AIR' ? 'airplane' : 'ferry'}
                    size={16}
                    color="#6B7280"
                  />
                  <Text style={styles.containerNumber}>
                    {container.containerNumber}
                  </Text>
                </View>
                <Text style={styles.containerStatus}>{container.status}</Text>
              </View>
              <View style={styles.containerMetrics}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>
                    {container.utilization.cbmPercentage.toFixed(0)}%
                  </Text>
                  <Text style={styles.metricLabel}>CBM</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>
                    {container.metrics.goodsCount}
                  </Text>
                  <Text style={styles.metricLabel}>March.</Text>
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
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  summaryCard: {
    borderRadius: 12,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  chartsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  chartCard: {
    flex: 1,
    borderRadius: 12,
    elevation: 2,
  },
  flex1: {
    flex: 1.5,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  donutContainer: {
    alignItems: 'center',
  },
  donutLegend: {
    marginTop: 12,
    gap: 6,
  },
  donutLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  donutLegendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  donutLegendText: {
    fontSize: 11,
    color: '#6B7280',
  },
  shippingLinesList: {
    gap: 12,
  },
  utilizationItem: {
    gap: 6,
  },
  utilizationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  utilizationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  utilizationCount: {
    fontSize: 11,
    color: '#6B7280',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barBackground: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  barPercentage: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 45,
    textAlign: 'right',
  },
  listCard: {
    borderRadius: 12,
    elevation: 2,
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  containerInfo: {
    flex: 1,
  },
  containerNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  containerNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  containerStatus: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  containerMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  metricLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
});

export default ContainerUtilizationChart;
