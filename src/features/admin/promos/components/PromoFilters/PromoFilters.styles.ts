import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const getStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 4,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    minHeight: 44,
    borderColor: colors.border,
    backgroundColor: colors.background.card,
  },
  searchInput: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 14,
    paddingVertical: 8,
    fontFamily: Fonts.REGULAR,
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
    fontFamily: Fonts.MEDIUM,
    color: colors.text.secondary,
  },
  filterChipTextActive: {
    color: colors.text.inverse,
    fontFamily: Fonts.BOLD,
  },
  typeScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeChipActive: {
    backgroundColor: colors.status.info + "18",
    borderColor: colors.status.info,
  },
  typeChipText: {
    fontSize: 12,
    fontFamily: Fonts.meduim,
    color: colors.text.secondary,
  },
  typeChipTextActive: {
    color: colors.status.info,
    fontFamily: Fonts.bold,
  },
});
