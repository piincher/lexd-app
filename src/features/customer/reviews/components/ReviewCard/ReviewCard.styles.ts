import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { HAIRLINE } from "@src/shared/ui/designLanguage";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  card: {
    borderWidth: HAIRLINE,
    borderColor: colors.border,
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
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
    color: colors.text.primary,
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
    backgroundColor: colors.feedback.infoBg,
  },
  badgeMaritimeText: {
    color: colors.feedback.infoDark,
  },
  badgeAerien: {
    backgroundColor: colors.feedback.warningBg,
  },
  badgeAerienText: {
    color: colors.feedback.warningDark,
  },
  commentText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: colors.text.secondary,
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
    color: colors.text.secondary,
  },
  responseContainer: {
    backgroundColor: colors.background.paper,
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  responseLabel: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  responseText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: colors.text.primary,
    lineHeight: 20,
  },
});
