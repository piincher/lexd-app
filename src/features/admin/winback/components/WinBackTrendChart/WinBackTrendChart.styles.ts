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
      height: 180,
      backgroundColor: colors.neutral[100],
      borderRadius: 12,
    },
    title: {
      fontFamily: Fonts.BOLD,
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 10,
    },
    emptyText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 13,
      color: colors.text.disabled,
      textAlign: "center",
      paddingVertical: 20,
    },
    scrollContent: {
      paddingRight: 8,
      gap: 8,
    },
    barGroup: {
      alignItems: "center",
      width: 36,
    },
    barTrack: {
      justifyContent: "flex-end",
      alignItems: "center",
      width: 36,
      position: "relative",
    },
    barSent: {
      width: 20,
      borderRadius: 4,
      position: "absolute",
      bottom: 0,
    },
    barResp: {
      width: 20,
      borderRadius: 4,
      position: "absolute",
      bottom: 0,
      opacity: 0.7,
    },
    barSentLabel: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 10,
      color: colors.text.primary,
      marginTop: 4,
    },
    barDate: {
      fontFamily: Fonts.REGULAR,
      fontSize: 9,
      color: colors.text.disabled,
      marginTop: 2,
    },
    legend: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 16,
      marginTop: 10,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    legendText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.text.secondary,
    },
  });
