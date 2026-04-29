import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";

export const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryAverage: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.primary,
    marginTop: 8,
  },
  summaryCount: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.secondary,
    marginTop: 2,
  },
});
