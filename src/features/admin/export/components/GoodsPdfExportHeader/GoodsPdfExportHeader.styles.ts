import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.lg,
  },
  backButton: {
    padding: 4,
    width: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Theme.neutral[800],
  },
});
