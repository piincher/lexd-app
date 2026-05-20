import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: { width: "100%" },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 56,
      paddingVertical: 14,
      borderRadius: 14,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    primaryButton: { backgroundColor: colors.background.paper, width: "100%" },
    nextButton: {
      backgroundColor: colors.neutral.white + "40",
      minWidth: 136,
      paddingHorizontal: 24,
      borderWidth: 1,
      borderColor: colors.neutral.white + "4D",
    },
    nextButtonCompact: { minWidth: 124, paddingHorizontal: 18 },
    skipSlot: { flex: 1, alignItems: "flex-start", minWidth: 0 },
    nextSlot: { flex: 1, alignItems: "flex-end", minWidth: 0 },
    skipButton: {
      minHeight: 48,
      justifyContent: "center",
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    skipText: {
      color: colors.neutral.white + "CC",
      fontSize: 16,
      fontFamily: Fonts.medium,
      fontWeight: "500",
    },
    primaryText: {
      color: colors.primary.main,
      fontSize: 18,
      fontFamily: Fonts.bold,
      fontWeight: "700",
    },
    nextText: {
      color: colors.neutral.white,
      fontSize: 16,
      fontFamily: Fonts.semiBold,
      fontWeight: "600",
    },
    icon: { marginLeft: 8 },
    iconSmall: { marginLeft: 6 },
  });
