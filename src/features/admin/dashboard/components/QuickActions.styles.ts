import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import type { ThemeContextType } from "@src/constants/Theme";

type AppThemeColors = ThemeContextType["colors"];

export const getQuickActionsStyles = (colors: AppThemeColors) =>
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
    sectionBadge: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    item: {
      width: "48%",
      minHeight: 76,
      borderRadius: 14,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...Theme.shadows.sm,
    },
    itemPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    actionContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      padding: 12,
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionText: {
      flex: 1,
      minWidth: 0,
    },
    title: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    subtitle: {
      fontSize: 10,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      marginTop: 1,
    },
  });
