import { StyleSheet } from "react-native";
import { Theme, lightTheme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";

export type KPICardColors = typeof lightTheme.colors;

export const createKPICardsStyles = (colors: KPICardColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      gap: 12,
      marginBottom: 20,
    },
    row: {
      flexDirection: "row",
      gap: 12,
    },
    heroCard: {
      borderRadius: 20,
      overflow: "hidden",
      ...Theme.shadows.md,
    },
    heroGradient: {
      padding: 18,
      minHeight: 120,
      justifyContent: "space-between",
    },
    heroDecor: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: "rgba(255,255,255,0.08)",
    },
    heroTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    heroIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: "rgba(255,255,255,0.22)",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.25)",
    },
    heroTrend: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    heroTrendText: {
      color: colors.text.inverse,
      fontSize: 11,
      fontFamily: Fonts.bold,
    },
    heroValue: {
      fontSize: 34,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
      letterSpacing: -1,
    },
    heroLabel: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: "rgba(255,255,255,0.88)",
      marginTop: 2,
    },
    smallCard: {
      flex: 1,
      borderRadius: 18,
      padding: 14,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
      ...Theme.shadows.sm,
    },
    smallIconWrap: {
      width: 38,
      height: 38,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    smallValue: {
      fontSize: 22,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      letterSpacing: -0.5,
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
      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 2,
    },
  });
