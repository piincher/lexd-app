import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  summaryCard: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryAverage: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: colors.text.primary,
    marginTop: 8,
  },
  summaryCount: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: colors.text.secondary,
    marginTop: 2,
  },
});
