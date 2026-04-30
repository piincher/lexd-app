import { StyleSheet } from "react-native";

import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxHeight: "85%",
    backgroundColor: Theme.colors.background.card,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  title: {
    fontWeight: "600",
  },
  content: {
    padding: 16,
    maxHeight: 500,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: "500",
  },
  divider: {
    marginVertical: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateButton: {
    flex: 1,
    padding: 12,
    backgroundColor: Theme.colors.background.paper,
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    marginTop: 8,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailSection: {
    marginTop: 8,
    marginLeft: 32,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral[200],
  },
  button: {
    minWidth: 100,
  },
  statusPicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Theme.colors.background.paper,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[300],
    marginTop: 8,
  },
  statusPickerValue: {
    flex: 1,
  },
  statusPickerPlaceholder: {
    flex: 1,
    color: Theme.colors.neutral[500],
  },
});
