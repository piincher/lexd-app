import { StyleSheet } from "react-native";

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
      backgroundColor: isDark ? colors.background.paper : "#F3F4F6",
      borderWidth: 1,
      borderColor: isDark ? colors.neutral[700] : "#E5E7EB",
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
      color: "#FFFFFF",
    },
  });
