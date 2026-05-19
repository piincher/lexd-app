import { StyleSheet } from "react-native";
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      gap: 8,
    },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: isDark ? colors.neutral[700] : colors.neutral[200],
      marginRight: 8,
    },
    chipActive: {
      backgroundColor: colors.primary.main,
      borderColor: colors.primary.main,
    },
    chipText: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.text.secondary,
    },
    chipTextActive: {
      color: colors.text.inverse,
    },
  });
