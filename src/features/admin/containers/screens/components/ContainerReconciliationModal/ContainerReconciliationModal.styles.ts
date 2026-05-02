import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: Theme.colors.background.card,
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
    color: Theme.colors.text.primary,
  },
  subtitle: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.neutral[100],
    justifyContent: "center",
    alignItems: "center",
  },
  contextBox: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 4,
  },
  contextText: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
  },
  contextBold: {
    fontWeight: "700",
    color: Theme.colors.text.primary,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.text.secondary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Theme.colors.text.primary,
    backgroundColor: Theme.colors.background.elevated,
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
  },
  previewBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E40AF",
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
    color: Theme.colors.text.secondary,
  },
  previewValue: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.text.primary,
  },
  previewValueBold: {
    fontSize: 14,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#BFDBFE",
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
    backgroundColor: "#3B82F6",
  },
});
