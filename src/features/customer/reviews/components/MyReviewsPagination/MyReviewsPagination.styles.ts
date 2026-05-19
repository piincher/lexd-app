import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
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
