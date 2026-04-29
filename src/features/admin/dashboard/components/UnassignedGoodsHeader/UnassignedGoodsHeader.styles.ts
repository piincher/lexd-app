import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  backButton: {
    width: 32,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: Theme.colors.text.primary,
    flex: 1,
    textAlign: "center",
  },
  right: {
    width: 32,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
