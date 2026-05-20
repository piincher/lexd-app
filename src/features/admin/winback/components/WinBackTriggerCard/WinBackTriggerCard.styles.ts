import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeColors } from "@src/constants/Theme";

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    cardDisabled: {
      opacity: 0.7,
      borderColor: colors.neutral[200],
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    iconRow: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    titleCol: {
      flex: 1,
    },
    title: {
      fontFamily: Fonts.BOLD,
      fontSize: 15,
      color: colors.text.primary,
    },
    textDisabled: {
      color: colors.text.disabled,
    },
    subtitle: {
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
    },
    toggle: {
      width: 48,
      height: 26,
      borderRadius: 13,
      backgroundColor: colors.neutral[300],
      padding: 3,
      marginLeft: 8,
    },
    toggleActive: {
      backgroundColor: colors.primary.main,
    },
    toggleKnob: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.background.paper,
      transform: [{ translateX: 0 }],
    },
    toggleKnobActive: {
      transform: [{ translateX: 22 }],
    },
    detailsRow: {
      flexDirection: "row",
      marginTop: 14,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border.light,
      gap: 12,
    },
    detailItem: {
      flex: 1,
      alignItems: "center",
    },
    detailLabel: {
      fontFamily: Fonts.REGULAR,
      fontSize: 11,
      color: colors.text.disabled,
    },
    detailValue: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 13,
      color: colors.text.primary,
      marginTop: 2,
    },
    actionRow: {
      flexDirection: "row",
      marginTop: 12,
      gap: 10,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 10,
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    actionText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 13,
    },
  });
