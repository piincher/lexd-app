import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";

export const styles = StyleSheet.create({
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
    backgroundColor: Theme.colors.background.card,
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
    color: Theme.colors.text.secondary,
  },
});
