import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const getStyles = (colors: any) => StyleSheet.create({
  panel: {
    backgroundColor: colors.background.card,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    padding: 16,
    gap: 12,
  },
  selectedInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text.primary,
  },
  noteInput: {
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text.primary,
    minHeight: 48,
    textAlignVertical: "top",
  },
  issueButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  disabled: {
    opacity: 0.6,
  },
  issueButtonText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: "700",
  },
});
