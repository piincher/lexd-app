import { StyleSheet } from "react-native";
import { Theme, AppTheme } from "@src/shared/constants/Theme";

export const createStyles = (colors: AppTheme['colors']) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral[100],
    justifyContent: "center",
    alignItems: "center",
  },
  contextBox: {
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 4,
  },
  contextText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  contextBold: {
    fontWeight: "700",
    color: colors.text.primary,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text.secondary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text.primary,
    backgroundColor: colors.background.elevated,
  },
  inputError: {
    borderColor: colors.status.error,
    backgroundColor: colors.status.error + '12',
  },
  errorText: {
    fontSize: 12,
    color: colors.status.error,
    marginTop: 4,
  },
  previewBox: {
    backgroundColor: colors.status.info + '12',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.status.info,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  previewLabel: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  previewValue: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text.primary,
  },
  previewValueBold: {
    fontSize: 14,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: colors.status.info + '30',
    marginVertical: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    borderRadius: 10,
  },
  confirmBtn: {
    flex: 2,
    borderRadius: 10,
    backgroundColor: colors.primary.main,
  },
});
