import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./AtRiskSummaryStats.styles";

type AtRiskSummaryStatsProps = {
  totalAtRisk: number;
  neverShippedCount: number;
  inactiveThresholdDays: number;
};

export function AtRiskSummaryStats({ totalAtRisk, neverShippedCount, inactiveThresholdDays }: AtRiskSummaryStatsProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { borderLeftColor: colors.status.error }]}>
        <MaterialCommunityIcons name="alert-circle-outline" size={22} color={colors.status.error} />
        <Text style={styles.value}>{totalAtRisk}</Text>
        <Text style={styles.label}>Clients à risque</Text>
      </View>

      <View style={[styles.card, { borderLeftColor: colors.status.warning }]}>
        <MaterialCommunityIcons name="package-variant-remove" size={22} color={colors.status.warning} />
        <Text style={styles.value}>{neverShippedCount}</Text>
        <Text style={styles.label}>Jamais expédié</Text>
      </View>

      <View style={[styles.card, { borderLeftColor: colors.status.info }]}>
        <MaterialCommunityIcons name="clock-outline" size={22} color={colors.status.info} />
        <Text style={styles.value}>{inactiveThresholdDays}j</Text>
        <Text style={styles.label}>Seuil inactivité</Text>
      </View>
    </View>
  );
}
