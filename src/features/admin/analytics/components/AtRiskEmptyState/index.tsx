import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./AtRiskEmptyState.styles";

type AtRiskEmptyStateProps = {
  searchActive: boolean;
};

export function AtRiskEmptyState({ searchActive }: AtRiskEmptyStateProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  if (searchActive) {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="magnify-close" size={48} color={colors.text.disabled} />
        <Text style={styles.title}>Aucun résultat</Text>
        <Text style={styles.subtitle}>Aucun client ne correspond à votre recherche.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="shield-check-outline" size={48} color={colors.status.success} />
      <Text style={styles.title}>Tous les clients sont actifs</Text>
      <Text style={styles.subtitle}>Aucun client à risque détecté pour cette période.</Text>
    </View>
  );
}
