import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme['colors'];

export const getStyles = (colors: ThemeColors, _isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "#00000080",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    sheet: {
      backgroundColor: colors.background.card,
      borderRadius: 24,
      padding: 20,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
    },
    closeBtn: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    subtitle: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      marginBottom: 16,
    },
    triggerList: {
      gap: 8,
      marginBottom: 16,
    },
    triggerItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 12,
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border,
    },
    triggerItemActive: {
      borderColor: colors.primary.main + "40",
      backgroundColor: colors.primary.main + "08",
    },
    triggerText: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.primary,
    },
    triggerCopy: {
      flex: 1,
      gap: 2,
    },
    triggerDescription: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 17,
      color: colors.text.secondary,
    },
    triggerTextActive: {
      color: colors.primary.main,
    },
    triggerBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 14,
      borderRadius: 14,
      backgroundColor: colors.primary.main,
    },
    triggerBtnDisabled: {
      opacity: 0.6,
    },
    triggerBtnText: {
      fontFamily: Fonts.bold,
      fontSize: 15,
      color: colors.text.inverse,
    },
  });
