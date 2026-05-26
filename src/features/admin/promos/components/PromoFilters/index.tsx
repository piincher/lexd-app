import React from "react";
import { ScrollView, TouchableOpacity, Text, View, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./PromoFilters.styles";

export type FilterChip = { label: string; key: string; value?: string };

export const FILTER_CHIPS: FilterChip[] = [
  { label: "Tous", key: "all" },
  { label: "Actif", key: "active", value: "ACTIVE" },
  { label: "Inactif", key: "inactive", value: "INACTIVE" },
  { label: "Expiré", key: "expired", value: "EXPIRED" },
];

export const TYPE_CHIPS: FilterChip[] = [
  { label: "Tous types", key: "all" },
  { label: "Pourcentage", key: "PERCENTAGE" },
  { label: "Montant fixe", key: "FIXED_AMOUNT" },
];

type PromoFiltersProps = {
  activeFilter: string;
  activeType: string;
  search: string;
  onFilterChange: (key: string) => void;
  onTypeChange: (key: string) => void;
  onSearchChange: (value: string) => void;
};

export function PromoFilters({ activeFilter, activeType, search, onFilterChange, onTypeChange, onSearchChange }: PromoFiltersProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={18} color={colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={onSearchChange}
          placeholder="Rechercher un code ou nom..."
          placeholderTextColor={colors.text.disabled}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange("")}>
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.typeScrollContent}>
        {TYPE_CHIPS.map((chip) => {
          const isActive = activeType === chip.key;
          return (
            <TouchableOpacity
              key={chip.key}
              style={[styles.typeChip, isActive && styles.typeChipActive]}
              onPress={() => onTypeChange(chip.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.typeChipText, isActive && styles.typeChipTextActive]}>
                {chip.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
