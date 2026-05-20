import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme['colors'];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
      paddingVertical: 8,
      gap: 8,
    },
    searchRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background.default,
      marginHorizontal: 16,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
      paddingVertical: 4,
    },
    chipScroll: {
      paddingHorizontal: 16,
      gap: 8,
    },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: colors.neutral[100],
      marginRight: 6,
    },
    chipActive: {
      backgroundColor: colors.primary.main,
    },
    chipText: {
      fontFamily: Fonts.medium,
      fontSize: 12,
      color: colors.text.secondary,
    },
    chipTextActive: {
      color: colors.text.inverse,
    },
  });
