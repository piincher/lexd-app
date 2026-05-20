import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme['colors'];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 60,
      paddingHorizontal: 32,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.primary,
      marginTop: 16,
      textAlign: "center",
    },
    subtitle: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      marginTop: 6,
      textAlign: "center",
    },
  });
