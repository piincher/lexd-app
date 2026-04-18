import React, { useMemo } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { MENU_CATEGORIES } from "../constants/menuData";

export const MenuCategories: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: 20,
        },
        sectionHeader: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
          paddingHorizontal: 4,
        },
        sectionTitle: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          letterSpacing: -0.3,
        },
        sectionHint: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        card: {
          marginBottom: 12,
          borderRadius: 20,
          backgroundColor: colors.background.card,
          borderWidth: 1,
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          overflow: "hidden",
          ...Theme.shadows.sm,
        },
        categoryHeader: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: 14,
          paddingBottom: 10,
          gap: 10,
        },
        categoryIconWrap: {
          width: 34,
          height: 34,
          borderRadius: 11,
          justifyContent: "center",
          alignItems: "center",
        },
        categoryTitle: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          flex: 1,
          letterSpacing: -0.2,
        },
        itemCount: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          paddingHorizontal: 8,
          paddingVertical: 3,
          borderRadius: 999,
          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
        },
        divider: {
          height: 1,
          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
          marginHorizontal: 16,
        },
        item: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 12,
          paddingHorizontal: 16,
        },
        itemLeft: {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          flex: 1,
        },
        itemBullet: {
          width: 5,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: colors.primary.main,
        },
        itemText: {
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: colors.text.primary,
          flex: 1,
        },
        itemRight: {
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        },
        badge: {
          minWidth: 22,
          height: 20,
          paddingHorizontal: 6,
          borderRadius: 999,
          backgroundColor: "#EF4444",
          justifyContent: "center",
          alignItems: "center",
        },
        badgeText: {
          fontSize: 10,
          fontFamily: Fonts.bold,
          color: "#FFF",
        },
      }),
    [colors, isDark]
  );

  const CATEGORY_COLORS: Record<number, string> = {
    0: "#3B82F6",
    1: "#10B981",
    2: "#F97316",
    3: "#A855F7",
    4: "#EC4899",
    5: "#0EA5E9",
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Toutes les fonctionnalités</Text>
        <Text style={styles.sectionHint}>{MENU_CATEGORIES.length} catégories</Text>
      </View>

      {MENU_CATEGORIES.map((category, catIdx) => {
        const accent = CATEGORY_COLORS[catIdx % 6] || colors.primary.main;
        return (
          <View key={category.id} style={styles.card}>
            <View style={styles.categoryHeader}>
              <View
                style={[
                  styles.categoryIconWrap,
                  { backgroundColor: accent + "20" },
                ]}
              >
                <MaterialCommunityIcons
                  name={category.icon as any}
                  size={18}
                  color={accent}
                />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.itemCount}>{category.items.length}</Text>
            </View>
            <View style={styles.divider} />
            {category.items.map((item, idx) => (
              <View key={item.id}>
                <Pressable
                  onPress={() => navigation.navigate(item.route as never)}
                  style={({ pressed }) => [
                    styles.item,
                    pressed && {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.02)",
                    },
                  ]}
                >
                  <View style={styles.itemLeft}>
                    <View
                      style={[styles.itemBullet, { backgroundColor: accent }]}
                    />
                    <Text style={styles.itemText} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.itemRight}>
                    {item.badge ? (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    ) : null}
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={18}
                      color={colors.text.disabled}
                    />
                  </View>
                </Pressable>
                {idx !== category.items.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
};

export default MenuCategories;
