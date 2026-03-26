import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  chartContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1.2,
  },
  loadingContainer: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
  },
  errorContainer: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#EF4444",
    fontWeight: "600",
  },
  retryButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
  },
  retryText: {
    color: "#EF4444",
    fontWeight: "600",
  },
});
