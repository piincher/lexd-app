import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    countContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.background.default,
    },
    countText: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: colors.text.secondary,
    },
  });
