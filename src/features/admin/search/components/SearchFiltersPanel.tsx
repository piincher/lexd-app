/**
 * SearchFiltersPanel - Active filter chips display
 * Shows currently applied filters as removable chips
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { SearchFilters as SearchFiltersType } from "../api/searchApi";

interface SearchFiltersPanelProps {
  filters: SearchFiltersType;
  onRemoveFilter: (key: string) => void;
}

export const SearchFiltersPanel: React.FC<SearchFiltersPanelProps> = ({
  filters,
  onRemoveFilter,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
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
                  <Ionicons name="close" size={14} color={colors.neutral[600]} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  filters: {
    flexDirection: "row",
    gap: 8,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.primary[100],
    borderRadius: 999,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.primary[700],
  },
});
