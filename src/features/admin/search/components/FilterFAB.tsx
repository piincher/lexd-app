/**
 * FilterFAB - Floating action button for opening filters
 * Shows badge with active filter count
 */

import React from "react";
import { View } from "react-native";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { SearchFilters } from "../api/searchApi";

interface FilterFABProps {
  filters: SearchFilters;
  onPress: () => void;
}

export const FilterFAB: React.FC<FilterFABProps> = ({ filters, onPress }) => {
  const { colors } = useAppTheme();
  const filterCount = Object.keys(filters).length;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={Theme.gradients.ocean}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="options" size={24} color={colors.text.inverse} />
        {filterCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{filterCount}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: Theme.spacing.xl,
    bottom: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
    ...Theme.shadows.xl,
  },
  gradient: {
    width: 56,
    height: 56,
    borderRadius: Theme.radius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Theme.status.error,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: Theme.colors.text.inverse,
  },
});
