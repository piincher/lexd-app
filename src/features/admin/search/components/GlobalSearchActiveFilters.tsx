import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { SearchFilters } from "../api/searchApi";

interface GlobalSearchActiveFiltersProps {
  filters: SearchFilters;
  onRemoveFilter: (key: keyof SearchFilters) => void;
}

export const GlobalSearchActiveFilters: React.FC<GlobalSearchActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
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
                <Ionicons name="close" size={14} color={colors.neutral[600]} />
              </TouchableOpacity>
            </View>
          ))}
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
  filtersRow: {
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
