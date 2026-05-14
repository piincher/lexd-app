import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  panel: {
    backgroundColor: Theme.colors.background.card,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral[200],
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
    color: Theme.colors.text.primary,
  },
  noteInput: {
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Theme.colors.text.primary,
    minHeight: 48,
    textAlignVertical: "top",
  },
  issueButton: {
    backgroundColor: "#d4a843",
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
    color: "Theme.colors.text.inverse",
    fontSize: 16,
    fontWeight: "700",
  },
});
