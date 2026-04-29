import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ChartDataItem {
  value: number;
  label: string;
  frontColor: string;
  gradientColor: string;
  percentage: number;
}

interface Props {
  data: ChartDataItem[];
  maxValue: number;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

export const AgingChartBars: React.FC<Props> = ({ data, maxValue }) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        chartWrap: {
          alignItems: "center",
          paddingVertical: 4,
        },
        axisLabel: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
      }),
    [colors]
  );

  const chartWidth = Math.min(SCREEN_WIDTH - 80, 280);

  return (
    <View style={styles.chartWrap}>
      <BarChart
        data={data}
        width={chartWidth}
        height={120}
        barWidth={40}
        barBorderRadius={8}
        yAxisLabelWidth={0}
        xAxisLabelTextStyle={styles.axisLabel}
        xAxisThickness={0}
        yAxisThickness={0}
        spacing={28}
        initialSpacing={12}
        maxValue={maxValue * 1.2}
        hideRules
        hideYAxisText
        disablePress
        showGradient
      />
    </View>
  );
};
