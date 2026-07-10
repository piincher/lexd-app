/**
 * DashboardRevenueTrend - Lightweight revenue trend bars for the admin dashboard
 * Renders the four revenue buckets returned by /analytics/dashboard as a bar chart.
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { formatCurrency } from "@src/shared/lib/currency";
import type { RevenueSummary } from "@src/shared/types/adminDashboard";

export interface DashboardRevenueTrendProps {
  revenue: RevenueSummary;
}

interface TrendBar {
  key: keyof RevenueSummary;
  label: string;
  value: number;
}

export const DashboardRevenueTrend: React.FC<DashboardRevenueTrendProps> = ({ revenue }) => {
  const { colors } = useAppTheme();

  const bars: TrendBar[] = [
    { key: "todayFCFA", label: "Auj.", value: revenue.todayFCFA },
    { key: "thisWeekFCFA", label: "Sem.", value: revenue.thisWeekFCFA },
    { key: "thisMonthFCFA", label: "Mois", value: revenue.thisMonthFCFA },
    { key: "last30DaysFCFA", label: "30j", value: revenue.last30DaysFCFA },
  ];

  const maxValue = Math.max(1, ...bars.map((b) => b.value));

  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        {bars.map((bar) => {
          const heightPct = Math.max(8, (bar.value / maxValue) * 100);
          return (
            <View key={bar.key} style={styles.barColumn}>
              <Text style={[styles.value, { color: colors.text.primary }]}>
                {formatCurrency(bar.value)}
              </Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${heightPct}%`,
                      backgroundColor: colors.primary.main,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.label, { color: colors.text.secondary }]}>{bar.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 180,
  },
  barColumn: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 6,
  },
  value: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 6,
  },
  barTrack: {
    width: "100%",
    height: 120,
    justifyContent: "flex-end",
    backgroundColor: "rgba(128,128,128,0.08)",
    borderRadius: 6,
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 8,
  },
});

export default DashboardRevenueTrend;
