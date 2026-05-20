import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "#00000080",
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: colors.background.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      maxHeight: "90%",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 4,
    },
    closeBtn: {
      padding: 6,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 20,
    },
    badge: {
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 8,
      marginBottom: 12,
    },
    badgeText: {
      fontFamily: Fonts.bold,
      fontSize: 11,
      textTransform: "uppercase",
    },
    question: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
      lineHeight: 26,
      marginBottom: 16,
    },
    answer: {
      fontFamily: Fonts.regular,
      fontSize: 15,
      color: colors.text.secondary,
      lineHeight: 24,
    },
    tags: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 20,
    },
    tag: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tagText: {
      fontFamily: Fonts.medium,
      fontSize: 11,
      color: colors.text.secondary,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 10,
    },
    feedbackLabel: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.text.secondary,
      textAlign: "center",
    },
    feedbackButtons: {
      flexDirection: "row",
      gap: 12,
    },
    feedbackBtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: colors.background.default,
      borderWidth: 1,
    },
    feedbackBtnText: {
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
  });
