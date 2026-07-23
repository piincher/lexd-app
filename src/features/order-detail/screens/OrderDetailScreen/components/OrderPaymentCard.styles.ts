import { StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RADIUS, HAIRLINE } from "@src/shared/ui/designLanguage";

export const useOrderPaymentCardStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
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
