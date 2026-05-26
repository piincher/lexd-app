import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./AnnouncementSummaryStats.styles";
import type { AnnouncementStats } from "../../types/announcement.types";

type AnnouncementSummaryStatsProps = {
  stats: AnnouncementStats | undefined;
  isLoading: boolean;
};

function StatPill({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);
  return (
    <View style={[styles.pill, { borderColor: color + "30" }]}>
      <MaterialCommunityIcons name={icon} size={18} color={color} />
      <Text style={[styles.pillValue, { color }]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.pillLabel}>{label}</Text>
    </View>
  );
}

export function AnnouncementSummaryStats({ stats, isLoading }: AnnouncementSummaryStatsProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  if (isLoading) {
    return (
      <View style={styles.container}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={[styles.pill, styles.skeleton]} />
        ))}
      </View>
    );
  }

  const byStatus = stats?.byStatus ?? { draft: 0, published: 0, archived: 0 };

  return (
    <View style={styles.container}>
      <StatPill label="Total" value={String(stats?.total ?? 0)} icon="bullhorn" color={colors.primary.main} />
      <StatPill label="Actives" value={String(stats?.currentlyActive ?? 0)} icon="broadcast" color={colors.status.success} />
      <StatPill label="Brouillons" value={String(byStatus.draft)} icon="file-document-outline" color={colors.status.info} />
      <StatPill label="Lectures" value={String(stats?.engagement?.totalRead ?? 0)} icon="eye-check" color={colors.status.warning} />
    </View>
  );
}
