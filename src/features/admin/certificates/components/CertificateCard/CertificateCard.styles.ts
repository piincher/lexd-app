import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

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
    color: Theme.colors.text.primary,
    marginRight: 8,
  },
  copyButton: {
    padding: 4,
    backgroundColor: Theme.colors.neutral[100],
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
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  cardRowText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.secondary,
    flex: 1,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFBEB",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
    gap: 8,
  },
  noteText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: "#92400E",
    flex: 1,
    lineHeight: 18,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d4a843",
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
    color: "#FFFFFF",
  },
});
