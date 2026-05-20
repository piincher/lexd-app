import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  const allCats = [
    { id: "all", label: "Toutes", count: categories.reduce((sum, c) => sum + c.count, 0) },
    ...categories,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parcourir par catégorie</Text>
      <View style={styles.grid}>
        {allCats.map((cat) => {
          const isActive = activeCategory === cat.id;
          const catKey = cat.id.toLowerCase() as keyof typeof FAQ_CATEGORY_COLORS;
          const catColor = FAQ_CATEGORY_COLORS[catKey] || colors.primary.main;
          const iconName = FAQ_CATEGORY_ICONS[catKey] || "help-circle-outline";
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.card,
                isActive && { borderColor: catColor, backgroundColor: catColor + "08" },
              ]}
              onPress={() => onSelectCategory(cat.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrapper, { backgroundColor: catColor + "12" }]}>
                <MaterialCommunityIcons
                  name={iconName as React.ComponentProps<typeof MaterialCommunityIcons>["name"]}
                  size={20}
                  color={catColor}
                />
              </View>
              <Text style={[styles.label, isActive && { color: catColor, fontFamily: Fonts.bold }]}>
                {cat.label}
              </Text>
              <Text style={styles.count}>{cat.count} article{cat.count > 1 ? "s" : ""}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
