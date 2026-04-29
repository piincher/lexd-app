import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";

export const styles = StyleSheet.create({
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
    color: Theme.colors.text.primary,
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.disabled,
    textAlign: "center",
    lineHeight: 20,
  },
});
