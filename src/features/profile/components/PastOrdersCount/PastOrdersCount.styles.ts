import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    countContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      paddingHorizontal: 2,
      backgroundColor: colors.background.default,
    },
    countText: {
      flexShrink: 0,
      fontFamily: Fonts.bold,
      fontSize: 14,
      color: colors.text.primary,
    },
    countHint: {
      flex: 1,
      textAlign: "right",
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
  });
