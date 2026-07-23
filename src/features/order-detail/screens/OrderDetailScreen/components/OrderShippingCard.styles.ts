import { StyleSheet } from "react-native";
import { RADIUS, HAIRLINE } from "@src/shared/ui/designLanguage";

export const getOrderShippingCardStyles = (colors: any) =>
  StyleSheet.create({
    // Border-first: hairline edge instead of elevation.
    card: {
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: RADIUS.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      elevation: 0,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    headerTitle: {
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 0.8,
      textTransform: "uppercase",
      color: colors.text.secondary,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    infoRowLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    infoLabel: {
      fontSize: 13,
      color: colors.text.secondary,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text.primary,
      maxWidth: "50%",
      textAlign: "right",
    },
    divider: {
      backgroundColor: colors.border,
    },
  });
