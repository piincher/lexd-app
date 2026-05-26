import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 18,
      paddingBottom: 4,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.primary,
      marginBottom: 10,
    },
    grid: {
      flexDirection: "row",
      gap: 10,
    },
    card: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 4,
      borderRadius: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...Theme.shadows.sm,
    },
    iconWrapper: {
      width: 46,
      height: 46,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    label: {
      fontFamily: Fonts.medium,
      fontSize: 11.5,
      color: colors.text.secondary,
      textAlign: "center",
    },
  });
