import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    textTransform: "uppercase",
  },
  badgeActive: {
    backgroundColor: "#DCFCE7",
  },
  badgeActiveText: {
    color: "#15803D",
  },
  badgeRevoked: {
    backgroundColor: "#FEE2E2",
  },
  badgeRevokedText: {
    color: "#DC2626",
  },
  badgeAuto: {
    backgroundColor: "#DBEAFE",
  },
  badgeAutoText: {
    color: "#1D4ED8",
  },
  badgeManual: {
    backgroundColor: "#FEF3C7",
  },
  badgeManualText: {
    color: "#92400E",
  },
});
