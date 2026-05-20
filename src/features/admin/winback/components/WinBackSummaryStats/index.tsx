import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./WinBackSummaryStats.styles";

type Summary = {
  totalSent: number;
  totalResponded: number;
  totalPending: number;
  responseRate: number;
  totalRevenue: number;
};

type WinBackSummaryStatsProps = {
  summary: Summary;
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

export function WinBackSummaryStats({ summary, isLoading }: WinBackSummaryStatsProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={[styles.pill, styles.skeleton]} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatPill
        label="Envoyés"
        value={String(summary.totalSent)}
        icon="send"
        color={colors.primary.main}
      />
      <StatPill
        label="Répondus"
        value={String(summary.totalResponded)}
        icon="check-circle"
        color={colors.status.success}
      />
      <StatPill
        label="Taux"
        value={`${summary.responseRate}%`}
        icon="chart-line"
        color={colors.status.info}
      />
      <StatPill
        label="Revenus"
        value={`${summary.totalRevenue.toLocaleString()} XOF`}
        icon="cash"
        color={colors.status.warning}
      />
    </View>
  );
}
