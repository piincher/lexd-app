import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";

import { COLORS } from "@src/constants/Colors";
import { styles } from "./AgingChart.styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface AgingChartProps {
  aging: {
    "0-30": number;
    "31-60": number;
    "60+": number;
  };
}

interface ChartDataItem {
  value: number;
  label: string;
  frontColor: string;
  percentage: number;
}

export const AgingChart: React.FC<AgingChartProps> = ({ aging }) => {
  const total = aging["0-30"] + aging["31-60"] + aging["60+"];

  const data: ChartDataItem[] = [
    {
      value: aging["0-30"],
      label: "0-30d",
      frontColor: COLORS.success,
      percentage: total > 0 ? Math.round((aging["0-30"] / total) * 100) : 0,
    },
    {
      value: aging["31-60"],
      label: "31-60d",
      frontColor: COLORS.yellow,
      percentage: total > 0 ? Math.round((aging["31-60"] / total) * 100) : 0,
    },
    {
      value: aging["60+"],
      label: "60+d",
      frontColor: COLORS.danger,
      percentage: total > 0 ? Math.round((aging["60+"] / total) * 100) : 0,
    },
  ];

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const renderLabel = (item: ChartDataItem) => (
    <View style={styles.labelContainer}>
      <Text style={styles.amount}>${item.value.toLocaleString()}</Text>
      <Text style={styles.percentage}>{item.percentage}%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aging des Paiements</Text>
      <BarChart
        data={data}
        width={SCREEN_WIDTH - 120}
        height={140}
        barWidth={48}
        barBorderRadius={6}
        yAxisLabelWidth={0}
        xAxisLabelTextStyle={styles.axisLabel}
        noOfSections={3}
        showLine={false}
        showYAxisIndices={false}
        spacing={24}
        initialSpacing={16}
        maxValue={maxValue * 1.2}
        hideRules
        hideYAxisText
        renderTooltip={(item: ChartDataItem) => renderLabel(item)}
      />
      <View style={styles.legend}>
        {data.map((item) => (
          <View key={item.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.frontColor }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
