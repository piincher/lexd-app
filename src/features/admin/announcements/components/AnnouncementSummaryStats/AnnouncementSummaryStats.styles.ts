import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeColors } from "@src/constants/Theme";

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 6,
      gap: 8,
    },
    pill: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background.default,
      borderRadius: 12,
      paddingVertical: 12,
      borderWidth: 1,
    },
    skeleton: {
      backgroundColor: colors.neutral[100],
    },
    pillValue: {
      fontFamily: Fonts.BOLD,
      fontSize: 16,
      marginTop: 4,
    },
    pillLabel: {
      fontFamily: Fonts.REGULAR,
      fontSize: 11,
      color: colors.text.secondary,
      marginTop: 2,
    },
  });
