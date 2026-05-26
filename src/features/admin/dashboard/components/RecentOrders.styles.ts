import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import type { ThemeContextType } from "@src/constants/Theme";

type AppThemeColors = ThemeContextType["colors"];

export const createStyles = (colors: AppThemeColors, isDark: boolean) =>
  StyleSheet.create({
    card: {
      marginBottom: 16,
      borderRadius: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      ...Theme.shadows.sm,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    headerIcon: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: isDark ? colors.primary.main + "20" : colors.primary[50],
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    viewAll: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      paddingHorizontal: 10,
      minHeight: 44,
      borderRadius: 10,
      backgroundColor: isDark ? colors.primary.main + "18" : colors.primary[50],
      borderWidth: 1,
      borderColor: isDark ? colors.primary.main + "26" : colors.primary[100],
    },
    viewAllText: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      color: colors.primary.main,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 58,
      paddingVertical: 9,
    },
    itemDivider: {
      height: 1,
      backgroundColor: colors.divider,
      marginLeft: 52,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    avatarText: {
      fontSize: 14,
      fontFamily: Fonts.bold,
    },
    middle: {
      flex: 1,
    },
    clientName: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    subRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 2,
    },
    orderCode: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    dot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: colors.text.disabled,
    },
    date: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    statusPill: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 999,
      marginLeft: 8,
    },
    statusText: {
      fontSize: 10,
      fontFamily: Fonts.bold,
      textTransform: "capitalize",
    },
    empty: {
      alignItems: "center",
      paddingVertical: 32,
    },
    emptyIcon: {
      width: 52,
      height: 52,
      borderRadius: 16,
      backgroundColor: isDark ? colors.background.elevated : colors.background.paper,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    emptyTitle: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    emptyText: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      marginTop: 2,
    },
  });
