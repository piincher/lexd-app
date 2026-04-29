import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    filtersContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    filterRow: {
      flexDirection: "row",
      gap: 10,
    },
    filterChip: {
      borderRadius: 20,
      height: 36,
      backgroundColor: colors.background.paper,
    },
    filterChipActive: {
      backgroundColor: colors.primary.main,
    },
    filterChipText: {
      color: colors.text.secondary,
      fontFamily: Fonts.meduim,
    },
    filterChipTextActive: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
    },
  });
