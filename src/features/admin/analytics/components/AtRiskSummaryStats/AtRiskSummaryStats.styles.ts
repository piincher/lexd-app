import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme['colors'];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: colors.background.card,
    },
    card: {
      flex: 1,
      backgroundColor: colors.background.default,
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 8,
      alignItems: "center",
      borderLeftWidth: 3,
    },
    value: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
      marginTop: 6,
    },
    label: {
      fontFamily: Fonts.medium,
      fontSize: 10,
      color: colors.text.secondary,
      marginTop: 2,
      textAlign: "center",
    },
  });
