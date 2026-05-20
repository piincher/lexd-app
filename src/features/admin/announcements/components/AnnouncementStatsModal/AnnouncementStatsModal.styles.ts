import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeColors } from "@src/constants/Theme";

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    container: {
      backgroundColor: colors.background.paper,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "85%",
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
    },
    headerTitle: {
      flex: 1,
      fontFamily: Fonts.BOLD,
      fontSize: 18,
      color: colors.text.primary,
    },
    closeButton: {
      padding: 4,
    },
    loadingContainer: {
      paddingVertical: 60,
      alignItems: "center",
    },
    loadingText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.secondary,
      marginTop: 12,
    },
    content: {
      padding: 16,
      paddingBottom: 32,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    statBox: {
      width: "47%",
      padding: 14,
      borderRadius: 12,
      backgroundColor: colors.background.default,
      borderLeftWidth: 4,
      alignItems: "flex-start",
    },
    statValue: {
      fontFamily: Fonts.BOLD,
      fontSize: 20,
      marginTop: 6,
    },
    statLabel: {
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
    },
    ratesContainer: {
      marginTop: 20,
      backgroundColor: colors.background.default,
      borderRadius: 12,
      padding: 14,
    },
    ratesTitle: {
      fontFamily: Fonts.BOLD,
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 12,
    },
    rateRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      gap: 10,
    },
    rateLabel: {
      width: 100,
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.text.secondary,
    },
    rateBarTrack: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.neutral[200],
      overflow: "hidden",
    },
    rateBarFill: {
      height: "100%",
      borderRadius: 4,
    },
    rateValue: {
      width: 45,
      fontFamily: Fonts.BOLD,
      fontSize: 12,
      color: colors.text.primary,
      textAlign: "right",
    },
  });
