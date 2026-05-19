import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const getStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  filterContainer: {
    backgroundColor: colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    paddingVertical: 12,
    marginTop: 12,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  filterChipActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: colors.text.secondary,
  },
  filterChipTextActive: {
    color: colors.text.inverse,
    fontFamily: Fonts.bold,
  },
});
