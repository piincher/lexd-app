import { StyleSheet } from "react-native";
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 4,
      alignItems: 'center',
    },
    chip: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
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
      fontSize: 12,
      fontWeight: "600",
      color: colors.text.secondary,
    },
    chipTextActive: {
      color: colors.text.inverse,
    },
  });
