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
      paddingHorizontal: 28,
      paddingVertical: 48,
    },
    iconWell: {
      width: 92,
      height: 92,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary[50],
      borderWidth: 1,
      borderColor: colors.primary[100],
    },
    emptyTitle: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginTop: 18,
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
      minHeight: 48,
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 16,
    },
    browseButtonText: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
  });
