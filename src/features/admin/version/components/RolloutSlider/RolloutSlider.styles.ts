import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeColors } from "@src/constants/Theme";

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      marginHorizontal: 16,
      marginTop: 12,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
    },
    title: {
      flex: 1,
      fontFamily: Fonts.BOLD,
      fontSize: 14,
      color: colors.text.primary,
    },
    valueBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
    },
    valueText: {
      fontFamily: Fonts.BOLD,
      fontSize: 14,
    },
    barTrack: {
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.neutral[200],
      overflow: "hidden",
      marginBottom: 12,
    },
    barFill: {
      height: "100%",
      borderRadius: 4,
    },
    presetsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
    },
    presetButton: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    presetText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 12,
      color: colors.text.secondary,
    },
    hint: {
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.text.disabled,
      marginTop: 10,
      textAlign: "center",
    },
  });
