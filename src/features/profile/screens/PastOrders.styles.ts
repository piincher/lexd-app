import { StyleSheet } from "react-native";
import { lightTheme } from "@src/constants/Theme";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
  });
