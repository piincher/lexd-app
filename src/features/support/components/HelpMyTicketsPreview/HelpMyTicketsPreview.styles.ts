import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 4,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.primary,
    },
    seeAll: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.primary.main,
    },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: RADIUS.card,
      padding: 12,
      marginBottom: 8,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    content: {
      flex: 1,
    },
    subject: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.text.primary,
    },
    number: {
      fontFamily: Fonts.regular,
      fontSize: 11,
      color: colors.text.disabled,
      marginTop: 1,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: RADIUS.badge,
    },
    badgeText: {
      fontFamily: Fonts.bold,
      fontSize: 10,
      textTransform: "uppercase",
    },
  });
