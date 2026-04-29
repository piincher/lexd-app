import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { styles } from "./PromoFilters.styles";

export type FilterChip = { label: string; key: string; value?: string };

export const FILTER_CHIPS: FilterChip[] = [
  { label: "Tous", key: "all" },
  { label: "Actif", key: "active", value: "ACTIVE" },
  { label: "Inactif", key: "inactive", value: "INACTIVE" },
  { label: "Expiré", key: "expired", value: "EXPIRED" },
];

type PromoFiltersProps = {
  activeFilter: string;
  onFilterChange: (key: string) => void;
};

export function PromoFilters({ activeFilter, onFilterChange }: PromoFiltersProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollContent}>
      {FILTER_CHIPS.map((chip) => {
        const isActive = activeFilter === chip.key;
        return (
          <TouchableOpacity
            key={chip.key}
            style={[styles.filterChip, isActive && styles.filterChipActive]}
            onPress={() => onFilterChange(chip.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
              {chip.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
