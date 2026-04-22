/**
 * Revenue Chart Component
 * Line chart for revenue trends with period comparison
 */

import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, useTheme, Chip } from 'react-native-paper';
import Svg, { Path, Circle, Line, G, Text as SvgText, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Theme } from '@src/constants/Theme';
import { RevenueTrendPoint, GrowthComparison } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// TYPES
// ============================================

interface RevenueChartProps {
  data: RevenueTrendPoint[];
  comparisonData?: RevenueTrendPoint[];
  growth?: GrowthComparison;
  width?: number;
  height?: number;
  showComparison?: boolean;
  onPeriodChange?: (period: 'day' | 'week' | 'month') => void;
}

type PeriodType = 'day' | 'week' | 'month';

// ============================================
// MAIN COMPONENT
// ============================================

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  comparisonData,
  growth,
  width = SCREEN_WIDTH - 32,
  height = 250,
  showComparison = false,
  onPeriodChange,
}) => {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('day');
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  const CHART_PADDING = { top: 40, right: 20, bottom: 40, left: 60 };
  const chartWidth = width - CHART_PADDING.left - CHART_PADDING.right;
  const chartHeight = height - CHART_PADDING.top - CHART_PADDING.bottom;

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text style={styles.noData}>Aucune donnée disponible</Text>
      </View>
    );
  }

  // Calculate scales
  const allValues = showComparison && comparisonData
    ? [...data.map((d) => d.revenueFCFA), ...comparisonData.map((d) => d.revenueFCFA)]
    : data.map((d) => d.revenueFCFA);
  
  const maxValue = Math.max(...allValues) * 1.1;
  const minValue = 0;

  const getX = (index: number) =>
    CHART_PADDING.left + (index / (data.length - 1)) * chartWidth;

  const getY = (value: number) =>
    CHART_PADDING.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

  // Generate paths
  const currentPath = data
    .map((point, index) => {
      const x = getX(index);
      const y = getY(point.revenueFCFA);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const comparisonPath = comparisonData
    ? comparisonData
        .map((point, index) => {
          const x = getX(index);
          const y = getY(point.revenueFCFA);
          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        })
        .join(' ')
    : '';

  // Area path for gradient fill
  const areaPath = `${currentPath} L ${getX(data.length - 1)} ${CHART_PADDING.top + chartHeight} L ${CHART_PADDING.left} ${CHART_PADDING.top + chartHeight} Z`;

  // Y-axis labels
  const yLabels = [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue];

  // X-axis labels (show fewer labels for readability)
  const xLabelStep = Math.max(1, Math.floor(data.length / 6));
  const xLabelIndices = data
    .map((_, i) => i)
    .filter((i) => i % xLabelStep === 0 || i === data.length - 1);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toFixed(0);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
    onPeriodChange?.(period);
  };

  const periods: { key: PeriodType; label: string }[] = [
    { key: 'day', label: 'Jour' },
    { key: 'week', label: 'Semaine' },
    { key: 'month', label: 'Mois' },
  ];

  return (
    <View style={[styles.container, { width }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Tendance des Revenus</Text>
        {growth && (
          <View style={[styles.growthBadge, { backgroundColor: growth.revenueGrowth >= 0 ? '#DCFCE7' : '#FEE2E2' }]}>
            <Text style={[styles.growthText, { color: growth.revenueGrowth >= 0 ? '#166534' : '#991B1B' }]}>
              {growth.revenueGrowth >= 0 ? '+' : ''}{growth.revenueGrowth.toFixed(1)}%
            </Text>
          </View>
        )}
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.key}
            onPress={() => handlePeriodChange(period.key)}
            style={[
              styles.periodButton,
              selectedPeriod === period.key && { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period.key && { color: '#FFFFFF' },
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Période actuelle</Text>
        </View>
        {showComparison && comparisonData && (
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#9CA3AF' }]} />
            <Text style={styles.legendText}>Période précédente</Text>
          </View>
        )}
      </View>

      {/* Chart */}
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#10B981" stopOpacity="0.3" />
            <Stop offset="1" stopColor="#10B981" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Grid lines */}
        {yLabels.map((label, index) => {
          const y = getY(label);
          return (
            <G key={`grid-${index}`}>
              <Line
                x1={CHART_PADDING.left}
                y1={y}
                x2={width - CHART_PADDING.right}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
              <SvgText
                x={CHART_PADDING.left - 8}
                y={y + 4}
                fontSize={10}
                fill="#6B7280"
                textAnchor="end"
              >
                {formatCurrency(label)}
              </SvgText>
            </G>
          );
        })}

        {/* Comparison line */}
        {showComparison && comparisonData && (
          <Path
            d={comparisonPath}
            fill="none"
            stroke="#9CA3AF"
            strokeWidth={2}
            strokeDasharray="5,5"
          />
        )}

        {/* Area fill */}
        <Path d={areaPath} fill="url(#areaGradient)" />

        {/* Current line */}
        <Path
          d={currentPath}
          fill="none"
          stroke="#10B981"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points and tooltip areas */}
        {data.map((point, index) => {
          const x = getX(index);
          const y = getY(point.revenueFCFA);
          const isActive = tooltipIndex === index;

          return (
            <G key={`point-${index}`}>
              {/* Invisible touch area */}
              <Rect
                x={x - 15}
                y={CHART_PADDING.top}
                width={30}
                height={chartHeight}
                fill="transparent"
                onPressIn={() => setTooltipIndex(index)}
                onPressOut={() => setTooltipIndex(null)}
              />
              
              {/* Data point */}
              <Circle
                cx={x}
                cy={y}
                r={isActive ? 6 : 4}
                fill="#10B981"
                stroke="#FFFFFF"
                strokeWidth={isActive ? 3 : 2}
              />

              {/* Tooltip */}
              {isActive && (
                <G>
                  <Rect
                    x={x - 50}
                    y={y - 50}
                    width={100}
                    height={40}
                    fill="#1F2937"
                    rx={8}
                  />
                  <SvgText
                    x={x}
                    y={y - 30}
                    fontSize={10}
                    fill="#FFFFFF"
                    textAnchor="middle"
                  >
                    {formatDate(point.period)}
                  </SvgText>
                  <SvgText
                    x={x}
                    y={y - 18}
                    fontSize={12}
                    fill="#10B981"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {formatCurrency(point.revenueFCFA)} FCFA
                  </SvgText>
                </G>
              )}
            </G>
          );
        })}

        {/* X-axis labels */}
        {xLabelIndices.map((index) => (
          <SvgText
            key={`xlabel-${index}`}
            x={getX(index)}
            y={height - 10}
            fontSize={10}
            fill="#6B7280"
            textAnchor="middle"
          >
            {formatDate(data[index].period)}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  growthBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  growthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.neutral[100],
  },
  periodButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  noData: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 100,
  },
});

export default RevenueChart;
