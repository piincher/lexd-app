import { StyleSheet } from "react-native";

export const createOrderInfoCardStyles = (colors: any) =>
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
    codeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    codeText: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.status.success,
    },
  });
