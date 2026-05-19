import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 20,
      borderRadius: 16,
      borderWidth: 1,
      padding: 16,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    shipIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    headerInfo: {
      gap: 4,
    },
    orderCode: {
      fontSize: 16,
      fontWeight: "700",
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 6,
      alignSelf: "flex-start",
    },
    statusText: {
      fontSize: 12,
      fontWeight: "500",
    },
    routeLine: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 24,
      marginBottom: 8,
      paddingHorizontal: 4,
    },
    dashContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    dash: {
      width: 6,
      height: 2,
      borderRadius: 1,
    },
    stepsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
      paddingHorizontal: 4,
    },
    stepItem: {
      alignItems: "center",
      gap: 6,
    },
    stepCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    stepCircleActive: {
      backgroundColor: "#1B365D",
    },
    stepCircleCompleted: {
      backgroundColor: "#1B365D",
    },
    stepCircleInactive: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: colors.border,
    },
    stepLine: {
      height: 2,
      flex: 1,
      marginHorizontal: 2,
      marginBottom: 22,
    },
    stepLabel: {
      fontSize: 11,
      textAlign: "center",
    },
    progressBarContainer: {
      marginTop: 20,
      paddingHorizontal: 4,
    },
    progressTrack: {
      height: 6,
      borderRadius: 3,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 3,
    },
    progressText: {
      fontSize: 12,
      marginTop: 6,
    },
    bottomDivider: {
      borderTopWidth: 1,
      marginTop: 16,
    },
    bottomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 12,
    },
    bottomItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    bottomText: {
      fontSize: 13,
    },
    updatedRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: 10,
    },
    updatedText: {
      fontSize: 11,
    },
  });
