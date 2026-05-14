import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.secondary,
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
    backgroundColor: Theme.colors.neutral[100],
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  optionChipSelected: {
    backgroundColor: "#d4a843",
    borderColor: "#d4a843",
  },
  optionChipText: {
    fontSize: 13,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.secondary,
  },
  optionChipTextSelected: {
    color: "Theme.colors.text.inverse",
    fontFamily: Fonts.bold,
  },
});
