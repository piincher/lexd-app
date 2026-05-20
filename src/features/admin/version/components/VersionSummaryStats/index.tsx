import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./VersionSummaryStats.styles";
import type { VersionGateStats } from "../../api/versionApi";

type VersionSummaryStatsProps = {
  stats: VersionGateStats | undefined;
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
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);
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

export function VersionSummaryStats({ stats, isLoading }: VersionSummaryStatsProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={[styles.pill, styles.skeleton]} />
        ))}
      </View>
    );
  }

  const androidCount = Object.keys(stats?.oldVersionsDetected?.android ?? {}).length;
  const iosCount = Object.keys(stats?.oldVersionsDetected?.ios ?? {}).length;

  return (
    <View style={styles.container}>
      <StatPill
        label="Appels v1"
        value={String(stats?.v1Calls ?? 0)}
        icon="phone-alert"
        color={colors.status.warning}
      />
      <StatPill
        label="Vieux versions"
        value={String(stats?.totalOldVersionDetections ?? 0)}
        icon="alert-circle"
        color={colors.status.error}
      />
      <StatPill
        label="Versions uniques"
        value={String(androidCount + iosCount)}
        icon="cellphone-information"
        color={colors.status.info}
      />
    </View>
  );
}
