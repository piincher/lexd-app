/**
 * MonthlyActivityBarChart
 * Mini bar chart showing last 6 months of shipping activity.
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { BarChartItem } from '../hooks/useProfileCharts';

const { width: SCREEN_W } = Dimensions.get('window');

interface MonthlyActivityBarChartProps {
  data: BarChartItem[];
}

export const MonthlyActivityBarChart: React.FC<MonthlyActivityBarChartProps> = ({ data }) => {
  const { colors } = useAppTheme();

  const hasData = data.some((d) => d.value > 0);
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  if (!hasData) {
    return (
      <Animated.View
        entering={FadeInDown.delay(200).duration(400)}
        style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}
      >
        <Text style={[styles.title, { color: colors.text.primary }]}>Activité mensuelle</Text>
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            Aucune activité récente
          </Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(400)}
      style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}
    >
      <Text style={[styles.title, { color: colors.text.primary }]}>Activité mensuelle</Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Derniers 6 mois</Text>

      <BarChart
        data={data}
        width={SCREEN_W - 64}
        height={140}
        barWidth={28}
        barBorderRadius={6}
        spacing={16}
        yAxisTextStyle={{
          color: colors.text.secondary,
          fontSize: 10,
          fontFamily: Fonts.regular,
        }}
        xAxisLabelTextStyle={{
          color: colors.text.secondary,
          fontSize: 11,
          fontFamily: Fonts.meduim,
        }}
        hideRules
        hideYAxisText
        yAxisColor="transparent"
        xAxisColor={colors.border}
        noOfSections={3}
        maxValue={maxValue < 3 ? 3 : maxValue}
        showValuesAsTopLabel
        topLabelTextStyle={{
          color: colors.text.primary,
          fontSize: 10,
          fontFamily: Fonts.bold,
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginBottom: 10,
    marginTop: 2,
  },
  emptyState: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
});
