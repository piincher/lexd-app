import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";
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
    row: {
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 16,
    },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      paddingLeft: 12,
      paddingRight: 8,
      paddingVertical: 9,
      borderRadius: RADIUS.badge,
      backgroundColor: colors.background.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    label: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.text.primary,
    },
    labelActive: {
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
    },
    countPill: {
      minWidth: 20,
      paddingHorizontal: 6,
      paddingVertical: 1,
      borderRadius: RADIUS.badge,
      backgroundColor: colors.background.paper,
      alignItems: "center",
    },
    countPillActive: {
      backgroundColor: "rgba(255,255,255,0.25)",
    },
    count: {
      fontFamily: Fonts.bold,
      fontSize: 11,
      color: colors.text.secondary,
    },
    countActive: {
      color: colors.text.inverse,
    },
  });
