import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 16,
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
      flexWrap: "wrap",
      gap: 8,
    },
    card: {
      width: "31%",
      alignItems: "center",
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 6,
    },
    label: {
      fontFamily: Fonts.medium,
      fontSize: 11,
      color: colors.text.primary,
      textAlign: "center",
    },
    count: {
      fontFamily: Fonts.regular,
      fontSize: 10,
      color: colors.text.disabled,
      marginTop: 2,
    },
  });
