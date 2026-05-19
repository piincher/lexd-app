import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { getStyles } from "./ReviewFilters.styles";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const FILTER_CHIPS = [
  { key: "all", label: "Tous" },
  { key: "pending", label: "En attente" },
  { key: "responded", label: "Répondus" },
];

interface ReviewFiltersProps {
  activeFilter: string;
  onFilterChange: (key: string) => void;
}

export const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.filterContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContent}
      >
        {FILTER_CHIPS.map((filter) => {
          const isActive = activeFilter === filter.key;
          return (
            <TouchableOpacity
              key={filter.key}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => onFilterChange(filter.key)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
