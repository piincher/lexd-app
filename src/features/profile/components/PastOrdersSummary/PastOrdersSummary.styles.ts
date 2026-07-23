import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    panel: {
      backgroundColor: colors.background.card,
      borderRadius: RADIUS.card,
      padding: 16,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    lede: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconWell: {
      width: 52,
      height: 52,
      borderRadius: RADIUS.control,
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
      height: HAIRLINE,
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
      borderRadius: RADIUS.control,
      padding: 10,
      backgroundColor: colors.background.paper,
      justifyContent: "center",
    },
    metricWide: {
      flex: 1.35,
      minHeight: 64,
      borderRadius: RADIUS.control,
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
      fontWeight: "700",
      letterSpacing: 0.6,
      textTransform: "uppercase",
      color: colors.text.secondary,
    },
  });
