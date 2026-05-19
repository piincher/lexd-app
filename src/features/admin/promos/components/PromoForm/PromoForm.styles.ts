import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const getStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    gap: 8,
  },
  dateButtonText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: colors.text.primary,
    flex: 1,
  },
  dateButtonPlaceholder: {
    color: colors.text.disabled,
  },
  row: {
    flexDirection: "row",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.neutral[100],
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: Fonts.meduim,
    color: colors.text.secondary,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.primary.main,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: colors.text.inverse,
  },
});
