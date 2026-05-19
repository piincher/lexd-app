import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
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
}

export const AgingChartLegend: React.FC<Props> = ({ data }) => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        legend: {
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: colors.divider,
        },
        legendItem: {
          alignItems: "center",
          flex: 1,
        },
        legendDot: {
          width: 8,
          height: 8,
          borderRadius: 4,
          marginBottom: 4,
        },
        legendValue: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        legendLabel: {
          fontSize: 9,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          textTransform: "uppercase",
          letterSpacing: 0.4,
          marginTop: 1,
        },
        legendPct: {
          fontSize: 9,
          fontFamily: Fonts.bold,
          marginTop: 2,
        },
      }),
    [colors, isDark]
  );

  return (
    <View style={styles.legend}>
      {data.map((item) => (
        <View key={item.label} style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: item.frontColor }]}
          />
          <Text style={styles.legendValue}>{item.value}</Text>
          <Text style={styles.legendLabel}>{item.label}</Text>
          <Text style={[styles.legendPct, { color: item.frontColor }]}>
            {item.percentage}%
          </Text>
        </View>
      ))}
    </View>
  );
};
