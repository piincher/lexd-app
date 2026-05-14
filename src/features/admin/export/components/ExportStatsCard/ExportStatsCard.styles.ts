import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    statsCard: {
      margin: 16,
      marginTop: 0,
      backgroundColor: colors.background.card,
    },
    statsTitle: {
      marginBottom: 12,
      fontWeight: "500",
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    statItem: {
      alignItems: "center",
    },
    statValue: {
      fontWeight: "700",
    },
    statLabel: {
      color: colors.text.secondary,
      marginTop: 4,
    },
    successValue: {
      color: colors.status.success,
    },
    failedValue: {
      color: colors.status.error,
    },
  });
