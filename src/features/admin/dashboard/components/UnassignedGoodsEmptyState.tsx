/**
 * UnassignedGoodsEmptyState - Empty state for unassigned goods screen
 * SRP: Display empty state when no unassigned goods
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme } from "@src/constants/Theme";
import { ShippingMode } from "@src/features/admin/containers/types";

interface UnassignedGoodsEmptyStateProps {
  filterMode: ShippingMode | undefined;
}

export const UnassignedGoodsEmptyState: React.FC<UnassignedGoodsEmptyStateProps> = ({
  filterMode,
}) => {
  const getMessage = () => {
    if (filterMode === "AIR") {
      return "All air freight goods have been assigned to containers";
    }
    if (filterMode === "SEA") {
      return "All sea freight goods have been assigned to containers";
    }
    return "All goods have been assigned to containers. Great job!";
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#F0FDF4", "#DCFCE7"]} style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={64} color={lightTheme.colors.status.success} />
      </LinearGradient>
      <Text style={styles.title}>All Caught Up!</Text>
      <Text style={styles.subtitle}>{getMessage()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 60,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Theme.neutral[800],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: Theme.neutral[500],
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
