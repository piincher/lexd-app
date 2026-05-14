import React, { useState } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { createStyles } from "./RevenueChart.styles";
import { Text, useTheme } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RevenueTrendPoint, GrowthComparison } from "../types";
import { RevenueChartSvg } from "./RevenueChartSvg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface RevenueChartProps {
  data: RevenueTrendPoint[];
  comparisonData?: RevenueTrendPoint[];
  growth?: GrowthComparison;
  width?: number;
  height?: number;
  showComparison?: boolean;
  onPeriodChange?: (period: "day" | "week" | "month") => void;
}

type PeriodType = "day" | "week" | "month";

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
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("day");
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text style={styles.noData}>Aucune donnée disponible</Text>
      </View>
    );
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toFixed(0);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  };

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
    onPeriodChange?.(period);
  };

  const periods: { key: PeriodType; label: string }[] = [
    { key: "day", label: "Jour" },
    { key: "week", label: "Semaine" },
    { key: "month", label: "Mois" },
  ];

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Tendance des Revenus</Text>
        {growth && (
          <View style={[styles.growthBadge, { backgroundColor: growth.revenueGrowth >= 0 ? colors.feedback.successBg : colors.feedback.errorBg }]}>
            <Text style={[styles.growthText, { color: growth.revenueGrowth >= 0 ? colors.feedback.successDark : colors.feedback.errorDark }]}>
              {growth.revenueGrowth >= 0 ? "+" : ""}
              {growth.revenueGrowth.toFixed(1)}%
            </Text>
          </View>
        )}
      </View>

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
                selectedPeriod === period.key && { color: colors.text.inverse },
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.status.success }]} />
          <Text style={styles.legendText}>Période actuelle</Text>
        </View>
        {showComparison && comparisonData && (
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.text.muted }]} />
            <Text style={styles.legendText}>Période précédente</Text>
          </View>
        )}
      </View>

      <RevenueChartSvg
        data={data}
        comparisonData={comparisonData}
        showComparison={showComparison}
        width={width}
        height={height}
        tooltipIndex={tooltipIndex}
        setTooltipIndex={setTooltipIndex}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />
    </View>
  );
};

export default RevenueChart;
