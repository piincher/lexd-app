/**
 * RevenueChart Component
 * Simple line chart for revenue and expenses trends
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Svg, { Path, Circle, Line, G, Text as SvgText } from 'react-native-svg';
import { DailyTrendPoint } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface RevenueChartProps {
  data: DailyTrendPoint[];
  width?: number;
  height?: number;
  showLabels?: boolean;
}

const CHART_PADDING = { top: 20, right: 20, bottom: 30, left: 50 };

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  width = SCREEN_WIDTH - 32,
  height = 200,
  showLabels = true,
}) => {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text style={styles.noData}>Aucune donnée disponible</Text>
      </View>
    );
  }

  const chartWidth = width - CHART_PADDING.left - CHART_PADDING.right;
  const chartHeight = height - CHART_PADDING.top - CHART_PADDING.bottom;

  // Calculate scales
  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.revenue, d.expenses))
  ) * 1.1;

  const minValue = 0;

  const getX = (index: number) =>
    CHART_PADDING.left + (index / (data.length - 1)) * chartWidth;

  const getY = (value: number) =>
    CHART_PADDING.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

  // Generate path for revenue line
  const revenuePath = data
    .map((point, index) => {
      const x = getX(index);
      const y = getY(point.revenue);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Generate path for expenses line
  const expensesPath = data
    .map((point, index) => {
      const x = getX(index);
      const y = getY(point.expenses);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Generate area path for revenue
  const revenueAreaPath = `${revenuePath} L ${getX(data.length - 1)} ${
    CHART_PADDING.top + chartHeight
  } L ${CHART_PADDING.left} ${CHART_PADDING.top + chartHeight} Z`;

  // Y-axis labels
  const yLabels = [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue];

  // X-axis labels (show first, middle, last)
  const xLabelIndices = [0, Math.floor(data.length / 2), data.length - 1];

  const formatCurrency = (value: number) => {
    const v = value || 0;
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
    if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
    return v.toFixed(0);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Revenus</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>Dépenses</Text>
        </View>
      </View>

      <Svg width={width} height={height}>
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
              {showLabels && (
                <SvgText
                  x={CHART_PADDING.left - 8}
                  y={y + 4}
                  fontSize={10}
                  fill="#6B7280"
                  textAnchor="end"
                >
                  {formatCurrency(label)}
                </SvgText>
              )}
            </G>
          );
        })}

        {/* Revenue area (gradient effect) */}
        <Path
          d={revenueAreaPath}
          fill="rgba(16, 185, 129, 0.1)"
        />

        {/* Revenue line */}
        <Path
          d={revenuePath}
          fill="none"
          stroke="#10B981"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Expenses line */}
        <Path
          d={expensesPath}
          fill="none"
          stroke="#EF4444"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points - Revenue */}
        {data.map((point, index) => (
          <Circle
            key={`rev-point-${index}`}
            cx={getX(index)}
            cy={getY(point.revenue)}
            r={4}
            fill="#10B981"
            stroke="#FFFFFF"
            strokeWidth={2}
          />
        ))}

        {/* Data points - Expenses (every 3rd point) */}
        {data.filter((_, i) => i % 3 === 0).map((point, index) => (
          <Circle
            key={`exp-point-${index}`}
            cx={getX(index * 3)}
            cy={getY(point.expenses)}
            r={3}
            fill="#EF4444"
            stroke="#FFFFFF"
            strokeWidth={2}
          />
        ))}

        {/* X-axis labels */}
        {showLabels &&
          xLabelIndices.map((index) => (
            <SvgText
              key={`xlabel-${index}`}
              x={getX(index)}
              y={height - 8}
              fontSize={10}
              fill="#6B7280"
              textAnchor="middle"
            >
              {formatDate(data[index].date)}
            </SvgText>
          ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  noData: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 80,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 8,
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
    color: '#374151',
  },
});

export default RevenueChart;
