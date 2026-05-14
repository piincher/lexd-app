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
    backgroundColor: "Theme.colors.status.success + '18'",
  },
  badgeActiveText: {
    color: "#15803D",
  },
  badgeRevoked: {
    backgroundColor: "Theme.colors.status.error + '15'",
  },
  badgeRevokedText: {
    color: "#DC2626",
  },
  badgeAuto: {
    backgroundColor: "Theme.colors.status.info + '15'",
  },
  badgeAutoText: {
    color: "#1D4ED8",
  },
  badgeManual: {
    backgroundColor: "Theme.colors.status.warning + '15'",
  },
  badgeManualText: {
    color: "#92400E",
  },
});
