import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    panel: {
      backgroundColor: colors.background.card,
      borderRadius: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 18,
      elevation: 3,
    },
    lede: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconWell: {
      width: 52,
      height: 52,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary[50],
    },
    ledeCopy: {
      flex: 1,
      minWidth: 0,
      marginLeft: 12,
    },
    kicker: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.text.secondary,
    },
    value: {
      marginTop: 2,
      fontFamily: Fonts.bold,
      fontSize: 30,
      color: colors.text.primary,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 14,
    },
    metricGrid: {
      flexDirection: "row",
      gap: 10,
      alignItems: "stretch",
    },
    metric: {
      flex: 0.7,
      minHeight: 64,
      borderRadius: 8,
      padding: 10,
      backgroundColor: colors.background.paper,
      justifyContent: "center",
    },
    metricWide: {
      flex: 1.35,
      minHeight: 64,
      borderRadius: 8,
      padding: 10,
      backgroundColor: colors.background.paper,
      justifyContent: "center",
    },
    metricValue: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.primary,
    },
    metricLabel: {
      marginTop: 3,
      fontFamily: Fonts.regular,
      fontSize: 11,
      color: colors.text.secondary,
    },
  });
