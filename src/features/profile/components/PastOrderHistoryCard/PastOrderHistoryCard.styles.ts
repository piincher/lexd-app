import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: RADIUS.card,
      padding: 14,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
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
      borderRadius: RADIUS.badge,
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
      borderRadius: RADIUS.badge,
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
      borderRadius: RADIUS.control,
      paddingHorizontal: 9,
      paddingVertical: 8,
      backgroundColor: colors.background.paper,
      justifyContent: "center",
    },
    detailItemWide: {
      flex: 1.15,
      minHeight: 58,
      borderRadius: RADIUS.control,
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
      fontWeight: "700",
      letterSpacing: 0.6,
      textTransform: "uppercase",
      color: colors.text.secondary,
    },
  });
