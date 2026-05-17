import React, { useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { MENU_CATEGORIES } from "../constants/menuData";
import { MenuCategoryCard } from "./MenuCategoryCard";
import { createMenuCategoriesStyles } from "./MenuCategories.styles";

export const MenuCategories: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(() => createMenuCategoriesStyles(colors, isDark), [colors, isDark]);

  const CATEGORY_COLORS: Record<number, string> = {
    0: colors.status.info,
    1: colors.status.success,
    2: colors.status.warning,
    3: colors.primary.main,
    4: colors.accent.rose,
    5: colors.status.info,
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Toutes les fonctionnalités</Text>
        <Text style={styles.sectionHint}>{MENU_CATEGORIES.length} catégories</Text>
      </View>

      {MENU_CATEGORIES.map((category, catIdx) => (
        <MenuCategoryCard
          key={category.id}
          styles={styles}
          category={category}
          accent={CATEGORY_COLORS[catIdx % 6] || colors.primary.main}
          isDark={isDark}
          disabledColor={colors.text.disabled}
          onItemPress={(route) => navigation.navigate(route as never)}
        />
      ))}
    </View>
  );
};

export default MenuCategories;
