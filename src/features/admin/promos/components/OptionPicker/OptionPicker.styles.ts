import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const getStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  optionChipSelected: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  optionChipText: {
    fontSize: 13,
    fontFamily: Fonts.meduim,
    color: colors.text.secondary,
  },
  optionChipTextSelected: {
    color: colors.text.inverse,
    fontFamily: Fonts.bold,
  },
});
