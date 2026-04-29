import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  statsCard: {
    backgroundColor: Theme.colors.background.card,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
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
    color: Theme.colors.text.primary,
  },
  statsTotal: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.secondary,
    marginTop: 4,
  },
  statsRight: {
    flex: 1,
    gap: 4,
  },
});
