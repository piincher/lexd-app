import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { getStyles } from "./HelpEmptyState.styles";

type HelpEmptyStateProps = {
  searchActive: boolean;
  hasBookmarks?: boolean;
};

export function HelpEmptyState({ searchActive, hasBookmarks }: HelpEmptyStateProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  if (hasBookmarks) {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="bookmark-outline" size={48} color={colors.text.disabled} />
        <Text style={styles.title}>Aucun favori</Text>
        <Text style={styles.subtitle}>Marquez des questions comme favorites pour les retrouver ici.</Text>
      </View>
    );
  }

  if (searchActive) {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="magnify-close" size={48} color={colors.text.disabled} />
        <Text style={styles.title}>Aucun résultat</Text>
        <Text style={styles.subtitle}>Essayez d&apos;autres mots-clés ou parcourez par catégorie.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="help-circle-outline" size={48} color={colors.text.disabled} />
      <Text style={styles.title}>Aucune question disponible</Text>
      <Text style={styles.subtitle}>Revenez plus tard ou contactez le support.</Text>
    </View>
  );
}
