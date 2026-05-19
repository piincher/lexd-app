import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  statsCard: {
    backgroundColor: colors.background.card,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statsTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsLeft: {
    alignItems: "center",
    marginRight: 20,
    minWidth: 80,
  },
  statsAverage: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: colors.text.primary,
  },
  statsTotal: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: colors.text.secondary,
    marginTop: 4,
  },
  statsRight: {
    flex: 1,
    gap: 4,
  },
});
