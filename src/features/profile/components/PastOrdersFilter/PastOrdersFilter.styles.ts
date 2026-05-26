import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    filtersContainer: {
      backgroundColor: colors.background.default,
    },
    filterRow: {
      flexDirection: "row",
      gap: 8,
    },
    filterChip: {
      flex: 1,
      minHeight: 48,
      borderRadius: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 6,
    },
    filterChipActive: {
      backgroundColor: colors.primary.main,
      borderColor: colors.primary.main,
    },
    filterChipText: {
      color: colors.text.secondary,
      fontFamily: Fonts.meduim,
      fontSize: 13,
    },
    filterChipTextActive: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      fontSize: 13,
    },
  });
