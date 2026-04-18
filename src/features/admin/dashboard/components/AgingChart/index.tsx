import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";

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
  gradientColor: string;
  percentage: number;
}

export const AgingChart: React.FC<AgingChartProps> = ({ aging }) => {
  const { colors, isDark } = useAppTheme();
  const total = aging["0-30"] + aging["31-60"] + aging["60+"];

  const data: ChartDataItem[] = useMemo(
    () => [
      {
        value: aging["0-30"],
        label: "0-30j",
        frontColor: "#10B981",
        gradientColor: "#34D399",
        percentage: total > 0 ? Math.round((aging["0-30"] / total) * 100) : 0,
      },
      {
        value: aging["31-60"],
        label: "31-60j",
        frontColor: "#F59E0B",
        gradientColor: "#FBBF24",
        percentage: total > 0 ? Math.round((aging["31-60"] / total) * 100) : 0,
      },
      {
        value: aging["60+"],
        label: "60+j",
        frontColor: "#EF4444",
        gradientColor: "#F87171",
        percentage: total > 0 ? Math.round((aging["60+"] / total) * 100) : 0,
      },
    ],
    [aging, total]
  );

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const hasCritical = aging["60+"] > 0;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.background.card,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          padding: 14,
          ...Theme.shadows.sm,
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        },
        iconWrap: {
          width: 34,
          height: 34,
          borderRadius: 11,
          backgroundColor: isDark
            ? hasCritical
              ? "rgba(239,68,68,0.18)"
              : "rgba(14,165,233,0.18)"
            : hasCritical
            ? "#FEE2E2"
            : "#DBEAFE",
          justifyContent: "center",
          alignItems: "center",
        },
        titleWrap: {
          flex: 1,
        },
        title: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          letterSpacing: -0.2,
        },
        subtitle: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 1,
        },
        chartWrap: {
          alignItems: "center",
          paddingVertical: 4,
        },
        axisLabel: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        legend: {
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
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
        empty: {
          alignItems: "center",
          paddingVertical: 24,
        },
        emptyIconWrap: {
          width: 48,
          height: 48,
          borderRadius: 16,
          backgroundColor: isDark ? "rgba(16,185,129,0.15)" : "#D1FAE5",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        },
        emptyText: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        emptySubtext: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 4,
        },
      }),
    [colors, isDark, hasCritical]
  );

  const chartWidth = Math.min(SCREEN_WIDTH - 80, 280);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons
            name={hasCritical ? "clock-alert" : "chart-timeline-variant"}
            size={18}
            color={hasCritical ? "#EF4444" : "#0EA5E9"}
          />
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Ancienneté des impayés</Text>
          <Text style={styles.subtitle}>Répartition par âge</Text>
        </View>
      </View>

      {total === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIconWrap}>
            <MaterialCommunityIcons name="check-decagram" size={24} color="#10B981" />
          </View>
          <Text style={styles.emptyText}>Aucun impayé</Text>
          <Text style={styles.emptySubtext}>Situation saine</Text>
        </View>
      ) : (
        <>
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
        </>
      )}
    </View>
  );
};

export default AgingChart;
