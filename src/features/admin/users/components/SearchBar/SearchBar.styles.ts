import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1F2937",
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
  },
  clearBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#9CA3AF",
    alignItems: "center",
    justifyContent: "center",
  },
});
