import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./WinBackTrendChart.styles";
import type { WinBackTrend } from "../../api/winBackApi";

Dimensions.get("window");
const CHART_H = 140;

type WinBackTrendChartProps = {
  trends: WinBackTrend[];
  isLoading: boolean;
};

export function WinBackTrendChart({ trends, isLoading }: WinBackTrendChartProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.skeleton} />
      </View>
    );
  }

  if (!trends || trends.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Aucune donnée de tendance disponible</Text>
      </View>
    );
  }

  const maxSent = Math.max(...trends.map((t) => t.sent), 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activité sur 30 jours</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {trends.map((day) => {
          const sentH = (day.sent / maxSent) * CHART_H;
          const respH = day.sent > 0 ? (day.responded / maxSent) * CHART_H : 0;
          return (
            <View key={day._id} style={styles.barGroup}>
              <View style={[styles.barTrack, { height: CHART_H }]}>
                <View
                  style={[
                    styles.barSent,
                    { height: Math.max(sentH, 2), backgroundColor: colors.primary.main },
                  ]}
                />
                {day.responded > 0 && (
                  <View
                    style={[
                      styles.barResp,
                      { height: Math.max(respH, 2), backgroundColor: colors.status.success },
                    ]}
                  />
                )}
              </View>
              <Text style={styles.barSentLabel}>{day.sent}</Text>
              <Text style={styles.barDate}>{day._id.slice(5)}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.primary.main }]} />
          <Text style={styles.legendText}>Envoyés</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.status.success }]} />
          <Text style={styles.legendText}>Répondus</Text>
        </View>
      </View>
    </View>
  );
}
