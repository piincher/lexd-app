import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme['colors'];

export const getStyles = (colors: ThemeColors, _isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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
      minHeight: 52,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
      paddingVertical: 4,
    },
    clearButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    chipScroll: {
      paddingHorizontal: 16,
      gap: 8,
    },
    chip: {
      paddingHorizontal: 14,
      minHeight: 44,
      justifyContent: "center",
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
