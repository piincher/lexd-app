import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
      ...Theme.shadows.sm,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    headerLeft: {
      flex: 1,
      minWidth: 0,
      gap: 7,
    },
    // Category now reads as a small color dot + label, lighter than a filled pill.
    badgeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    catDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
    },
    badgeText: {
      fontFamily: Fonts.bold,
      fontSize: 10,
      letterSpacing: 0.5,
      textTransform: "uppercase",
    },
    question: {
      fontFamily: Fonts.medium,
      fontSize: 15,
      color: colors.text.primary,
      lineHeight: 21,
    },
    chevronWrap: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background.paper,
    },
    body: {
      marginTop: 14,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    answer: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 22,
    },
    actions: {
      marginTop: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    feedbackRow: {
      flex: 1,
      minWidth: 0,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap",
    },
    feedbackLabel: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.disabled,
    },
    feedbackButtons: {
      flexDirection: "row",
      gap: 8,
    },
    feedbackBtn: {
      width: 34,
      height: 34,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconActions: {
      flexDirection: "row",
      gap: 8,
    },
    iconBtn: {
      width: 34,
      height: 34,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
    },
  });
