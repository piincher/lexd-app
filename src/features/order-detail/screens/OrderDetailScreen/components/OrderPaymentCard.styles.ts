import { StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const useOrderPaymentCardStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
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
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    label: {
      fontSize: 13,
      color: colors.text.secondary,
    },
    value: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text.primary,
    },
    totalValue: {
      fontSize: 16,
      fontWeight: "800",
      color: colors.text.primary,
    },
    divider: {
      backgroundColor: colors.border,
    },
  });
};
