import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 12,
      zIndex: 10,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputRowFocused: {
      borderColor: colors.primary.main,
    },
    input: {
      flex: 1,
      fontFamily: Fonts.regular,
      fontSize: 15,
      color: colors.text.primary,
      paddingVertical: 2,
    },
    dropdown: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginTop: 4,
      paddingVertical: 6,
      maxHeight: 280,
    },
    sectionLabel: {
      fontFamily: Fonts.bold,
      fontSize: 11,
      color: colors.text.disabled,
      textTransform: "uppercase",
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    historyHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingRight: 12,
    },
    clearText: {
      fontFamily: Fonts.medium,
      fontSize: 11,
      color: colors.primary.main,
    },
    dropdownItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    dropdownText: {
      flex: 1,
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
    },
  });
