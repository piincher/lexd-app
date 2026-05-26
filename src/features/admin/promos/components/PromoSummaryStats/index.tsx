import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./PromoSummaryStats.styles";

type PromoSummary = {
  total: number;
  active: number;
  inactive: number;
  expired: number;
};

type PromoSummaryStatsProps = {
  summary: PromoSummary;
};

function SummaryPill({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);
  return (
    <View style={[styles.pill, { borderColor: color + "30" }]}>
      <MaterialCommunityIcons name={icon} size={16} color={color} />
      <Text style={[styles.pillValue, { color }]}>{value}</Text>
      <Text style={styles.pillLabel}>{label}</Text>
    </View>
  );
}

export function PromoSummaryStats({ summary }: PromoSummaryStatsProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  return (
    <View style={styles.container}>
      <SummaryPill label="Total" value={summary.total} icon="tag-multiple" color={colors.primary.main} />
      <SummaryPill label="Actif" value={summary.active} icon="check-circle" color={colors.status.success} />
      <SummaryPill label="Inactif" value={summary.inactive} icon="close-circle" color={colors.status.error} />
      <SummaryPill label="Expiré" value={summary.expired} icon="clock-outline" color={colors.text.disabled} />
    </View>
  );
}
