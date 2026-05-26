import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: 16,
      paddingBottom: 4,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.primary,
      marginBottom: 10,
      paddingHorizontal: 16,
    },
    scroll: {
      paddingHorizontal: 16,
      gap: 10,
    },
    card: {
      width: 230,
      height: 134,
      padding: 14,
      borderRadius: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...Theme.shadows.sm,
    },
    badge: {
      alignSelf: "flex-start",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
      marginBottom: 8,
    },
    badgeText: {
      fontFamily: Fonts.bold,
      fontSize: 10,
      letterSpacing: 0.4,
      textTransform: "uppercase",
    },
    question: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.text.primary,
      lineHeight: 18,
      flex: 1,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: 8,
    },
    meta: {
      fontFamily: Fonts.regular,
      fontSize: 11,
      color: colors.text.disabled,
    },
  });
