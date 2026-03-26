import { StyleSheet } from "react-native";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginBottom: 12,
  },
  axisLabel: {
    color: COLORS.grey,
    fontSize: 11,
    fontFamily: Fonts.regular,
  },
  labelContainer: {
    alignItems: "center",
    marginBottom: 4,
  },
  amount: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
  percentage: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
  },
});
