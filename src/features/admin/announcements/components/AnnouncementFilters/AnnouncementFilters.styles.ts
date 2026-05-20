import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeColors } from "@src/constants/Theme";

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
      paddingVertical: 8,
      gap: 8,
    },
    searchRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background.default,
      marginHorizontal: 16,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.primary,
      paddingVertical: 4,
    },
    chipScroll: {
      paddingHorizontal: 16,
      gap: 8,
    },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: colors.neutral[100],
      marginRight: 6,
    },
    chipActive: {
      backgroundColor: colors.primary.main,
    },
    chipText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 12,
      color: colors.text.secondary,
    },
    chipTextActive: {
      color: colors.text.inverse,
    },
    chipSmall: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border.light,
      marginRight: 6,
    },
    chipSmallActive: {
      backgroundColor: colors.status.info + "18",
      borderColor: colors.status.info,
    },
    chipSmallText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 11,
      color: colors.text.secondary,
    },
    chipSmallTextActive: {
      color: colors.status.info,
    },
  });
