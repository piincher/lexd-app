import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Theme.neutral[200],
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: Theme.primary[50],
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: Theme.primary[200],
  },
  headerCell: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 11,
    fontWeight: "700",
    color: Theme.primary[700],
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  body: {
    maxHeight: 300,
  },
  emptyState: {
    padding: Theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    marginTop: Theme.spacing.sm,
    fontSize: 14,
    fontWeight: "500",
    color: Theme.neutral[400],
  },
});
