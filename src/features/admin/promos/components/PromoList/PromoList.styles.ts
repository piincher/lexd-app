import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const getStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: colors.text.secondary,
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: colors.text.secondary,
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: colors.text.disabled,
    textAlign: "center",
    lineHeight: 20,
  },
  resetFilterButton: {
    marginTop: 16,
    backgroundColor: colors.neutral[100],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetFilterText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: colors.text.secondary,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.background.card,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  paginationButtonDisabled: {
    opacity: 0.4,
  },
  paginationText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: colors.text.secondary,
  },
});
