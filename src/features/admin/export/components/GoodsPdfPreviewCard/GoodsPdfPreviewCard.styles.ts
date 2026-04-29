import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.xl,
    marginBottom: Theme.spacing.xl,
    ...Theme.shadows.sm,
    alignItems: "center",
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.neutral[500],
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "800",
    color: Theme.primary[600],
  },
});
