import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";

export const createMenuCategoriesStyles = (colors: any, isDark: boolean) =>
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
