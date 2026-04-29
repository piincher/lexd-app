import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  idContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },
  certificateIdText: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.primary,
  },
  copyButton: {
    padding: 6,
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: 8,
  },
});
