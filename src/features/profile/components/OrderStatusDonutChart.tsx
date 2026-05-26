/**
 * OrderStatusDonutChart
 * PieChart donut showing goods distribution by status.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DonutChartItem } from '../hooks/useProfileCharts';

interface OrderStatusDonutChartProps {
  data: DonutChartItem[];
  total: number;
}

export const OrderStatusDonutChart: React.FC<OrderStatusDonutChartProps> = ({ data, total }) => {
  const { colors } = useAppTheme();

  if (data.length === 0) {
    return (
      <Animated.View
        entering={FadeInDown.delay(100).duration(400)}
        style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}
      >
        <Text style={[styles.title, { color: colors.text.primary }]}>État des marchandises</Text>
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            Aucune donnée disponible
          </Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(400)}
      style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}
    >
      <Text style={[styles.title, { color: colors.text.primary }]}>État des marchandises</Text>

      <View style={styles.chartRow}>
        <PieChart
          data={data.map((d) => ({ value: d.value, color: d.color }))}
          donut
          radius={70}
          innerRadius={45}
          innerCircleColor={colors.background.card}
          showText
          textColor={colors.text.primary}
          textSize={12}
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text style={[styles.centerValue, { color: colors.text.primary }]}>{total}</Text>
              <Text style={[styles.centerLabelText, { color: colors.text.secondary }]}>Total</Text>
            </View>
          )}
        />

        <View style={styles.legend}>
          {data.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={[styles.legendText, { color: colors.text.secondary }]} numberOfLines={1}>
                {item.label} ({item.value})
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginBottom: 14,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerValue: {
    fontFamily: Fonts.bold,
    fontSize: 22,
  },
  centerLabelText: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: -2,
  },
  legend: {
    flex: 1,
    marginLeft: 16,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    flexShrink: 1,
  },
  emptyState: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
});
