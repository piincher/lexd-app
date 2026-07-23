import { StyleSheet } from "react-native";
import { RADIUS, HAIRLINE } from "@src/shared/ui/designLanguage";

export const createOrderInfoCardStyles = (colors: any) =>
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
    codeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    // Reference number: tracked, and brand green rather than "success" green,
    // since this identifies the order rather than reporting a good outcome.
    codeText: {
      fontSize: 14,
      fontWeight: "700",
      letterSpacing: 0.4,
      color: colors.primary.main,
    },
  });
