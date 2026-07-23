import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      zIndex: 10,
    },
    // Elevated card so the bar reads as a floating control over the hero edge.
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 14,
      paddingVertical: 13,
      borderRadius: RADIUS.control,
      backgroundColor: colors.background.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      ...Theme.shadows.md,
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
      borderRadius: RADIUS.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      marginTop: 6,
      paddingVertical: 6,
      maxHeight: 280,
      ...Theme.shadows.md,
    },
    sectionLabel: {
      fontFamily: Fonts.bold,
      fontSize: 11,
      color: colors.text.disabled,
      textTransform: "uppercase",
      letterSpacing: 0.7,
      paddingHorizontal: 14,
      paddingVertical: 6,
    },
    historyHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingRight: 14,
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
      paddingHorizontal: 14,
      paddingVertical: 11,
    },
    dropdownText: {
      flex: 1,
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
    },
  });
