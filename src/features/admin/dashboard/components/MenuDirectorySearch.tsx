import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ThemeContextType } from "@src/constants/Theme";
import type { createMenuCategoriesStyles } from "./MenuCategories.styles";

type MenuCategoryStyles = ReturnType<typeof createMenuCategoriesStyles>;
type AppThemeColors = ThemeContextType["colors"];

interface MenuDirectorySearchProps {
  styles: MenuCategoryStyles;
  colors: AppThemeColors;
  query: string;
  onChangeQuery: (value: string) => void;
  onClear: () => void;
  onSubmitEditing?: () => void;
}

export const MenuDirectorySearch: React.FC<MenuDirectorySearchProps> = ({
  styles,
  colors,
  query,
  onChangeQuery,
  onClear,
  onSubmitEditing,
}) => (
  <View style={styles.searchBox}>
    <MaterialCommunityIcons name="magnify" size={20} color={colors.text.secondary} />
    <TextInput
      value={query}
      onChangeText={onChangeQuery}
      placeholder="Rechercher un accès admin"
      placeholderTextColor={colors.text.disabled}
      style={styles.searchInput}
      returnKeyType="search"
      selectionColor={colors.primary.main}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={false}
    />
    {query ? (
      <Pressable
        onPress={onClear}
        style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
        accessibilityLabel="Effacer la recherche"
      >
        <MaterialCommunityIcons name="close" size={18} color={colors.text.secondary} />
      </Pressable>
    ) : null}
  </View>
);

export default MenuDirectorySearch;
