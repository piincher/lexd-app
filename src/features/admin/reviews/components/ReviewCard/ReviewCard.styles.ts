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
  clientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  clientName: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.primary,
    flex: 1,
  },
  clientPhone: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.secondary,
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
    backgroundColor: "#DBEAFE",
  },
  badgeMaritimeText: {
    color: "#1D4ED8",
  },
  badgeAerien: {
    backgroundColor: "#FEF3C7",
  },
  badgeAerienText: {
    color: "#92400E",
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
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  responseLabel: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: "#1D4ED8",
    marginBottom: 4,
  },
  responseText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.secondary,
    lineHeight: 20,
  },
  responseDate: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.secondary,
    marginTop: 6,
  },
  respondButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#d4a843",
    backgroundColor: "#FFFBF0",
  },
  respondButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: "#d4a843",
  },
  responseInputContainer: {
    marginTop: 12,
  },
  responseInput: {
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.colors.text.primary,
    minHeight: 80,
    textAlignVertical: "top",
  },
  responseActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Theme.colors.neutral[100],
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.secondary,
  },
  submitButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#d4a843",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: "#FFFFFF",
  },
});
