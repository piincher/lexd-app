import { StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RADIUS, HAIRLINE } from "@src/shared/ui/designLanguage";

export const useOrderTimelineStyles = () => {
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
    // Squared checkpoint node, consistent with the dashboard journey map and
    // the airway-bill tracking timeline.
    circle: {
      width: 34,
      height: 34,
      borderRadius: RADIUS.control,
      justifyContent: "center",
      alignItems: "center",
    },
    stepLabel: {
      fontSize: 9,
      fontWeight: "700",
      letterSpacing: 0.5,
      textTransform: "uppercase",
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
