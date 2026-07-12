import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./AtRiskFilters.styles";
import type { AtRiskFilter } from "../../types";

const DAY_OPTIONS: { key: AtRiskFilter; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "never", label: "Jamais" },
  { key: "60", label: "60j" },
  { key: "90", label: "90j" },
  { key: "120", label: "120j" },
];

type AtRiskFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  activeFilter: AtRiskFilter;
  onFilterChange: (key: AtRiskFilter) => void;
};

export function AtRiskFilters({ search, onSearchChange, activeFilter, onFilterChange }: AtRiskFiltersProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <MaterialCommunityIcons name="magnify" size={18} color={colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par nom ou téléphone..."
          placeholderTextColor={colors.text.disabled}
          value={search}
          onChangeText={onSearchChange}
          returnKeyType="search"
          autoCorrect={false}
          accessibilityLabel="Rechercher un client à risque"
        />
        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => onSearchChange("")}
            activeOpacity={0.7}
            style={styles.clearButton}
            accessibilityRole="button"
            accessibilityLabel="Effacer la recherche"
          >
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
        {DAY_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[styles.chip, activeFilter === opt.key && styles.chipActive]}
            onPress={() => onFilterChange(opt.key)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: activeFilter === opt.key }}
          >
            <Text style={[styles.chipText, activeFilter === opt.key && styles.chipTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
