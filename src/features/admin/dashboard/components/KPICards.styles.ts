import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeContextType } from "@src/constants/Theme";

type AppThemeColors = ThemeContextType["colors"];

export const createStyles = (colors: AppThemeColors, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      gap: 12,
      marginBottom: 16,
    },
    row: {
      flexDirection: "row",
      gap: 12,
    },
    heroCard: {
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...Theme.shadows.sm,
    },
    heroAccentBar: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: colors.status.info,
    },
    heroBody: {
      padding: 16,
      minHeight: 112,
      justifyContent: "space-between",
    },
    heroTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    heroIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    heroTrend: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 10,
      backgroundColor: isDark ? colors.action.hover : colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
    },
    heroTrendText: {
      color: colors.text.secondary,
      fontSize: 11,
      fontFamily: Fonts.bold,
    },
    heroValue: {
      fontSize: 32,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    heroLabel: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      marginTop: 2,
    },
    smallCard: {
      flex: 1,
      minHeight: 122,
      borderRadius: 14,
      padding: 14,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...Theme.shadows.sm,
    },
    smallIconWrap: {
      width: 38,
      height: 38,
      borderRadius: 11,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    smallValue: {
      fontSize: 22,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    smallLabel: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      marginTop: 2,
    },
    progressTrack: {
      marginTop: 10,
      height: 4,
      borderRadius: 2,
      backgroundColor: isDark ? colors.action.selected : colors.neutral[100],
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 2,
    },
    pressed: {
      opacity: 0.9,
      transform: [{ scale: 0.99 }],
    },
  });
