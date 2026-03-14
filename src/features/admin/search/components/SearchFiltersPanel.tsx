/**
 * SearchFiltersPanel - Active filter chips display
 * Shows currently applied filters as removable chips
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { SearchFilters as SearchFiltersType } from "../api/searchApi";

interface SearchFiltersPanelProps {
  filters: SearchFiltersType;
  onRemoveFilter: (key: string) => void;
}

export const SearchFiltersPanel: React.FC<SearchFiltersPanelProps> = ({
  filters,
  onRemoveFilter,
}) => {
  const hasFilters = Object.keys(filters).length > 0;
  
  if (!hasFilters) return null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            return (
              <View key={key} style={styles.filterChip}>
                <Text style={styles.filterChipText}>
                  {key}: {Array.isArray(value) ? value.join(", ") : value.toString()}
                </Text>
                <TouchableOpacity onPress={() => onRemoveFilter(key)}>
                  <Ionicons name="close" size={14} color={Theme.neutral[600]} />
                </TouchableOpacity>
              </View>
            );
          })}
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
  filters: {
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
