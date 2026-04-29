import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
    paddingVertical: 12,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.colors.neutral[100],
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  filterChipActive: {
    backgroundColor: "#d4a843",
    borderColor: "#d4a843",
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.secondary,
  },
  filterChipTextActive: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
  },
});
