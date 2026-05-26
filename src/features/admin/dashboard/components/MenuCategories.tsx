import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigationProps } from "@src/app/navigation/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { MENU_CATEGORIES } from "../constants/menuData";
import { MenuDirectorySearch } from "./MenuDirectorySearch";
import { MenuDirectoryTabs } from "./MenuDirectoryTabs";
import { MenuCategoryCard } from "./MenuCategoryCard";
import { createMenuCategoriesStyles } from "./MenuCategories.styles";

const ALL_CATEGORY = "all";

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("fr-FR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const MenuCategories: React.FC = () => {
  const navigation = useNavigation<navigationProps>();
  const { colors, isDark } = useAppTheme();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);

  const styles = useMemo(() => createMenuCategoriesStyles(colors, isDark), [colors, isDark]);

  const categoryColors = useMemo<Record<string, string>>(
    () => ({
      goods: colors.status.info,
      orders: colors.status.success,
      logistics: colors.status.warning,
      customers: colors.primary.main,
      tools: colors.accent.rose,
      [ALL_CATEGORY]: colors.primary.main,
    }),
    [colors]
  );

  const visibleCategories = useMemo(() => {
    const needle = normalize(query.trim());

    return MENU_CATEGORIES
      .filter((category) =>
        selectedCategory === ALL_CATEGORY || category.id === selectedCategory
      )
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          if (!needle) return true;
          const haystack = normalize(
            `${category.title} ${item.title} ${item.description}`
          );
          return haystack.includes(needle);
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [query, selectedCategory]);

  const totalVisibleItems = visibleCategories.reduce(
    (sum, category) => sum + category.items.length,
    0
  );
  const totalCommandCount = MENU_CATEGORIES.reduce(
    (sum, category) => sum + category.items.length,
    0
  );

  const tabs = [
    { id: ALL_CATEGORY, title: "Tous", count: totalCommandCount },
    ...MENU_CATEGORIES.map((category) => ({
      id: category.id,
      title: category.title,
      count: category.items.length,
    })),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitle}>Répertoire admin</Text>
          <Text style={styles.sectionHint}>{totalVisibleItems} accès disponibles</Text>
        </View>
        <View style={styles.directoryBadge}>
          <MaterialCommunityIcons name="view-dashboard-edit" size={14} color={colors.primary.main} />
          <Text style={styles.directoryBadgeText}>{totalCommandCount}</Text>
        </View>
      </View>

      <MenuDirectorySearch
        styles={styles}
        colors={colors}
        query={query}
        onChangeQuery={setQuery}
        onClear={() => setQuery("")}
      />

      <MenuDirectoryTabs
        styles={styles}
        colors={colors}
        tabs={tabs}
        selectedCategory={selectedCategory}
        categoryColors={categoryColors}
        onSelectCategory={setSelectedCategory}
      />

      <View style={styles.directoryShell}>
        {visibleCategories.length > 0 ? (
          visibleCategories.map((category, index) => (
            <MenuCategoryCard
              key={category.id}
              styles={styles}
              category={category}
              accent={categoryColors[category.id] || colors.primary.main}
              disabledColor={colors.text.disabled}
              onItemPress={(route) => navigation.navigate(route as never)}
              isLastCategory={index === visibleCategories.length - 1}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="magnify-close" size={26} color={colors.text.disabled} />
            <Text style={styles.emptyTitle}>Aucun accès trouvé</Text>
            <Text style={styles.emptyText}>Essayez un autre mot-clé.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MenuCategories;
