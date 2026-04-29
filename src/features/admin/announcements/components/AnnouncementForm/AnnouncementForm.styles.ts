import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  picker: {
    minHeight: 48,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  toggleText: {
    fontSize: 16,
  },
  messageInput: {
    height: 100,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 24,
  },
});
