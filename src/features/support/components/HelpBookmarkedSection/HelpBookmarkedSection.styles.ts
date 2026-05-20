import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
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
      width: 240,
      padding: 12,
      borderRadius: 14,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: 10,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
    },
    badgeText: {
      fontFamily: Fonts.bold,
      fontSize: 10,
      textTransform: "uppercase",
    },
    question: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.text.primary,
      lineHeight: 18,
    },
  });
