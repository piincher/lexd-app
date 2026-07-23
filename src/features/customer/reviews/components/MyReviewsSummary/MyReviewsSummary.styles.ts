import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { HAIRLINE } from "@src/shared/ui/designLanguage";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  summaryCard: {
    borderWidth: HAIRLINE,
    borderColor: colors.border,
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
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
