import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const getStyles = (colors: any) => StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.card,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: colors.primary.main,
    borderWidth: 2,
  },
  notSelectedCard: {
    borderColor: colors.text.secondary,
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.text.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  placeholderText: {
    color: colors.text.inverse,
    fontFamily: Fonts.bold,
    fontSize: 12,
  },
  cardDetails: {
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
  },
  cardTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 10,
  },
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.text.primary,
  },
  selectedIndicator: {
    backgroundColor: colors.primary.main,
  },
  notSelectedIndicator: {
    backgroundColor: colors.background.card,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    textAlign: "center",
    color: colors.text.secondary,
  },
});
