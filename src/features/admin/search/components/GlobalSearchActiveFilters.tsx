import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { SearchFilters } from "../api/searchApi";

interface GlobalSearchActiveFiltersProps {
  filters: SearchFilters;
  onRemoveFilter: (key: keyof SearchFilters) => void;
}

export const GlobalSearchActiveFilters: React.FC<GlobalSearchActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
}) => {
  const entries = Object.entries(filters).filter(([, value]) => !!value);

  if (entries.length === 0) return null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filtersRow}>
          {entries.map(([key, value]) => (
            <View key={key} style={styles.filterChip}>
              <Text style={styles.filterChipText}>
                {key}: {Array.isArray(value) ? value.join(", ") : value.toString()}
              </Text>
              <TouchableOpacity onPress={() => onRemoveFilter(key as keyof SearchFilters)}>
                <Ionicons name="close" size={14} color={Theme.neutral[600]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  filtersRow: {
    flexDirection: "row",
    gap: Theme.spacing.sm,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    backgroundColor: Theme.primary[100],
    borderRadius: Theme.radius.full,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: Theme.primary[700],
  },
});
