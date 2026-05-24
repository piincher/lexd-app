import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeContextType } from "@src/constants/Theme";

type AppThemeColors = ThemeContextType["colors"];

export const createMenuCategoriesStyles = (colors: AppThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
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
    },
    sectionHint: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    card: {
      marginBottom: 10,
      borderRadius: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
      ...Theme.shadows.sm,
    },
    categoryHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      paddingTop: 14,
      paddingBottom: 10,
      gap: 10,
    },
    categoryIconWrap: {
      width: 34,
      height: 34,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryTitle: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      flex: 1,
    },
    itemCount: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 9,
      backgroundColor: isDark ? colors.action.hover : colors.background.paper,
      overflow: "hidden",
    },
    divider: {
      height: 1,
      backgroundColor: colors.divider,
      marginHorizontal: 14,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: 48,
      paddingVertical: 10,
      paddingHorizontal: 14,
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
      backgroundColor: colors.status.error,
      justifyContent: "center",
      alignItems: "center",
    },
    badgeText: {
      fontSize: 10,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
    },
  });
