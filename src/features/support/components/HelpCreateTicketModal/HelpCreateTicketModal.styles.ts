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
      maxHeight: "92%",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 8,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
    },
    closeBtn: {
      padding: 4,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 24,
      gap: 12,
    },
    sectionLabel: {
      fontFamily: Fonts.bold,
      fontSize: 13,
      color: colors.text.primary,
      marginTop: 4,
    },
    typeGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    typeCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border,
    },
    typeCardActive: {
      borderColor: colors.primary.main + "40",
      backgroundColor: colors.primary.main + "08",
    },
    typeLabel: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.text.secondary,
    },
    typeLabelActive: {
      color: colors.primary.main,
    },
    priorityRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    priorityChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border,
    },
    priorityDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    priorityLabel: {
      fontFamily: Fonts.medium,
      fontSize: 12,
      color: colors.text.secondary,
    },
    input: {
      backgroundColor: colors.background.default,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
    },
    textArea: {
      minHeight: 100,
      paddingTop: 12,
    },
    submitBtn: {
      marginTop: 8,
      paddingVertical: 14,
      borderRadius: 14,
      backgroundColor: colors.primary.main,
      alignItems: "center",
    },
    submitBtnDisabled: {
      opacity: 0.5,
    },
    submitText: {
      fontFamily: Fonts.bold,
      fontSize: 15,
      color: colors.text.inverse,
    },
    success: {
      alignItems: "center",
      paddingVertical: 40,
      paddingHorizontal: 24,
      gap: 12,
    },
    successTitle: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
    },
    successSubtitle: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: "center",
    },
  });
