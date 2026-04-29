import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./ReviewFilters.styles";

export type FilterChip = {
  label: string;
  key: string;
  filterType: "all" | "rating" | "response";
  value?: number | boolean;
};

export const FILTER_CHIPS: FilterChip[] = [
  { label: "Tous", key: "all", filterType: "all" },
  { label: "5\u2605", key: "5star", filterType: "rating", value: 5 },
  { label: "4\u2605", key: "4star", filterType: "rating", value: 4 },
  { label: "3\u2605", key: "3star", filterType: "rating", value: 3 },
  { label: "2\u2605", key: "2star", filterType: "rating", value: 2 },
  { label: "1\u2605", key: "1star", filterType: "rating", value: 1 },
  { label: "Sans réponse", key: "no_response", filterType: "response", value: false as any },
  { label: "Avec réponse", key: "has_response", filterType: "response", value: true as any },
];

interface ReviewFiltersProps {
  activeFilter: string;
  onFilterChange: (key: string) => void;
}

export const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <View style={styles.filterContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContent}
      >
        {FILTER_CHIPS.map((chip) => {
          const isActive = activeFilter === chip.key;
          return (
            <TouchableOpacity
              key={chip.key}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => onFilterChange(chip.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterChipText,
                  isActive && styles.filterChipTextActive,
                ]}
              >
                {chip.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
