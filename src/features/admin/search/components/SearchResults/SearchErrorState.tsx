import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";

interface SearchErrorStateProps {
  error?: any;
  onRefresh?: () => void;
}

export const SearchErrorState: React.FC<SearchErrorStateProps> = ({
  error,
  onRefresh,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.centerContainer}>
      <LinearGradient
        colors={[colors.feedback.errorBg, colors.feedback.errorBg]}
        style={styles.errorIconContainer}
      >
        <Ionicons name="alert-circle" size={48} color={colors.status.error} />
      </LinearGradient>
      <Text style={styles.errorTitle}>Erreur de recherche</Text>
      <Text style={styles.errorSubtitle}>
        {error?.message || "Une erreur est survenue lors de la recherche"}
      </Text>
      {onRefresh && (
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      )}
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
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: Theme.radius["2xl"],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  errorSubtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: "center",
    marginBottom: Theme.spacing.lg,
  },
  retryButton: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.primary[500],
    borderRadius: Theme.radius.lg,
  },
  retryText: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.text.inverse,
  },
});
