import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
    },
  });
