import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    headerShell: {
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
    },
    iconButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background.paper,
    },
    titleBlock: {
      flex: 1,
      minWidth: 0,
      paddingHorizontal: 12,
    },
    eyebrow: {
      fontFamily: Fonts.bold,
      fontSize: 12,
      letterSpacing: 0.4,
      textTransform: "uppercase",
      color: colors.primary.main,
    },
    headerTitle: {
      fontFamily: Fonts.bold,
      fontSize: 24,
      color: colors.text.primary,
      marginTop: 2,
    },
    searchInput: {
      backgroundColor: colors.background.paper,
      minHeight: 48,
    },
    searchOutline: {
      borderRadius: 16,
      borderColor: colors.border,
    },
    searchContent: {
      fontFamily: Fonts.regular,
      fontSize: 14,
    },
  });
