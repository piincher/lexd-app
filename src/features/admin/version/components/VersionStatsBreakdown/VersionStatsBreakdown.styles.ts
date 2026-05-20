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
    },
    skeleton: {
      height: 120,
      backgroundColor: colors.neutral[100],
      borderRadius: 12,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    title: {
      fontFamily: Fonts.BOLD,
      fontSize: 14,
      color: colors.text.primary,
    },
    since: {
      fontFamily: Fonts.REGULAR,
      fontSize: 11,
      color: colors.text.disabled,
    },
    empty: {
      alignItems: "center",
      paddingVertical: 20,
    },
    emptyText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 13,
      color: colors.text.disabled,
      marginTop: 8,
    },
    row: {
      marginBottom: 10,
    },
    rowMeta: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 4,
    },
    versionText: {
      flex: 1,
      fontFamily: Fonts.MEDIUM,
      fontSize: 13,
      color: colors.text.primary,
    },
    countText: {
      fontFamily: Fonts.BOLD,
      fontSize: 13,
      color: colors.text.primary,
    },
    barTrack: {
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.neutral[200],
      overflow: "hidden",
    },
    barFill: {
      height: "100%",
      borderRadius: 3,
    },
  });
