import { StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const useOrderTimelineStyles = () => {
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
    timeline: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingVertical: 12,
    },
    step: {
      alignItems: "center",
      flex: 1,
    },
    connector: {
      position: "absolute",
      top: 16,
      right: "50%",
      left: "-50%",
      height: 2,
      zIndex: -1,
    },
    circle: {
      width: 34,
      height: 34,
      borderRadius: 17,
      justifyContent: "center",
      alignItems: "center",
    },
    stepLabel: {
      fontSize: 10,
      marginTop: 6,
      textAlign: "center",
    },
    currentStatusRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingTop: 8,
      paddingBottom: 4,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    currentStatusText: {
      fontSize: 13,
      color: colors.text.primary,
      fontWeight: "500",
    },
  });
};
