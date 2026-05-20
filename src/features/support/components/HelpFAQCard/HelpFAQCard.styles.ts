import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 14,
      padding: 14,
      marginHorizontal: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    headerLeft: {
      flex: 1,
      gap: 6,
    },
    badge: {
      alignSelf: "flex-start",
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
      fontSize: 14,
      color: colors.text.primary,
      lineHeight: 20,
    },
    body: {
      marginTop: 12,
      paddingTop: 12,
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
      marginTop: 14,
      gap: 10,
    },
    feedbackRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
      padding: 6,
      borderRadius: 8,
      backgroundColor: colors.background.default,
    },
    iconActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 8,
    },
    iconBtn: {
      padding: 6,
      borderRadius: 8,
      backgroundColor: colors.background.default,
    },
  });
