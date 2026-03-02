/**
 * PieChart Component
 * Simple pie/donut chart for breakdowns
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Svg, { Path, G, Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  width?: number;
  height?: number;
  donut?: boolean;
  showLabels?: boolean;
  centerText?: string;
  centerSubtext?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  width = SCREEN_WIDTH - 64,
  height = 200,
  donut = false,
  showLabels = true,
  centerText,
  centerSubtext,
}) => {
  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text style={styles.noData}>Aucune donnée</Text>
      </View>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = Math.min(width, height) / 2 - 10;
  const centerX = width / 2;
  const centerY = height / 2;
  const innerRadius = donut ? radius * 0.6 : 0;

  // Generate pie slices
  let currentAngle = -Math.PI / 2; // Start from top

  const slices = data.map((item) => {
    const percentage = item.value / total;
    const angle = percentage * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    // Calculate path
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = angle > Math.PI ? 1 : 0;

    let path;
    if (donut) {
      const ix1 = centerX + innerRadius * Math.cos(startAngle);
      const iy1 = centerY + innerRadius * Math.sin(startAngle);
      const ix2 = centerX + innerRadius * Math.cos(endAngle);
      const iy2 = centerY + innerRadius * Math.sin(endAngle);

      path = `
        M ${ix1} ${iy1}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        L ${ix2} ${iy2}
        A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${ix1} ${iy1}
        Z
      `;
    } else {
      path = `
        M ${centerX} ${centerY}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
      `;
    }

    return {
      path,
      color: item.color,
      label: item.label,
      value: item.value,
      percentage: percentage * 100,
    };
  });

  const formatCurrency = (value: number) => {
    const v = value || 0;
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
    if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
    return v.toLocaleString('fr-FR');
  };

  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.chartContainer, { height }]}>
        <Svg width={width} height={height}>
          <G>
            {slices.map((slice, index) => (
              <Path
                key={index}
                d={slice.path}
                fill={slice.color}
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            ))}
          </G>
        </Svg>

        {donut && centerText && (
          <View style={[styles.centerTextContainer, { top: height / 2 - 20 }]}>
            <Text style={styles.centerText}>{centerText}</Text>
            {centerSubtext && (
              <Text style={styles.centerSubtext}>{centerSubtext}</Text>
            )}
          </View>
        )}
      </View>

      {showLabels && (
        <View style={styles.legend}>
          {slices.map((slice, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: slice.color }]} />
              <View style={styles.legendTextContainer}>
                <Text style={styles.legendLabel} numberOfLines={1}>
                  {slice.label}
                </Text>
                <Text style={styles.legendValue}>
                  {formatCurrency(slice.value)} ({(slice.percentage || 0).toFixed(1)}%)
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chartContainer: {
    position: 'relative',
  },
  noData: {
    textAlign: 'center',
    color: '#6B7280',
  },
  centerTextContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  centerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  centerSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendTextContainer: {
    flexShrink: 1,
  },
  legendLabel: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  legendValue: {
    fontSize: 11,
    color: '#6B7280',
  },
});

export default PieChart;
