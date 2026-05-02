import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    container: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      width: "100%",
      maxHeight: "90%",
      padding: 20,
    },
    header: {
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text.primary,
      marginTop: 12,
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: "center",
      marginTop: 8,
    },
    actionInfo: {
      backgroundColor: colors.background.paper,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    actionLabel: {
      fontSize: 12,
      color: colors.text.secondary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    actionValue: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
      marginTop: 4,
    },
    actionTime: {
      fontSize: 12,
      color: colors.text.muted,
      marginTop: 4,
    },
    comparisonContainer: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 20,
    },
    versionCard: {
      flex: 1,
      backgroundColor: colors.background.paper,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: "transparent",
      overflow: "hidden",
    },
    selectedCard: {
      borderColor: colors.status.success,
      backgroundColor: colors.feedback.successBg,
    },
    versionHeader: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      backgroundColor: colors.background.card,
      gap: 8,
    },
    versionTitle: {
      flex: 1,
      fontSize: 14,
      fontWeight: "600",
      color: colors.text.primary,
    },
    versionContent: {
      maxHeight: 150,
      padding: 12,
    },
    versionText: {
      fontSize: 13,
      color: colors.text.secondary,
      fontFamily: "monospace",
    },
    actions: {
      flexDirection: "row",
      gap: 12,
    },
    cancelButton: {
      flex: 1,
      padding: 14,
      borderRadius: 10,
      backgroundColor: colors.background.paper,
      alignItems: "center",
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.secondary,
    },
    resolveButton: {
      flex: 1,
      padding: 14,
      borderRadius: 10,
      backgroundColor: colors.status.info,
      alignItems: "center",
    },
    resolveButtonDisabled: {
      backgroundColor: colors.text.disabled,
    },
    resolveButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.inverse,
    },
    helpText: {
      fontSize: 12,
      color: colors.text.muted,
      textAlign: "center",
      marginTop: 16,
    },
  });
