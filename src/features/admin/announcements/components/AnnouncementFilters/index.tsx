import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./AnnouncementFilters.styles";

const STATUS_OPTIONS = [
  { key: "all", label: "Toutes" },
  { key: "PUBLISHED", label: "Publiées" },
  { key: "DRAFT", label: "Brouillons" },
  { key: "ARCHIVED", label: "Archivées" },
];

const TYPE_OPTIONS = [
  { key: "all", label: "Tous types" },
  { key: "INFO", label: "Info" },
  { key: "WARNING", label: "Alerte" },
  { key: "SUCCESS", label: "Succès" },
  { key: "URGENT", label: "Urgent" },
  { key: "PROMOTION", label: "Promo" },
  { key: "MAINTENANCE", label: "Maint." },
];

const PLACEMENT_OPTIONS = [
  { key: "all", label: "Tous empl." },
  { key: "TOP_BANNER", label: "Bannière" },
  { key: "HOME_CARD", label: "Accueil" },
  { key: "MODAL", label: "Modal" },
  { key: "INBOX", label: "Boîte" },
];

type AnnouncementFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (key: string) => void;
  typeFilter: string;
  onTypeFilterChange: (key: string) => void;
  placementFilter: string;
  onPlacementFilterChange: (key: string) => void;
};

export function AnnouncementFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  placementFilter,
  onPlacementFilterChange,
}: AnnouncementFiltersProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <MaterialCommunityIcons name="magnify" size={18} color={colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par titre ou message..."
          placeholderTextColor={colors.text.disabled}
          value={search}
          onChangeText={onSearchChange}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange("")} activeOpacity={0.7}>
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
        {STATUS_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[styles.chip, statusFilter === opt.key && styles.chipActive]}
            onPress={() => onStatusFilterChange(opt.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, statusFilter === opt.key && styles.chipTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
        {TYPE_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[styles.chipSmall, typeFilter === opt.key && styles.chipSmallActive]}
            onPress={() => onTypeFilterChange(opt.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipSmallText, typeFilter === opt.key && styles.chipSmallTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
        {PLACEMENT_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[styles.chipSmall, placementFilter === opt.key && styles.chipSmallActive]}
            onPress={() => onPlacementFilterChange(opt.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipSmallText, placementFilter === opt.key && styles.chipSmallTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
