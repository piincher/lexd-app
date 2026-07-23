import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ThemeContextType } from "@src/constants/Theme";
import type { createMenuCategoriesStyles } from "./MenuCategories.styles";

type MenuCategoryStyles = ReturnType<typeof createMenuCategoriesStyles>;
type AppThemeColors = ThemeContextType["colors"];

interface MenuRecentSearchesProps {
  styles: MenuCategoryStyles;
  colors: AppThemeColors;
  recents: string[];
  visible: boolean;
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
}

export const MenuRecentSearches: React.FC<MenuRecentSearchesProps> = ({
  styles,
  colors,
  recents,
  visible,
  onSelect,
  onRemove,
  onClear,
}) => {
  if (!visible || recents.length === 0) return null;

  return (
    <View style={styles.recentSearchesContainer}>
      <View style={styles.recentSearchesHeader}>
        <Text style={[styles.recentSearchesTitle, { color: colors.text.secondary }]}>
          Recherches récentes
        </Text>
        <TouchableOpacity onPress={onClear} accessibilityRole="button" accessibilityLabel="Effacer l'historique">
          <Text style={[styles.recentSearchesClear, { color: colors.status.error }]}>Effacer</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentSearchesChips}>
        {recents.map((query) => (
          <TouchableOpacity
            key={query}
            onPress={() => onSelect(query)}
            style={[styles.recentSearchesChip, { backgroundColor: colors.background.paper, borderColor: colors.border }]}
            accessibilityRole="button"
            accessibilityLabel={`Rechercher ${query}`}
          >
            <MaterialCommunityIcons name="history" size={14} color={colors.text.secondary} />
            <Text style={[styles.recentSearchesChipText, { color: colors.text.primary }]} numberOfLines={1}>
              {query}
            </Text>
            <TouchableOpacity
              onPress={() => onRemove(query)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={`Supprimer ${query}`}
            >
              <MaterialCommunityIcons name="close" size={14} color={colors.text.disabled} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MenuRecentSearches;
