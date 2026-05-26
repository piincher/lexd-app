import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      paddingHorizontal: 16,
      paddingTop: 4,
      paddingBottom: 32,
    },
    separator: {
      height: 12,
    },
    footer: {
      minHeight: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    endText: {
      paddingTop: 18,
      paddingBottom: 8,
      textAlign: "center",
      fontFamily: Fonts.medium,
      fontSize: 12,
      color: colors.text.secondary,
    },
  });
