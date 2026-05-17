import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";

interface SearchEmptyStateProps {
  message: string;
}

export const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({
  message,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.centerContainer}>
      <LinearGradient
        colors={[colors.primary[50], colors.primary[100]]}
        style={styles.emptyIconContainer}
      >
        <Ionicons name="search-outline" size={64} color={Theme.primary[400]} />
      </LinearGradient>
      <Text style={styles.emptyTitle}>Aucun résultat</Text>
      <Text style={styles.emptySubtitle}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing["4xl"],
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius["3xl"],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: "center",
  },
});
