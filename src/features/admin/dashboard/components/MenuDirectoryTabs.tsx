import React from "react";
import { Pressable, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import type { ThemeContextType } from "@src/constants/Theme";
import type { createMenuCategoriesStyles } from "./MenuCategories.styles";

type MenuCategoryStyles = ReturnType<typeof createMenuCategoriesStyles>;
type AppThemeColors = ThemeContextType["colors"];

export interface DirectoryTab {
  id: string;
  title: string;
  count: number;
}

interface MenuDirectoryTabsProps {
  styles: MenuCategoryStyles;
  colors: AppThemeColors;
  tabs: DirectoryTab[];
  selectedCategory: string;
  categoryColors: Record<string, string>;
  onSelectCategory: (id: string) => void;
}

export const MenuDirectoryTabs: React.FC<MenuDirectoryTabsProps> = ({
  styles,
  colors,
  tabs,
  selectedCategory,
  categoryColors,
  onSelectCategory,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.tabsContent}
    style={styles.tabsRail}
  >
    {tabs.map((tab) => {
      const isActive = selectedCategory === tab.id;
      const accent = categoryColors[tab.id] || colors.primary.main;
      return (
        <Pressable
          key={tab.id}
          onPress={() => onSelectCategory(tab.id)}
          style={[
            styles.tab,
            isActive && styles.tabActive,
            isActive && { borderColor: accent, backgroundColor: accent + "16" },
          ]}
          accessibilityLabel={`Filtrer ${tab.title}`}
        >
          <Text numberOfLines={1} style={[styles.tabText, isActive && { color: accent }]}>
            {tab.title}
          </Text>
          <Text style={[styles.tabCount, isActive && { color: accent }]}>{tab.count}</Text>
        </Pressable>
      );
    })}
  </ScrollView>
);

export default MenuDirectoryTabs;
