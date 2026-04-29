import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  quickExportSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 12,
    fontWeight: "600",
  },
  quickExportScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  quickExportButton: {
    alignItems: "center",
    padding: 12,
    backgroundColor: Theme.colors.background.card,
    borderRadius: 12,
    borderWidth: 2,
    minWidth: 80,
  },
  quickExportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickExportIconText: {
    color: "white",
    fontSize: 20,
  },
  quickExportLabel: {
    fontWeight: "500",
  },
});
