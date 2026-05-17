import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontWeight: "700",
  },
  filterButton: {
    borderRadius: 8,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  list: {
    gap: 12,
    paddingBottom: 16,
  },
  skeletonTitle: {
    marginBottom: 16,
  },
  skeletonCard: {
    marginBottom: 12,
  },
});
