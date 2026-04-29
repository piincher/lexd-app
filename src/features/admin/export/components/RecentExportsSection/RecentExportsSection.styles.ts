import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: "600",
  },
  loader: {
    marginVertical: 40,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptySubtext: {
    color: "#757575",
    marginTop: 8,
  },
  exportsList: {
    paddingBottom: 100,
  },
});
