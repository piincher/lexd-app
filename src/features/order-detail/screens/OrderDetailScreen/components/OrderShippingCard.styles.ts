import { StyleSheet } from "react-native";

export const getOrderShippingCardStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 14,
      elevation: 2,
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
      fontSize: 16,
      fontWeight: "700",
      color: colors.text.primary,
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
