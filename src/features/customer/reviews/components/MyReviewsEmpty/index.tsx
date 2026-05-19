import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./MyReviewsEmpty.styles";

export const MyReviewsEmpty: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.emptyContainer}>
      <MaterialIcons
        name="rate-review"
        size={64}
        color={colors.text.disabled}
      />
      <Text style={styles.emptyTitle}>Aucun avis</Text>
      <Text style={styles.emptySubtitle}>
        Vous n'avez pas encore laissé d'avis
      </Text>
    </View>
  );
};
