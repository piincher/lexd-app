import { StyleSheet } from "react-native";

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  formContainer: {
    width: "100%",
    backgroundColor: colors.background.card,
    borderRadius: 24,
    padding: 24,
    shadowColor: colors.shadow || "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  buttonContainer: {
    marginTop: 12,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.secondary,
    marginBottom: 8,
    marginTop: 4,
  },
  roleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  roleChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  roleChipActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  roleChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.text.secondary,
  },
  roleChipTextActive: {
    color: colors.text.inverse,
    fontWeight: "700",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
});
