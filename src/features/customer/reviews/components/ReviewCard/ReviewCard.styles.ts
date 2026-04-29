import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  goodsId: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.primary,
    flexShrink: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    textTransform: "uppercase",
  },
  badgeMaritime: {
    backgroundColor: Theme.colors.feedback.infoBg,
  },
  badgeMaritimeText: {
    color: Theme.colors.feedback.infoDark,
  },
  badgeAerien: {
    backgroundColor: Theme.colors.feedback.warningBg,
  },
  badgeAerienText: {
    color: Theme.colors.feedback.warningDark,
  },
  commentText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.secondary,
    marginTop: 8,
    lineHeight: 20,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  dateText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.secondary,
  },
  responseContainer: {
    backgroundColor: Theme.colors.background.paper,
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  responseLabel: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.secondary,
    marginBottom: 4,
  },
  responseText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.primary,
    lineHeight: 20,
  },
});
