import React from "react";
import { View, Text, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./VersionStatsBreakdown.styles";
import type { VersionGateStats } from "../../api/versionApi";

type VersionStatsBreakdownProps = {
  stats: VersionGateStats | undefined;
  isLoading: boolean;
};

export function VersionStatsBreakdown({ stats, isLoading }: VersionStatsBreakdownProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.skeleton} />
      </View>
    );
  }

  const breakdown = stats?.breakdown ?? [];
  const maxCount = Math.max(...breakdown.map((b) => b.count), 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Anciennes versions détectées</Text>
        {stats?.since && (
          <Text style={styles.since}>Depuis {new Date(stats.since).toLocaleDateString("fr-FR")}</Text>
        )}
      </View>

      {breakdown.length === 0 ? (
        <View style={styles.empty}>
          <MaterialCommunityIcons name="check-circle-outline" size={32} color={colors.status.success} />
          <Text style={styles.emptyText}>Aucune ancienne version détectée</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {breakdown.map((item) => {
            const barWidth = (item.count / maxCount) * 100;
            const isAndroid = item.platform === "android";
            return (
              <View key={`${item.platform}-${item.version}`} style={styles.row}>
                <View style={styles.rowMeta}>
                  <MaterialCommunityIcons
                    name={isAndroid ? "android" : "apple"}
                    size={14}
                    color={isAndroid ? "#3DDC84" : "#007AFF"}
                  />
                  <Text style={styles.versionText}>{item.version}</Text>
                  <Text style={styles.countText}>{item.count}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${barWidth}%`,
                        backgroundColor: isAndroid ? "#3DDC84" : "#007AFF",
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
