import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { FAQ_CATEGORY_COLORS, FAQ_CATEGORY_ICONS } from "../../types";
import type { FAQCategoryCount } from "../../types";

import { getStyles } from "./HelpCategoryGrid.styles";

type HelpCategoryGridProps = {
  categories: FAQCategoryCount[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
};

export function HelpCategoryGrid({ categories, activeCategory, onSelectCategory }: HelpCategoryGridProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  const allCats = [
    { id: "all", label: "Toutes", count: categories.reduce((sum, c) => sum + c.count, 0) },
    ...categories,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parcourir par catégorie</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {allCats.map((cat) => {
          const isActive = activeCategory === cat.id;
          const catKey = cat.id.toLowerCase() as keyof typeof FAQ_CATEGORY_COLORS;
          const catColor = FAQ_CATEGORY_COLORS[catKey] || colors.primary.main;
          const iconName = FAQ_CATEGORY_ICONS[catKey] || "help-circle-outline";
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.chip,
                isActive && { backgroundColor: catColor, borderColor: catColor },
              ]}
              onPress={() => onSelectCategory(cat.id)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name={iconName as React.ComponentProps<typeof MaterialCommunityIcons>["name"]}
                size={16}
                color={isActive ? colors.text.inverse : catColor}
              />
              <Text style={[styles.label, isActive && styles.labelActive]}>{cat.label}</Text>
              <View style={[styles.countPill, isActive && styles.countPillActive]}>
                <Text style={[styles.count, isActive && styles.countActive]}>{cat.count}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
