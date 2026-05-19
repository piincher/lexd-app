import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      padding: 16,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    compactContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 8,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    statusText: {
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
      color: colors.text.primary,
    },
    syncButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.primary.main,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      gap: 6,
    },
    syncButtonDisabled: {
      backgroundColor: colors.text.disabled,
    },
    syncButtonText: {
      color: colors.text.inverse,
      fontSize: 14,
      fontWeight: "600",
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 12,
      backgroundColor: colors.background.paper,
      borderRadius: 8,
    },
    statItem: {
      alignItems: "center",
      flex: 1,
    },
    statValue: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text.primary,
    },
    statLabel: {
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
    },
    statDivider: {
      width: 1,
      height: 30,
      backgroundColor: colors.border,
    },
    errorText: {
      color: colors.status.error,
    },
    statusBanner: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 8,
      marginTop: 12,
      gap: 6,
    },
    statusBannerText: {
      fontSize: 13,
      fontWeight: "500",
    },
    badge: {
      position: "absolute",
      top: -4,
      right: -4,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 4,
    },
    badgeText: {
      color: colors.text.inverse,
      fontSize: 10,
      fontWeight: "700",
    },
  });
