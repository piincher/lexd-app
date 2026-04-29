import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  statsCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: Theme.colors.background.card,
  },
  statsTitle: {
    marginBottom: 12,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontWeight: "700",
  },
  statLabel: {
    color: "#757575",
    marginTop: 4,
  },
  successValue: {
    color: "#4CAF50",
  },
  failedValue: {
    color: "#F44336",
  },
});
