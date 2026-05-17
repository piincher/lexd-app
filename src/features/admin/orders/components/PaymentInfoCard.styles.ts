import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createPaymentInfoCardStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      elevation: 2,
      backgroundColor: colors.background.card,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "600",
      fontFamily: Fonts.semiBold,
      marginLeft: 8,
      color: colors.text.primary,
    },
    amountContainer: {
      alignItems: "center",
      paddingVertical: 16,
      backgroundColor: colors.status.success + "15",
      borderRadius: 12,
      marginBottom: 16,
    },
    amountLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      marginBottom: 4,
    },
    amountValue: {
      fontSize: 28,
      fontWeight: "700",
      fontFamily: Fonts.bold,
      color: colors.status.success,
    },
    divider: {
      marginVertical: 12,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    infoLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: "600",
      fontFamily: Fonts.semiBold,
      color: colors.text.primary,
      flex: 1,
      textAlign: "right",
      marginLeft: 16,
    },
    methodContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    methodText: {
      fontSize: 14,
      fontWeight: "600",
      fontFamily: Fonts.semiBold,
      marginLeft: 6,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 16,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "600",
      fontFamily: Fonts.semiBold,
    },
    notesContainer: {
      marginTop: 8,
    },
    notesLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      marginBottom: 8,
    },
    notesText: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.primary,
      lineHeight: 20,
    },
  });
