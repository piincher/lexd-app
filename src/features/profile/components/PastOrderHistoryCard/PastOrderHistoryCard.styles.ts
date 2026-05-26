import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 8,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.06,
      shadowRadius: 14,
      elevation: 2,
    },
    cardPressed: {
      transform: [{ scale: 0.99 }],
      opacity: 0.92,
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      marginBottom: 12,
    },
    modePill: {
      minHeight: 32,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 10,
      borderRadius: 12,
      backgroundColor: colors.primary[50],
    },
    modeText: {
      fontFamily: Fonts.bold,
      fontSize: 12,
      color: colors.primary.main,
    },
    paymentPill: {
      minHeight: 32,
      justifyContent: "center",
      paddingHorizontal: 10,
      borderRadius: 12,
    },
    paymentPaid: {
      backgroundColor: colors.feedback.successBg,
    },
    paymentOpen: {
      backgroundColor: colors.feedback.warningBg,
    },
    paymentText: {
      fontFamily: Fonts.bold,
      fontSize: 12,
    },
    paymentPaidText: {
      color: colors.feedback.successDark,
    },
    paymentOpenText: {
      color: colors.feedback.warningDark,
    },
    mainRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    titleBlock: {
      flex: 1,
      minWidth: 0,
    },
    code: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
    },
    destination: {
      marginTop: 3,
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
    },
    detailRail: {
      flexDirection: "row",
      gap: 8,
      marginTop: 14,
    },
    detailItem: {
      flex: 0.9,
      minHeight: 58,
      borderRadius: 8,
      paddingHorizontal: 9,
      paddingVertical: 8,
      backgroundColor: colors.background.paper,
      justifyContent: "center",
    },
    detailItemWide: {
      flex: 1.15,
      minHeight: 58,
      borderRadius: 8,
      paddingHorizontal: 9,
      paddingVertical: 8,
      backgroundColor: colors.background.paper,
      justifyContent: "center",
    },
    detailValue: {
      fontFamily: Fonts.bold,
      fontSize: 13,
      color: colors.text.primary,
    },
    detailLabel: {
      marginTop: 2,
      fontFamily: Fonts.regular,
      fontSize: 10,
      color: colors.text.secondary,
    },
  });
