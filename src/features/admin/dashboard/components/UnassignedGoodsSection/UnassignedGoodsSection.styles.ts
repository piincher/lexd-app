import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#6B7280",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#EF4444",
  },
  retryText: {
    fontSize: 14,
    color: "#1a5f2a",
    fontWeight: "600",
  },
});
