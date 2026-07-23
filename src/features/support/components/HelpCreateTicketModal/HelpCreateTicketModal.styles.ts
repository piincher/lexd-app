import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors.background.overlay,
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: colors.background.card,
      borderTopLeftRadius: RADIUS.sheet,
      borderTopRightRadius: RADIUS.sheet,
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
      // Waybill tracked uppercase micro-label (form section eyebrow).
      fontFamily: Fonts.bold,
      fontSize: 11,
      letterSpacing: 0.7,
      textTransform: "uppercase",
      color: colors.text.secondary,
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
      borderRadius: RADIUS.control,
      backgroundColor: colors.background.default,
      borderWidth: HAIRLINE,
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
      borderRadius: RADIUS.badge,
      backgroundColor: colors.background.default,
      borderWidth: HAIRLINE,
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
      borderRadius: RADIUS.control,
      borderWidth: HAIRLINE,
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
      borderRadius: RADIUS.control,
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
