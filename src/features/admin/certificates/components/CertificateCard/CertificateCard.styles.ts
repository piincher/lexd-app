import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const getStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
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
    alignItems: "flex-start",
    marginBottom: 12,
  },
  certificateIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  certificateId: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: colors.text.primary,
    marginRight: 8,
  },
  copyButton: {
    padding: 4,
    backgroundColor: colors.neutral[100],
    borderRadius: 6,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
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
  badgeAuto: {
    backgroundColor: colors.status.info + '15',
  },
  badgeAutoText: {
    color: colors.status.info,
  },
  badgeManual: {
    backgroundColor: colors.status.warning + '15',
  },
  badgeManualText: {
    color: colors.status.warning,
  },
  badgeActive: {
    backgroundColor: colors.status.success + '18',
  },
  badgeActiveText: {
    color: colors.status.success,
  },
  badgeRevoked: {
    backgroundColor: colors.status.error + '15',
  },
  badgeRevokedText: {
    color: colors.status.error,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  cardRowText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: colors.text.secondary,
    flex: 1,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.status.warning + '12',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
    gap: 8,
  },
  noteText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: colors.status.warning,
    flex: 1,
    lineHeight: 18,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary.main,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 6,
  },
  downloadButtonDisabled: {
    opacity: 0.6,
  },
  downloadButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: colors.text.inverse,
  },
});
