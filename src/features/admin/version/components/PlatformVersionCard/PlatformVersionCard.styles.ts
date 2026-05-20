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
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    title: {
      flex: 1,
      fontFamily: Fonts.BOLD,
      fontSize: 16,
      color: colors.text.primary,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
    },
    badgeText: {
      fontFamily: Fonts.BOLD,
      fontSize: 10,
      textTransform: "uppercase",
    },
    versionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      marginBottom: 14,
      paddingVertical: 10,
      backgroundColor: colors.background.default,
      borderRadius: 12,
    },
    versionItem: {
      alignItems: "center",
      minWidth: 80,
    },
    versionLabel: {
      fontFamily: Fonts.REGULAR,
      fontSize: 11,
      color: colors.text.disabled,
    },
    versionValue: {
      fontFamily: Fonts.BOLD,
      fontSize: 15,
      color: colors.text.primary,
      marginTop: 2,
    },
    field: {
      marginBottom: 10,
    },
    fieldLabel: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 12,
      color: colors.text.secondary,
      marginBottom: 4,
    },
    input: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.background.default,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    inputText: {
      flex: 1,
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.primary,
    },
    toggleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 4,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border.light,
    },
    toggleLabelCol: {
      flex: 1,
    },
    toggleLabel: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 14,
      color: colors.text.primary,
    },
    toggleSubLabel: {
      fontFamily: Fonts.REGULAR,
      fontSize: 11,
      color: colors.text.disabled,
      marginTop: 2,
    },
  });
