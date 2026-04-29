import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 32,
    },
    emptyTitle: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginTop: 16,
    },
    emptyText: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: "center",
      marginTop: 8,
      marginBottom: 24,
      lineHeight: 20,
    },
    browseButton: {
      backgroundColor: colors.primary.main,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    browseButtonText: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
  });
